import React, { useRef, useEffect, createRef } from 'react';
import CharInput from '../CharInput/CharInput';
import styles from './CharChain.module.scss';

import PropTypes from 'prop-types';

const CharChain = ({ wordArray, onEntered }) => {
  const refsArray = useRef([]);

  const previousHandler = (index) => {
    const previous = index - 1;
    if (previous >= 0) {
      const input = refsArray.current[previous];
      input.current.focus();
    }
  };

  const nextHandler = (index) => {
    const next = index + 1;
    if (refsArray.current.length > next) {
      const input = refsArray.current[next];
      input.current.focus();
    } else {
      const word = collectChars(refsArray.current);
      console.log(`collect word ${word}`);
      clearInputs(refsArray.current);
      onEntered(word.toUpperCase());
    }
  };

  useEffect(() => {
    console.log(`onEntered changed`);
  }, [onEntered]);

  useEffect(() => {
    console.log(`wordArray changed`);
  }, [wordArray]);

  const collectChars = (refs) => {
    const letters = refs.map((ref) => ref.current.value);
    return letters.join('');
  };

  const clearInputs = (refs) => {
    refs.forEach((ref) => {
      ref.current.value = '';
    });
  };

  if (refsArray.current.length !== wordArray.length) {
    refsArray.current = Array(wordArray.length)
      .fill()
      .map((_, i) => refsArray.current[i] || createRef());
  }

  const inputs = wordArray.map((char, index) => (
    <CharInput
      key={index}
      char={char}
      ref={refsArray.current[index]}
      next={() => nextHandler(index)}
      previous={() => previousHandler(index)}
    />
  ));

  const alert = !wordArray.length ? <p role="alert">No word received</p> : null;

  useEffect(() => {
    console.log(`effect char chain`);

    if (refsArray.current.length) {
      refsArray.current[0].current.focus();
    }
  }, [wordArray]);

  return (
    <div role="group" className={styles.CharChain}>
      {inputs}
      {alert}
    </div>
  );
};

CharChain.propTypes = {
  wordArray: PropTypes.array,
  onEntered: PropTypes.func,
};

export default CharChain;
