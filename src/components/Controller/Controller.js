import React from 'react';

import styles from './Controller.module.scss';

import Levels from '../../utils/Levels';

const Controller = ({ started, onStart, selectedLevel, onLevelChange }) => {
  const levelOptions = Object.entries(Levels).map(([id, value]) => (
    <option key={id} value={value} selected={selectedLevel === value}>
      {id}
    </option>
  ));

  return (
    <div className={styles.Controller}>
      {/* <select
        disabled={started}
        onChange={(ev) => onLevelChange(ev.target.value)}
      >
        {levelOptions}
      </select> */}
      <button disabled={started} onClick={() => onStart(!started)}>
        Start
      </button>
    </div>
  );
};

export default Controller;
