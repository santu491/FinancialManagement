import React from 'react';
import {FlatList, View, Text, ScrollView} from 'react-native';
import {styles} from './home.styles';

import {useHome} from './useHome';
import {PreferenceType} from '../../constants/constants';

export const Home = () => {
  const {
    investmentDetails,
    incomeDetails,
    expensesDetails,
    totalAmount,
    isEmpty,
  } = useHome();

  const renderTransactionsList = ({item}) => {
    const isExpenses = item.transactionType === PreferenceType.EXPENSES;
    return (
      <View style={styles.card}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={isExpenses ? styles.expenses : styles.income}>
            {isExpenses ? '-' : '+'}
            {item.amount}
          </Text>
        </View>
        <Text>{item.description}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {isEmpty ? (
        <View style={styles.noTransaction}>
          <Text>No Transactions to show</Text>
        </View>
      ) : (
        <>
          {/* <Text style={styles.totalAmountTitle}>
            Total Amount:{' '}
            <Text
              style={
                Number(totalAmount) > 0
                  ? styles.totalAmountPositive
                  : styles.totalAmountNegative
              }>
              {totalAmount}
            </Text>
          </Text> */}

          {investmentDetails.data.length > 0 ? (
            <>
              <Text style={styles.transactionTypeTitle}>
                {investmentDetails.title}
              </Text>
              <FlatList
                data={investmentDetails.data ?? []}
                renderItem={renderTransactionsList}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </>
          ) : null}
          {expensesDetails.data.length > 0 ? (
            <>
              <Text style={styles.transactionTypeTitle}>
                {expensesDetails.title}
              </Text>
              <FlatList
                data={expensesDetails.data ?? []}
                renderItem={renderTransactionsList}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </>
          ) : null}
          {incomeDetails.data.length > 0 ? (
            <>
              <Text style={[styles.transactionTypeTitle]}>
                {incomeDetails.title}
              </Text>
              <FlatList
                data={incomeDetails.data ?? []}
                renderItem={renderTransactionsList}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </>
          ) : null}
        </>
      )}
    </ScrollView>
  );
};
