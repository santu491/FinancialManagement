import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './updatePreference.styles';
import {TextInput} from '../../components/textInput/textInput';
import {Button} from '../../components/button/button';
import {usePreference} from './usePreference';
import {PreferenceCategory} from '../../models/preference';
import {PencilIconFilled, DeleteIcon} from '../../../assets/icons/icons';

export const UpdatePreference = () => {
  const {
    setValue,
    getValue,
    updatePreference,
    preferenceData,
    onPressEdit,
    type,
    deletePreference,
  } = usePreference();

  const title = `${type} Preference`;

  const renderPreferenceList = ({item}: {item: PreferenceCategory}) => {
    return (
      <View key={item.id} style={styles.labelView}>
        <Text style={styles.label}>{item.label}</Text>
        <View style={styles.iconStyle}>
          <TouchableOpacity onPress={() => onPressEdit(item)}>
            <PencilIconFilled />
          </TouchableOpacity>

          {preferenceData.category &&
            JSON.parse(preferenceData.category).length > 1 && (
              <TouchableOpacity
                onPress={() => deletePreference(item)}
                style={styles.deleteIcon}>
                <DeleteIcon />
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Add your preference"
          placeholder="Add your preference"
          style={styles.input}
          onChangeText={setValue}
          value={getValue}
        />
        <Button title="Add" onPress={updatePreference} disabled={!getValue} />
      </View>

      <View>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <FlatList
          data={
            preferenceData.category
              ? JSON.parse(preferenceData.category)
              : ([] as PreferenceCategory[])
          }
          renderItem={renderPreferenceList}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
