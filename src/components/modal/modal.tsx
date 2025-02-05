import React from 'react';
import {StyleSheet} from 'react-native';
import RNModal from 'react-native-modal';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  onBackdropPress?: () => void;
}

export const Modal = ({
  children,
  visible,
  onBackdropPress,
  onClose,
}: ModalProps) => {
  return (
    <RNModal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={onBackdropPress ?? onClose}>
      {children}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    margin: 0,
  },
});
