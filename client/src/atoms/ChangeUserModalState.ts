import {atom} from 'recoil';

const showUserModalState = atom<boolean>({
  key: 'showUserModal',
  default: false,
});

export {showUserModalState};
