import {StyleSheet} from 'react-native';
import {FONTS, COLOR, FONT_SIZE} from '../../theme';

export const styles = StyleSheet.create({
  noTransaction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLOR.GRAY,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  totalAmountTitle: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.XL,
  },

  sectionHeader: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.LG,
    color: COLOR.BLUE,
    marginVertical: 10,
  },
  transactionButtonsView: {
    flexDirection: 'row',
    width: '100%',
  },
  transactionButton: {
    width: 100,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  transactionTypeTitle: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.XL,
    marginTop: 20,
    marginBottom: 10,
    color: COLOR.TEXT,
  },
  dateRange: {
    color: COLOR.BLUE,
    marginLeft: 10,
  },
  totalAmountNegative: {
    color: 'red',
  },
  totalAmountPositive: {
    color: 'green',
  },
  text: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    fontSize: FONT_SIZE.MD,
  },
  buttonStyle: {
    marginTop: 10,
  },
  card: {
    backgroundColor: COLOR.WHITE,
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  title: {
    fontFamily: FONTS.LATO_TEXT_SEMI_BOLD,
    fontSize: FONT_SIZE.MD,
    color: COLOR.TEXT,
  },
  expenses: {
    color: 'red',
    fontSize: FONT_SIZE.MD,
  },
  income: {
    color: 'green',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR.WHITE,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
