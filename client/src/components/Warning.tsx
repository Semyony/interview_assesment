import React from 'react';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {warningState} from '../atoms/WarningState';
import {currentWarningState} from '../atoms/WarningState';

import Logger from '../utils/Logger';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    backgroundColor: '#F47564',
    paddingLeft: '40px',
    paddingRight: '20px',
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
  },
  dismiss: {
    width: '100px',
    height: '40px',
    left: '1320px',
    top: '15px',
    background: '#414141',
    borderRadius: '5px',
    border: 'none',
  },
  dismissText: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    marginLeft: 'auto',
  },
};

const Warning = () => {
  const setShowWarning = useSetRecoilState(warningState);
  const [currentWarning, setCurrentWarning] =
    useRecoilState(currentWarningState);
  const exit = () => {
    setShowWarning(false);
    Logger.info(currentWarning?.type + ' is dismissed');
  };
  return (
    <div style={styles.root}>
      <div>{currentWarning?.label}</div>
      <button style={styles.dismiss} onClick={exit}>
        <div style={styles.dismissText}>Dismiss</div>
      </button>
    </div>
  );
};

export default Warning;
