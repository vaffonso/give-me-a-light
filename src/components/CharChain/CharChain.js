import React from 'react';
import CharInput from '../CharInput/CharInput';
import styles from './CharChain.module.scss';

import PropTypes from 'prop-types';

const CharChain = ({ word }) => {
  const receivedWord = word || '';
  const wordArray = Array.from(receivedWord);

  const inputs = wordArray.map((char, ind) => (
    <CharInput key={ind} char={char} />
  ));
  const alert = !wordArray.length ? <p role="alert">No word received</p> : null;

  return (
    <div role="group" className={styles.CharChain}>
      {inputs}
      {alert}
    </div>
  );
};

CharChain.propTypes = {
  word: PropTypes.string,
};

CharChain.defaults = {
  word: '',
};

export default CharChain;
