import React, { forwardRef, useState, useEffect } from 'react';

import styles from './CharInput.module.scss';

const validValue = (val) => {
  if (!val) {
    return false;
  }
  if (!val.trim()) {
    return false;
  }
  return true;
};

/**
 * Cheers to https://codepen.io/Godje/pen/XRKqoY
 * @param {*} param0
 */
const CharInput = forwardRef(({ char, next, previous }, ref) => {
  const [input, setInput] = useState('');

  const keyDownHandler = (ev) => {
    if (ev.which === 8 && !input) {
      previous();
    }
  };

  const inputHandler = (ev) => {
    const value = ev.target.value;
    setInput(value.toUpperCase());
  };

  useEffect(() => {
    console.log(`Input changed to >${input}<`);
  }, [input]);

  useEffect(() => {
    console.log(`next function changed`);
  }, [next]);

  useEffect(() => {
    if (validValue(input)) {
      next();
    }
  }, [input]);

  const statusText = !input ? '' : char.toUpperCase() === input ? '✅' : '❌';

  return (
    <div className={styles.CharInput}>
      <input
        type="text"
        maxLength="1"
        size="1"
        value={input}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        ref={ref}
        placeholder="-"
      />
      <p role="status">{statusText}</p>
    </div>
  );
});

export default CharInput;
