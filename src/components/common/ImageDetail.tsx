import React, {useEffect, useState} from 'react';
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import Close from '../../assets/icon/ic-close.svg';
import {screen} from '../../utils/utils';

interface Props {
  visible: boolean;
  setVisible: (prop: boolean) => void;
  images: string[] | undefined;
}
const ImageDetail = ({visible, setVisible, images}: Props) => {
  const [imgList, setImgList] = useState<IImageInfo[]>();

  useEffect(() => {
    let arr: IImageInfo[] = [];
    images?.forEach(data => arr.push({url: data}));
    setImgList(arr);
  }, [images]);

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
          imageUrls={imgList}
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
