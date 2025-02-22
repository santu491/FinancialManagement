import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {styles} from './home.styles';

import {useHome} from './useHome';
import {PreferenceType} from '../../constants/constants';
import {Transactions} from '../../models/transactions';
import moment from 'moment';
import {dateFormate} from '../../utils/utils';
import {DeleteIcon, RightArrow} from '../../../assets/icons/icons';
import {Filters} from '../../components/filters/filters';
import {Button} from '../../components/button/button';
import {COLOR} from '../../theme';

const PreferenceButton = (props: PreferenceButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.title}>{props.title}</Text>
      <RightArrow color={COLOR.BLUE} />
    </TouchableOpacity>
  );
};

export const Home = () => {
  const {
    investmentDetails,
    incomeDetails,
    expensesDetails,
    totalAmount,
    isEmpty,
    getFilter,
    onPressFilter,
    showFilter,
    deleteTransaction,
    updateFilters,
    dateRange,
    onPressTransactionType,
    transactionType,
    onPressAccounts,
    accountsList,
    onPressAccount,
  } = useHome();

  const renderPreferences = ({item}) => {
    return (
      <PreferenceButton
        title={item.label}
        onPress={() => onPressAccount(item)}
      />
    );
  };

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
        <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* {isEmpty ? (
        <View style={styles.noTransaction}>
          <Text style={styles.title}>No Transactions to show</Text>
        </View>
      ) : ( */}
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

        <Button title="Filter" onPress={onPressFilter} />

        <Text style={styles.transactionTypeTitle}>
          Date Range: <Text style={styles.dateRange}>{dateRange}</Text>
        </Text>

        <View style={styles.transactionButtonsView}>
          <Button
            title="Income"
            onPress={() => onPressTransactionType(PreferenceType.INCOME)}
            buttonStyle={[
              styles.transactionButton,
              transactionType === PreferenceType.INCOME &&
                styles.selectedButton,
            ]}
          />
          <Button
            title="Expenses"
            buttonStyle={[
              styles.transactionButton,
              transactionType === PreferenceType.EXPENSES &&
                styles.selectedButton,
            ]}
            onPress={() => onPressTransactionType(PreferenceType.EXPENSES)}
          />
          <Button
            title="Investment"
            buttonStyle={[
              styles.transactionButton,
              transactionType === PreferenceType.INVESTMENTS &&
                styles.selectedButton,
            ]}
            onPress={() => onPressTransactionType(PreferenceType.INVESTMENTS)}
          />
        </View>
        <Button
          title="Accounts"
          buttonStyle={[
            styles.transactionButton,
            transactionType === PreferenceType.ACCOUNTS &&
              styles.selectedButton,
            {marginTop: 10},
          ]}
          onPress={() => onPressTransactionType(PreferenceType.ACCOUNTS)}
        />

        {showFilter ? (
          <Filters onPress={updateFilters} selectedFilter={getFilter} />
        ) : null}

        <>
          {transactionType === PreferenceType.INVESTMENTS ? (
            <>
              {investmentDetails.data.length > 0 ? (
                <>
                  <Text style={styles.transactionTypeTitle}>
                    {investmentDetails.title}
                  </Text>
                  <Text style={styles.totalAmountTitle}>
                    Total Amount: {investmentDetails.total}
                  </Text>

                  <SectionList
                    sections={investmentDetails.data}
                    renderItem={renderTransactionsList}
                    keyExtractor={(_, index) => index.toString()}
                    renderSectionHeader={({section: {title}}) => {
                      return <Text style={styles.sectionHeader}>{title}</Text>;
                    }}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </>

        <>
          {transactionType === PreferenceType.EXPENSES ? (
            <>
              {expensesDetails.data.length > 0 ? (
                <>
                  <Text style={styles.transactionTypeTitle}>
                    {expensesDetails.title}
                  </Text>
                  <Text style={styles.totalAmountTitle}>
                    Total Amount: {expensesDetails.total}
                  </Text>

                  <SectionList
                    sections={expensesDetails.data}
                    renderItem={renderTransactionsList}
                    keyExtractor={(_, index) => index.toString()}
                    renderSectionHeader={({section: {title}}) => {
                      return <Text style={styles.sectionHeader}>{title}</Text>;
                    }}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </>

        <>
          {transactionType === PreferenceType.INCOME ? (
            <>
              {incomeDetails.data.length > 0 ? (
                <>
                  <Text style={styles.transactionTypeTitle}>
                    {incomeDetails.title}
                  </Text>

                  <Text style={styles.totalAmountTitle}>
                    Total Amount: {incomeDetails.total}
                  </Text>

                  <SectionList
                    sections={incomeDetails.data}
                    renderItem={renderTransactionsList}
                    keyExtractor={(_, index) => index.toString()}
                    renderSectionHeader={({section: {title}}) => {
                      return <Text style={styles.sectionHeader}>{title}</Text>;
                    }}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </>
        {/* {expensesDetails.data.length > 0 ? (
            <>
              <Text style={styles.transactionTypeTitle}>
                {expensesDetails.title}
              </Text>
              <SectionList
                sections={expensesDetails.data}
                renderItem={renderTransactionsList}
                keyExtractor={(_, index) => index.toString()}
                renderSectionHeader={({section: {title}}) => {
                  return <Text>{title}</Text>;
                }}
              />
            </>
          ) : null}
          {incomeDetails.data.length > 0 ? (
            <>
              <Text style={[styles.transactionTypeTitle]}>
                {incomeDetails.title}
              </Text>
              <SectionList
                sections={incomeDetails.data}
                renderItem={renderTransactionsList}
                keyExtractor={(_, index) => index.toString()}
                renderSectionHeader={({section: {title}}) => (
                  <Text>{title}123</Text>
                )}
              />
            </>
          ) : null} */}

        <>
          {transactionType === PreferenceType.ACCOUNTS ? (
            <>
              {accountsList.length > 0 ? (
                <>
                  <FlatList
                    data={JSON.parse(accountsList)}
                    renderItem={renderPreferences}
                    keyExtractor={item => item.type}
                  />
                </>
              ) : null}
            </>
          ) : null}
        </>
      </>
      {/* )} */}
    </ScrollView>
  );
};
