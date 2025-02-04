import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './updatePreference.styles';
import {TextInput} from '../../components/textInput/textInput';
import {Button} from '../../components/button/button';
import {usePreference} from './usePreference';
import {PreferenceCategory} from '../../models/preference';

export const UpdatePreference = () => {
  const {
    setValue,
    getValue,
    updatePreference,
    preferenceData,
    editPreference,
    onPressEdit,
  } = usePreference();

  const renderPreferenceList = ({item}: {item: PreferenceCategory}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.labelView}
        onPress={() => onPressEdit(item)}>
        <Text>{item.label}</Text>
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
        <Text>Preference List</Text>
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
