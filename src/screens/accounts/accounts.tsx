import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, SectionList, TouchableOpacity} from 'react-native';
import {useAccounts} from './useAccounts';
import {styles} from '../home/home.styles';
import {PreferenceType} from '../../constants/constants';
import {dateFormate} from '../../utils/utils';

export const Accounts = () => {
  const {accountDetails} = useAccounts();
  const renderTransactionsList = ({item}) => {
    const isExpenses = item?.transactionType === PreferenceType.EXPENSES;

    return (
      <View style={styles.card}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={isExpenses ? styles.expenses : styles.income}>
            {isExpenses ? '-' : '+'}
            {item.amount}
          </Text>
        </View>
        <Text style={styles.title}>{dateFormate(item.date)}</Text>
        <Text style={styles.title}>Account Type: {item.accountType}</Text>

        <Text style={styles.title}>{item.description}</Text>
      </View>
    );
  };
  return (
    <View>
      {accountDetails.data.length > 0 ? (
        <>
          <Text style={styles.totalAmountTitle}>
            Total Amount:
            <Text style={{color: accountDetails.total > 0 ? 'green' : 'red'}}>
              {' '}
              {accountDetails.total}
            </Text>
          </Text>
          <SectionList
            sections={accountDetails.data}
            renderItem={renderTransactionsList}
            keyExtractor={(_, index) => index.toString()}
            renderSectionHeader={({section: {title}}) => {
              return <Text style={styles.sectionHeader}>{title}</Text>;
            }}
          />
        </>
      ) : (
        <Text style={styles.totalAmountTitle}>No Data Found</Text>
      )}
    </View>
  );
};
