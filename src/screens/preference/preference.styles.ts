import {StyleSheet} from 'react-native';
import {COLOR} from '../../../src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.GRAY,
    padding: 16,
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
  title: {
    color: COLOR.BLUE,
  },
});
