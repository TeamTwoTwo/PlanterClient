import {Modal as _Modal, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  overlay?: boolean;
  children: React.ReactNode;
  cancle?: boolean;
}

const Modal = ({
  visible,
  setVisible,
  overlay = false,
  children,
  cancle = false,
}: Props) => {
  return (
    <_Modal
      animationType="none"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: overlay ? 'rgba(0,0,0,0.5)' : 'transparent',
        }}
        onPress={() => {
          if (cancle === false) {
            setVisible(false);
          }
        }}
      />
      {children}
    </_Modal>
  );
};

export default Modal;
