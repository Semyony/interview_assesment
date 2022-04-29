import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {showUserModalState} from '../atoms/ChangeUserModalState';
import {showWarningModalState} from '../atoms/WarningModalState';

import {showSettingsMenuState} from '../atoms/SettingsMenuState';
import {warningState} from '../atoms/WarningState';
import {useRecoilValue} from 'recoil';

const styles: {[key: string]: React.CSSProperties} = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 'calc(100vw - 220px)',
    width: '180px',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: '5px',
    boxShadow:
      '0px 6px 20px 0px rgba(176, 190, 197, 0.32), 0px 2px 4px 0px rgba(176, 190, 197, 0.32)',
    padding: '10px',
  },
  menuItem: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'default',
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
};

const SettingsMenuItemType = Object.freeze({
  SETTINGS: 'SETTINGS',
  HELP: 'HELP',
  ADMIN_CONSOLE: 'ADMIN_CONSOLE',
  CHANGE_USER: 'CHANGE_USER',
});

const SettingsMenuItemConfigs = [
  {
    type: SettingsMenuItemType.SETTINGS,
    label: 'Settings',
    onClick: () => {},
  },
  {
    type: SettingsMenuItemType.HELP,
    label: 'Help',
    onClick: () => {},
  },
  {
    type: SettingsMenuItemType.ADMIN_CONSOLE,
    label: 'Admin Console',
    onClick: (setShowWarningModal: (value: boolean) => void) =>
      setShowWarningModal(true),
  },
  {
    type: SettingsMenuItemType.CHANGE_USER,
    label: 'Change User',
    onClick: (setShowChangeUserModal: (value: boolean) => void) =>
      setShowChangeUserModal(true),
  },
];

const SettingsMenu = () => {
  const setShowChangeUserModal = useSetRecoilState(showUserModalState);
  const setShowWarningModal = useSetRecoilState(showWarningModalState);
  const setShowSettingsMenu = useSetRecoilState(showSettingsMenuState);
  const [hoveredMenuItemKey, setHoveredMenuItemKey] = useState<number | null>(
    null
  );
  const showWarning = useRecoilValue(warningState);

  return (
    <div
      style={{...styles.overlay, top: showWarning ? '150px' : '90px'}}
      onClick={() => setShowSettingsMenu(false)}
    >
      <div style={styles.menu}>
        {SettingsMenuItemConfigs.map((menuItem, idx) => (
          <div
            key={idx}
            style={{
              ...styles.menuItem,
              backgroundColor:
                hoveredMenuItemKey === idx ? '#EEEEEE' : '#FFFFFF',
            }}
            onClick={() => {
              setShowSettingsMenu(false);
              {
                menuItem.type === SettingsMenuItemType.ADMIN_CONSOLE &&
                  menuItem.onClick(setShowWarningModal);
              }
              {
                menuItem.type === SettingsMenuItemType.CHANGE_USER &&
                  menuItem.onClick(setShowChangeUserModal);
              }
            }}
            onMouseEnter={() => setHoveredMenuItemKey(idx)}
            onMouseLeave={() => setHoveredMenuItemKey(null)}
          >
            {menuItem.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenu;
