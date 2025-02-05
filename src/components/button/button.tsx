import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLOR, FONT_SIZE, FONTS} from '../../../src/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    title,
    onPress,
    buttonStyle,
    titleStyle,
    disabled = false,
    ...buttonProps
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disableButton, buttonStyle]}
      activeOpacity={0.7}
      disabled={disabled}
      {...buttonProps}>
      <Text style={[styles.label, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.BLUE,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    color: COLOR.WHITE,
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.MD,
    lineHeight: 24,
  },
  disableButton: {
    backgroundColor: COLOR.GRAY,
  },
});
