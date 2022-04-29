import {useRecoilValue} from 'recoil';

import './App.css';
import {showUserModalState} from './atoms/ChangeUserModalState';
import {showWarningModalState} from './atoms/WarningModalState';

import {showSettingsMenuState} from './atoms/SettingsMenuState';
import ChangeUserModal from './components/ChangeUserModal';
import WarningModal from './components/WarningModal';
import SettingsMenu from './components/SettingsMenu';
import HomeScreen from './containers/HomeScreen';
import Warning from './components/Warning';
import {warningState} from './atoms/WarningState';

const App = () => {
  const showChangeUserModal = useRecoilValue(showUserModalState);
  const showChangeWarningModal = useRecoilValue(showWarningModalState);

  const showSettingsMenu = useRecoilValue(showSettingsMenuState);
  const showWarning = useRecoilValue(warningState);
  return (
    <div className="App">
      {showWarning ? <Warning /> : null}
      <HomeScreen />
      {showChangeUserModal ? <ChangeUserModal /> : null}
      {showChangeWarningModal ? <WarningModal /> : null}
      {showSettingsMenu ? <SettingsMenu /> : null}
    </div>
  );
};

export default App;
