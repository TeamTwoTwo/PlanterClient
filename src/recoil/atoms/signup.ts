import {atom} from 'recoil';

interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
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
  },
});
