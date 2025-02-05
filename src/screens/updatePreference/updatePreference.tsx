import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './updatePreference.styles';
import {TextInput} from '../../components/textInput/textInput';
import {Button} from '../../components/button/button';
import {usePreference} from './usePreference';
import {PreferenceCategory} from '../../models/preference';
import {PencilIcon, PencilIconFilled} from '../../../assets/icons/icons';

export const UpdatePreference = () => {
  const {
    setValue,
    getValue,
    updatePreference,
    preferenceData,
    editPreference,
    onPressEdit,
    type,
  } = usePreference();

  const title = `${type} Preference`;

  const renderPreferenceList = ({item}: {item: PreferenceCategory}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.labelView}
        onPress={() => onPressEdit(item)}>
        <Text>{item.label}</Text>
        <PencilIconFilled />
      </TouchableOpacity>
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
