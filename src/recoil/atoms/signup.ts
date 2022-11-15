import {atom} from 'recoil';

interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
  address: string;
  detailAddress: string;
  simpleAddress: string;
  latitude: string | null;
  longitude: string | null;
}

export const signupState = atom<User>({
  key: 'signupState',
  default: {
    email: '',
    password: '',
    name: '',
    nickname: '',
    birth: '',
    phone: '',
    address: '',
    detailAddress: '',
    simpleAddress: '',
    latitude: null,
    longitude: null,
  },
});
