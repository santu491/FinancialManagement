import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './preference.styles';
import {PreferenceType} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_SCREEN} from '../../navigator/navigationTypes';
import {RightArrow} from '../../../assets/icons/icons';
import {COLOR} from '../../theme';

const preferenceData = [
  {
    title: 'Accounts',
    type: PreferenceType.ACCOUNTS,
  },
  {
    title: 'Investments',
    type: PreferenceType.INVESTMENTS,
  },
  {
    title: 'Income',
    type: PreferenceType.INCOME,
  },
  {title: 'Expenses', type: PreferenceType.EXPENSES},
];

interface PreferenceButtonProps {
  title: string;
  onPress: () => void;
}

const PreferenceButton = (props: PreferenceButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text>{props.title}</Text>
      <RightArrow color={COLOR.BLUE} />
    </TouchableOpacity>
  );
};

export const Preference = () => {
  const navigation = useNavigation();
  const onPressPreference = preferenceInfo => {
    navigation.navigate(NAVIGATION_SCREEN.UPDATE_PREFERENCE, {
      type: preferenceInfo.type,
    });
  };

  const renderPreferences = ({item}) => {
    return (
      <PreferenceButton
        title={item.title}
        onPress={() => onPressPreference(item)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Text>Preference</Text>
      <FlatList
        data={preferenceData}
        renderItem={renderPreferences}
        keyExtractor={item => item.type}
      />
    </View>
  );
};
