import React from 'react';
import {View} from 'react-native';

import {Form} from '../../components/form/form';

import {styles} from './transactions.styles';

export const Transactions = () => {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
};
