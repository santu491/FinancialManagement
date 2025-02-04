import React, {useState} from 'react';
import {Picker as RNPicker} from '@react-native-picker/picker';
import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {COLOR, FONT_SIZE, FONTS} from '../../theme';

export interface Item {
  id?: string;
  type: string;
  label: string;
}

interface PickerProps {
  data: Item[];
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const Picker = ({
  data,
  label,
  onValueChange,
  selectedValue,
}: PickerProps) => {
  const [enablePicker, setEnablePicker] = useState(false);
  const onPressDone = () => {
    setEnablePicker(false);
  };
  return (
    <View>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        onPress={() => setEnablePicker(true)}
        style={styles.titleView}>
        <Text style={styles.title}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal
        visible={enablePicker}
        onRequestClose={() => setEnablePicker(false)}
        backdropColor={'#000000'}
        transparent
        style={styles.modal}>
        <TouchableOpacity style={styles.backdrop} />
        <View style={styles.picker}>
          <TouchableOpacity onPress={onPressDone}>
            <Text style={styles.done}>Done</Text>
          </TouchableOpacity>
          <RNPicker
            mode="dialog"
            selectedValue={selectedValue}
            style={styles.pickerView}
            onValueChange={value => {
              onValueChange(value);
            }}>
            {data.map(item => {
              return (
                <RNPicker.Item
                  label={item.label}
                  value={item.label}
                  key={item.label}
                />
              );
            })}
          </RNPicker>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 12,
    height: 46,
  },
  title: {
    color: COLOR.TEXT,
    fontFamily: FONTS.LATO,
    fontSize: FONT_SIZE.MD,
  },
  pickerLabel: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.MD,
    color: COLOR.TEXT,
    paddingBottom: 8,
    paddingLeft: 2,
  },
  pickerView: {
    // height: 100,
    // flex: 0.5,
    backgroundColor: COLOR.WHITE,
  },
  backdrop: {
    height: '100%',
    backgroundColor: '00000040',
  },
  modal: {
    opacity: 0.5,
    // flex: 1,
    // padding: 0,
    // margin: 0,
    flex: 1,
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '00000040',
  },
  done: {
    fontFamily: FONTS.LATO_TEXT_BOLD,
    fontSize: FONT_SIZE.XL,
    color: COLOR.BLUE,
    padding: 10,
    textAlign: 'right',
  },
  picker: {
    backgroundColor: COLOR.WHITE,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
