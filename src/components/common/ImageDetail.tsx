import React from 'react';
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Close from '../../assets/icon/ic-close.svg';
import {screen} from '../../utils/utils';

const images = [
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
];

interface Props {
  visible: boolean;
  setVisible: (prop: boolean) => void;
}
const ImageDetail = ({visible, setVisible}: Props) => {
  return (
    <Modal visible={visible}>
      <>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setVisible(false);
          }}>
          <Close />
        </TouchableOpacity>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={() => {
            setVisible(false);
          }}
        />
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 20,
    top: Number(screen.statusBarHeight) + 20,
    zIndex: 2,
  },
});
export default ImageDetail;
