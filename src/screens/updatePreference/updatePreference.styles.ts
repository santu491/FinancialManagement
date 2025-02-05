import {StyleSheet} from 'react-native';
import {FONTS, COLOR, FONT_SIZE} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    padding: 16,
  },
  labelView: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLOR.GRAY,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: COLOR.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
});
