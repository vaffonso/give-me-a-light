import React, { Fragment, useState } from 'react';

const CharInput = ({ char }) => {
  const [input, setInput] = useState('');

  const inputHandler = (ev) => {
    setInput(ev.target.value);
  };

  const statusText = !input
    ? ''
    : char.toLowerCase() === input
    ? 'Correct ✅'
    : 'Wrong ❌';

  return (
    <Fragment>
      <input type="text" maxLength="1" value={input} onChange={inputHandler} />
      <p role="status">{statusText}</p>
    </Fragment>
  );
};

export default CharInput;
