import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ServiceType} from '../../../screens/MyPage/MyMatchingPageScreen';
import {color, Typography} from '../../../utils/utils';

interface Props {
  type: string;
  idx: number;
  serviceItem: ServiceType;
  serviceList: ServiceType[];
  setServiceList: Dispatch<SetStateAction<ServiceType[]>>;
  removeService: () => void;
}

const MyMatchingServiceItem = ({
  type,
  idx,
  serviceItem,
  serviceList,
  setServiceList,
  removeService,
}: Props) => {
  const onChangeName = (e: string) => {
    const changed = {
      ...serviceItem,
      name: e,
    };
    let list = [...serviceList];
    list[idx] = changed;
    setServiceList(list);
  };

  const onChangePrice = (e: string) => {
    const changed = {
      ...serviceItem,
      price: Number(e),
    };
    let list = [...serviceList];
    list[idx] = changed;
    setServiceList(list);
  };

  const onChangeNum = (e: string) => {
    const changed = {
      ...serviceItem,
      number: Number(e),
    };
    let list = [...serviceList];
    list[idx] = changed;
    setServiceList(list);
  };

  return (
    <View>
      <View style={styles.headerWrap}>
        <Text style={[Typography.subtitle1, {color: color.blueGray_06}]}>
          서비스 종류{idx + 1}
        </Text>
        {serviceList.length > 1 && (
          <TouchableOpacity activeOpacity={1} onPress={removeService}>
            <Text style={[Typography.body1, {color: color.blueGray_01}]}>
              삭제
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.nameWrap}>
        <TextInput
          style={[styles.name, Typography.body1]}
          placeholder="식물관리"
          placeholderTextColor={color.blueGray_01}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={serviceItem.name}
          onChangeText={onChangeName}
          editable={type === 'butler' ? false : true}
        />
      </View>
      <View style={styles.priceWrap}>
        <TextInput
          placeholder="￦5,000"
          style={[Typography.body1, {color: color.blueGray_06, width: '70%'}]}
          value={serviceItem.price.toString()}
          onChangeText={onChangePrice}
          keyboardType="number-pad"
        />
        <View style={styles.separator} />
        <TextInput
          placeholder="1"
          style={[Typography.body1, {color: color.blueGray_06}]}
          value={serviceItem.number.toString()}
          onChangeText={onChangeNum}
          keyboardType="number-pad"
        />
        <Text style={[Typography.body1, {color: color.blueGray_06}]}>개당</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameWrap: {
    marginTop: 20,
  },
  priceWrap: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFC',
    height: 52,
    padding: 14,
  },
  name: {
    backgroundColor: '#FAFAFC',
    height: 52,
    padding: 14,
    paddingTop: 14,
    color: color.blueGray_06,
  },
  separator: {
    height: 20,
    width: 0,
    borderWidth: 1,
    borderColor: color.blueGray_00,
  },
});

export default MyMatchingServiceItem;
