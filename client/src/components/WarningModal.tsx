import React, {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import {useSetRecoilState, useRecoilState} from 'recoil';
import WarningDropdown from './WarningDropdown';
import {currentWarningState, nextWarningState} from '../atoms/WarningState';
import {showDropdownState} from '../atoms/ChangeUserDropdownState';
import {showWarningModalState} from '../atoms/WarningModalState';
import {Warning, WarningGQLResponse} from '../models/Warning';
import Logger from '../utils/Logger';
import {GoChevronDown, GoChevronUp} from 'react-icons/go';
import LoadingOverlay from './LoadingOverlay';
import ErrorOverlay from './ErrorOverlay';
import {warningState} from '../atoms/WarningState';

interface WarningManyData {
  warningMany: WarningGQLResponse[];
}

interface WarningManyVars {
  limit: number;
}

export const GET_WARNINGS = gql`
  query GetWarning($limit: Int!) {
    warningMany(limit: $limit) {
      _id
      type
      label
    }
  }
`;

const styles: {[key: string]: React.CSSProperties} = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
  },
  modal: {
    width: '600px',
    height: '280px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#414141',
    boxShadow:
      '0px 6px 20px 0px rgba(176, 190, 197, 0.32), 0px 2px 4px 0px rgba(176, 190, 197, 0.32)',
  },
  dropdownButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#C6C6C6',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '550px',
    height: '100px',
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '550px',
    padding: '20px',
    fontWeight: 600,
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'default',
  },
  startWarningButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F47564',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    cursor: 'default',
    color: '#FFFFFF',
  },
  endWarningButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABEFEB',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'default',
  },
};

const WarningModal = () => {
  const {loading, error, data} = useQuery<WarningManyData, WarningManyVars>(
    GET_WARNINGS,
    {variables: {limit: 3}}
  );
  const setShowModal = useSetRecoilState(showWarningModalState);
  const [showDropdown, setShowDropdown] = useRecoilState(showDropdownState);
  const [currentWarning, setCurrentWarning] =
    useRecoilState(currentWarningState);
  const setShowWarning = useSetRecoilState(warningState);
  const [nextWarning, setNextWarning] = useRecoilState(nextWarningState);
  const [cancelButtonOpacity, setCancelButtonOpacity] = useState(1.0);
  const [changeEndButtonOpacity, setChangeEndButtonOpacity] = useState(1.0);
  const [changeStartButtonOpacity, setChangeStartButtonOpacity] = useState(1.0);
  const [iconColor, setIconColor] = useState('#414141');
  const ChevronIcon = showDropdown ? GoChevronUp : GoChevronDown;

  if (loading) return <LoadingOverlay data-testid="loading" />;
  if (error) return <ErrorOverlay data-testid="error" />;

  const onExitModal = () => {
    setShowModal(false);
    setShowDropdown(false);
  };

  return (
    <div
      style={styles.root}
      data-testid="change_warning_modal"
      onClick={onExitModal}
    >
      <div
        style={styles.modal}
        onClick={event => {
          event.stopPropagation();
          setShowDropdown(false);
        }}
      >
        <h1>Admin Console</h1>
        <h4>Start a Site Wide Warning</h4>
        <div
          style={styles.dropdownButton}
          onClick={event => {
            event.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          <div>{nextWarning?.type} </div>
          <ChevronIcon
            size={30}
            color={iconColor}
            onMouseEnter={() => setIconColor('#525252')}
            onMouseLeave={() => setIconColor('#414141')}
            onClick={event => {
              event.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          />
        </div>
        {showDropdown ? (
          <WarningDropdown
            warnings={
              data
                ? data.warningMany.map(({_id, type, label}) => {
                    return {id: _id, type, label} as Warning;
                  })
                : []
            }
            onSelect={warning => {
              setShowDropdown(!showDropdown);
              setNextWarning(warning);
            }}
          />
        ) : null}
        <div style={styles.footer}>
          <div
            style={{...styles.cancelButton, opacity: cancelButtonOpacity}}
            onClick={onExitModal}
            onMouseEnter={() => setCancelButtonOpacity(0.8)}
            onMouseLeave={() => setCancelButtonOpacity(1.0)}
          >
            Cancel
          </div>
          {currentWarning !== null && (
            <div
              style={{
                ...styles.endWarningButton,
                opacity:
                  nextWarning?.type !== currentWarning?.type ||
                  nextWarning === null
                    ? 0.5
                    : changeEndButtonOpacity,
              }}
              onMouseEnter={() =>
                currentWarning?.type === nextWarning?.type &&
                setChangeEndButtonOpacity(0.8)
              }
              onMouseLeave={() =>
                currentWarning?.type === nextWarning?.type &&
                setChangeEndButtonOpacity(1.0)
              }
              onClick={event => {
                event.stopPropagation();
                if (
                  currentWarning !== null &&
                  nextWarning?.type === currentWarning?.type
                ) {
                  setShowModal(false);
                  setShowWarning(false);
                  setCurrentWarning(null);
                  Logger.info(nextWarning?.type + ' is stopped');
                  onExitModal();
                }
              }}
            >
              End Warning
            </div>
          )}

          <div
            style={{
              ...styles.startWarningButton,
              opacity:
                nextWarning?.type === currentWarning?.type ||
                nextWarning === null
                  ? 0.5
                  : changeStartButtonOpacity,
            }}
            onMouseEnter={() =>
              null !== currentWarning && setChangeStartButtonOpacity(0.8)
            }
            onMouseLeave={() =>
              null !== currentWarning && setChangeStartButtonOpacity(1.0)
            }
            onClick={event => {
              event.stopPropagation();
              if (
                nextWarning !== null &&
                nextWarning?.type !== currentWarning?.type
              ) {
                setShowModal(false);
                setShowWarning(true);
                setCurrentWarning(nextWarning);
                Logger.info('New ' + nextWarning?.type + ' is started');
                onExitModal();
              }
            }}
          >
            Start Warning
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
