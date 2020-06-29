import React, { forwardRef } from 'react';

import styles from './CharInput.module.scss';

/**
 * Cheers to https://codepen.io/Godje/pen/XRKqoY
 * @param {*} param0
 */
const CharInput = forwardRef(
  ({ charCheck, char, backSpace, charUpdate, disabled }, ref) => {
    // console.log(`rendering char input with char >${char}<`);
    const keyDownHandler = (ev) => {
      if (ev.which === 8) {
        backSpace();
      }
    };

    const inputHandler = (ev) => {
      const value = ev.target.value;
      charUpdate(value.toUpperCase());
    };

    const statusText = !char
      ? ''
      : charCheck.toUpperCase() === char
      ? '✅'
      : '❌';

    return (
      <div className={styles.CharInput}>
        <input
          type="text"
          maxLength="1"
          size="1"
          value={char}
          onChange={inputHandler}
          onKeyDown={keyDownHandler}
          ref={ref}
          disabled={disabled}
          placeholder="-"
        />
        <p role="status">{statusText}</p>
      </div>
    );
  }
);

export default CharInput;
