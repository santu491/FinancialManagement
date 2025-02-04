import React from 'react';
import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {COLOR, FONT_SIZE, FONTS} from '../../../src/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  required?: boolean;
  inputViewStyle?: StyleProp<ViewStyle>;
}

export const TextInput = (props: InputProps) => {
  const {
    style,
    label,
    labelStyle,
    errorMessage,
    required,
    inputViewStyle,
    ...inputProps
  } = props;
  return (
    <View style={[styles.inputView, inputViewStyle]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required ? <Text style={styles.required}>*</Text> : null}
        </Text>
      ) : null}
      <RNTextInput
        style={[styles.input, props.multiline && styles.multiLineInput, style]}
        {...inputProps}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 12,
    height: 46,
    color: COLOR.TEXT,
    fontFamily: FONTS.LATO,
    fontSize: FONT_SIZE.MD,
  },
  label: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.MD,
    color: COLOR.TEXT,
    paddingBottom: 8,
    paddingLeft: 2,
  },
  inputView: {},
  multiLineInput: {
    height: 120,
  },
  error: {
    fontFamily: FONTS.LATO,
    fontSize: FONT_SIZE.SM,
    color: 'red',
    paddingTop: 5,
  },
});
