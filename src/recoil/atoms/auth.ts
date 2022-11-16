import {atom} from 'recoil';

interface Auth {
  token: string;
  userId: number;
}

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    token: '',
    userId: 0,
  },
});
