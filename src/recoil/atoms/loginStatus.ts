import {atom} from 'recoil';

interface Status {
  isLogined: boolean;
}

export const LoginStatusState = atom<Status>({
  key: 'LoginStatusState',
  default: {
    isLogined: false,
  },
});
