import {updatePreferenceInfo} from '../../redux/actions/preferences';
import {insertData, openDataBase} from '../../database/database';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {DB_NAME} from '../../database/constants';
import {preferenceInfo} from '../../redux/reducers/preferences/preferences';
import {PreferenceCategory} from '../../models/preference';
import {generateUniqueId} from '../../utils/utils';
interface RouteParams {
  type: string;
}

export const usePreference = () => {
  const [getValue, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PreferenceCategory | null>();
  const preferenceData = useSelector(preferenceInfo);
  const route = useRoute<{params: RouteParams}>();
  const dispatch = useDispatch();

  const getPreference = useCallback(async () => {
    if (!route.params || !route.params.type) {
      console.log('route.params or route.params.type is undefined');
      return;
    }
    const db = openDataBase();
    (await db).transaction(txOuter => {
      txOuter.executeSql(
        'SELECT * FROM preference WHERE type = ?',
        [route.params.type],
        (_, result) => {
          if (result.rows.length > 0) {
            const data = result.rows.item(0);
            dispatch(updatePreferenceInfo(data));
          } else {
            dispatch(updatePreferenceInfo({}));
          }
        },
        error => {
          console.log('fetch error....', error);
        },
      );
    });
  }, [dispatch, route.params]);

  useEffect(() => {
    getPreference();
  }, [getPreference]);

  const updatePreference = async () => {
    try {
      if (isEdit && selectedItem) {
        editPreference();
        setIsEdit(false);
        setValue('');
        return;
      }
      const db = SQLite.openDatabase({name: DB_NAME, location: 'default'});
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM preference WHERE type = ?',
          [route.params.type],
          (_, result) => {
            if (result.rows.length > 0) {
              const item = result.rows.item(0);
              const category = JSON.parse(item.category);

              const isExisted = category.find(
                (item: any) => item.label === getValue,
              );
              if (isExisted) {
                console.log('data already exist...');
                return;
              }

              const payload = {
                label: getValue,
                id: generateUniqueId(),
              };
              category.push(payload);
              tx.executeSql(
                'UPDATE  preference SET category=? WHERE type=?;',
                [JSON.stringify(category), route.params.type],
                () => {
                  console.log('insert success');
                },
                error => {
                  console.log('error while updating the preference...', error);
                },
              );
            } else {
              const category = {
                label: getValue,
                id: generateUniqueId(),
              };

              const data = {
                id: generateUniqueId(),
                category: JSON.stringify([category]),
                type: route.params.type,
              };
              insertData('preference', data);
            }
          },
        );
      });
      getPreference();
      setValue('');
    } catch (error) {
      console.log('errorr.....', error);
    }
  };

  const onPressEdit = (item: PreferenceCategory) => {
    setValue(item.label);
    setIsEdit(true);
    setSelectedItem(item);
    console.log('selectedItem', item);
  };

  const editPreference = async () => {
    try {
      const db = SQLite.openDatabase({name: DB_NAME, location: 'default'});
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT * FROM preference WHERE type=?',
          [route.params.type],
          (_, result) => {
            if (result.rows.length > 0) {
              const data = result.rows.item(0);
              const category = JSON.parse(data.category);
              const updateCategory = category.map(cat => {
                if (cat.id === selectedItem?.id) {
                  cat.label = getValue;
                }
                return cat;
              });
              console.log('updateCategory...', updateCategory);
              tx.executeSql(
                'UPDATE preference SET category=? WHERE type=?',
                [JSON.stringify(updateCategory), route.params.type],
                () => {
                  console.log('Edit success');
                },
                error => {
                  console.log('error while updating the preference...', error);
                },
              );
            }
          },
        );
      });
      setSelectedItem(null);
      getPreference();
    } catch (error) {
      console.log('error....', error);
    }
  };

  return {
    setValue,
    getValue,
    updatePreference,
    getPreference,
    preferenceData,
    editPreference,
    onPressEdit,
  };
};
