import React, {useState} from 'react';
import {Warning} from '../models/Warning';

const styles: {[key: string]: React.CSSProperties} = {
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '550px',
    justifyContent: 'flex-start',
    borderRadius: '5px',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '10px',
    marginTop: '200px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  menuItem: {
    padding: '10px',
    height: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'default',
    flex: 1,
  },
  label: {
    marginTop: '5px',
    fontSize: '12px',
    width: '450px',
    fontWeight: 'normal',
    color: 'grey',
  },
};

type DropdownProps = {
  warnings: Warning[];
  onSelect: (warning: Warning) => void;
};

const WarningDropdown = (props: DropdownProps) => {
  const [hoveredMenuItemKey, setHoveredMenuItemKey] = useState<string | null>(
    null
  );
  return (
    <div style={styles.dropdown}>
      {props.warnings.length > 0 ? (
        props.warnings.map((warning: Warning) => {
          return (
            <div
              key={warning.id}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  hoveredMenuItemKey === warning.id ? '#EEEEEE' : '#FFFFFF',
              }}
              onClick={() => {
                props.onSelect(warning);
              }}
              onMouseEnter={() => setHoveredMenuItemKey(warning.id)}
              onMouseLeave={() => setHoveredMenuItemKey(null)}
            >
              <div>{warning.type}</div>
              <div style={styles.label}>{warning.label}</div>
            </div>
          );
        })
      ) : (
        <div style={styles.menuItem}>No Warnings Available</div>
      )}
    </div>
  );
};

export default WarningDropdown;
