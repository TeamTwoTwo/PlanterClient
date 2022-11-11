import {atom} from 'recoil';

interface ServiceItemType {
  optionId: (number | null)[];
  plantName: string;
}

interface MatchingRequestInfo {
  plantManagerId: number | undefined;
  startDate: string;
  endDate: string;
  pickUpType: number | undefined;
  service: ServiceItemType[] | undefined;
}

export const MatchingRequestInfoState = atom<MatchingRequestInfo>({
  key: 'MatchingRequestInfoState',
  default: {
    plantManagerId: undefined,
    startDate: '',
    endDate: '',
    pickUpType: undefined,
    service: undefined,
  },
});
