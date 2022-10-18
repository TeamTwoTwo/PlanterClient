import {Dimensions, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const color = {
  gray_00: '#FFFFFF',
  gray_01: '#F7F7F7',
  gray_02: '#F5F4F3',
  gray_03: '#DFDFDF',
  gray_04: '#AEAEAE',
  gray_05: '#757575',
  gray_06: '#424242',
  gray_07: '#242424',
  gray_08: '#101010',
  mint_00: '#F0FFFD',
  mint_01: '#E2FFFB',
  mint_02: '#B3EFE8',
  mint_03: '#89E6DB',
  mint_04: '#74D3C7',
  mint_05: '#2CD0BC',
  mint_06: '#13BBA7',
  mint_07: '#36A99B',
  blueGray_00: '#EDF0F5',
  blueGray_01: '#AEB7CA',
  blueGray_02: '#8794AD',
  blueGray_03: '#6C788F',
  blueGray_04: '#566279',
  blueGray_05: '#404B60',
  blueGray_06: '#272F3E',
  red_01: '#FF7676',
  red_02: '#FF5757',
  blue_01: '76B5FF',
  blue_02: '509CF7',
};

export const url = {
  dev: 'https://dev.planter22.shop/',
};

interface ScreenProps {
  width: number;
  height: number;
  statusBarHeight: number | undefined;
}

export const screen: ScreenProps = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  statusBarHeight:
    Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight,
};

interface TypoProps {
  h1: object;
  h2: object;
  subtitle1: object;
  subtitle2: object;
  subtitle3: object;
  subtitle4: object;
  body1: object;
  body2: object;
  caption1: object;
  caption2: object;
  caption3: object;
}

export const Typography: TypoProps = {
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  subtitle3: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  subtitle4: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  body2: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  caption1: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  caption2: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
  caption3: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '600',
  },
};
