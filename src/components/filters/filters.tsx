import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Modal} from '../modal/modal';
import {COLOR, FONT_SIZE, FONTS} from '../../theme';
import {useSelector} from 'react-redux';
import {transactionDetails} from '../../redux/reducers/transactions/transactions';

export enum FILTER_TYPE {
  CUSTOM = 'custom',
  LAST_7_DAYS = 'last7Days',
  LAST_ONE_MONTH = 'lastOneMonth',
  THIS_MONTH = 'thisMonth',
  TODAY = 'today',
  ALL = 'All',
}

const data = [
  {
    label: 'All',
    type: FILTER_TYPE.ALL,
  },
  {
    label: 'Custom',
    type: FILTER_TYPE.CUSTOM,
  },
  {
    label: 'This Month',
    type: FILTER_TYPE.THIS_MONTH,
  },
  {
    label: 'Today',
    type: FILTER_TYPE.TODAY,
  },
  {
    label: 'Last 7 Days',
    type: FILTER_TYPE.LAST_7_DAYS,
  },
  {
    label: 'Last One Month',
    type: FILTER_TYPE.LAST_ONE_MONTH,
  },
];

export const Filters = ({
  onPress,
  selectedFilter,
}: {
  onPress: (item) => void;
  selectedFilter: string;
}) => {
  const transactionData = useSelector(transactionDetails);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.list} onPress={() => onPress(item)}>
        <Text
          style={
            (styles.label,
            transactionData.filter.type === item.type && styles.selectedFilter)
          }>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal visible={true}>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          //   style={styles.list}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
  },
  list: {
    backgroundColor: COLOR.WHITE,
    height: 50,
    marginTop: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingLeft: 20,
    // height: 100,
  },
  label: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.LG,
    color: COLOR.TEXT,
  },
  selectedFilter: {
    color: COLOR.BLUE,
  },
});
