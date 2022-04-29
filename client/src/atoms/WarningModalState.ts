import {atom} from 'recoil';

const showWarningModalState = atom<boolean>({
  key: 'showWarningModal',
  default: false,
});

export {showWarningModalState};
