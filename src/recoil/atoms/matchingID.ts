import {atom} from 'recoil';

interface Status {
  matchingID: number | undefined;
}

export const MatchingIdState = atom<Status>({
  key: 'MatchingIdState',
  default: {
    matchingID: undefined,
  },
});
