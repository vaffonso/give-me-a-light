import React from 'react';

import styles from './Controller.module.scss';

import { LEVELS } from '../../utils/Game';

const Controller = ({ started, onStart, selectedLevel, onLevelChange }) => {
  const levelOptions = Object.entries(LEVELS).map(([id, value]) => (
    <option key={id} value={value}>
      {id}
    </option>
  ));

  levelOptions.unshift(
    <option key="-1" value="">
      Select game level
    </option>
  );

  return (
    <div className={styles.Controller}>
      <select
        value={selectedLevel}
        disabled={started}
        onChange={(ev) => onLevelChange(ev.target.value)}
      >
        {levelOptions}
      </select>
      <button
        disabled={started || !selectedLevel}
        onClick={() => onStart(!started)}
      >
        Start
      </button>
    </div>
  );
};

export default Controller;
