import {StyleSheet} from 'react-native';
import {FONTS, COLOR, FONT_SIZE} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: FONTS.MONTSERRAT_BOLD,
    fontSize: FONT_SIZE.MD,
  },
  buttonStyle: {
    marginTop: 10,
  },
});
