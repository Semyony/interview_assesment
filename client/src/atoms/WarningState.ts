import {atom} from 'recoil';
import {Warning} from '../models/Warning';

const currentWarningState = atom<Warning | null>({
  key: 'currentWarning',
  default: null,
});

const warningState = atom<boolean>({
  key: 'warning',
  default: false,
});

const nextWarningState = atom<Warning | null>({
  key: 'nextWarning',
  default: null,
});

export {warningState, currentWarningState, nextWarningState};
