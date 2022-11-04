import {Modal as _Modal, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  overlay?: boolean;
  children: React.ReactNode;
}

const Modal = ({visible, setVisible, overlay = false, children}: Props) => {
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
          setVisible(false);
        }}
      />
      {children}
    </_Modal>
  );
};

export default Modal;
