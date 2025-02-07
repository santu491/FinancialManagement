import {StyleSheet} from 'react-native';
import {FONTS, COLOR, FONT_SIZE} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.GRAY,
    flex: 1,
    padding: 16,
  },
  labelView: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLOR.GRAY,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLOR.BLUE,
  },
  inputContainer: {
    // flexDirection: 'row',
    // flex: 1,
  },
  input: {
    marginBottom: 10,
    // width: '80%',
  },
  title: {
    marginTop: 20,
    color: COLOR.TEXT,
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  deleteIcon: {
    marginLeft: 20,
  },
});
