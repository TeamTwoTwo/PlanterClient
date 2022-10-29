import {atom} from 'recoil';

interface Auth {
  token: string;
  userId: string;
}

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    token: '',
    userId: '',
  },
});
