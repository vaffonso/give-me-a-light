import React, {
  useState,
  useRef,
  useEffect,
  createRef,
  useCallback,
} from 'react';
import CharInput from '../CharInput/CharInput';
import styles from './CharChain.module.scss';

import { sameWord } from '../../utils/wordUtils';

import PropTypes from 'prop-types';

const resetInitialWord = (wordLength) => {
  return Array(wordLength).fill('');
};

const isFilled = (val) => {
  if (!val) {
    return false;
  }
  if (!val.trim()) {
    return false;
  }
  return true;
};

const nextRoundInterval = 750;

const Result = ({ isCorrect }) => {
  const ariaLabel = !isCorrect ? `Wrong` : `Correct`;
  const label = !isCorrect ? `❌` : `✅`;
  return (
    <span role="img" aria-label={ariaLabel} className={styles.result}>
      {label}
    </span>
  );
};

const CharChain = ({ wordArray, onEntered, enableInput }) => {
  const refsArray = useRef([]);
  const [formedWord, setFormedWord] = useState(
    resetInitialWord(wordArray.length)
  );

  const backSpaceHandler = (index) => {
    const previous = index - 1 < 0 ? 0 : index - 1;
    charEntered(previous, '');
  };

  const charEntered = (index, char) => {
    const newFormedWord = [...formedWord];
    newFormedWord[index] = char;
    setFormedWord(newFormedWord);
  };

  const setCharFocus = (index) => {
    const input = refsArray.current[index];
    input.current.focus();
  };

  /**
   * Set focus on the next non-filled input
   */
  const setFocus = useCallback((formedWord) => {
    let index;
    for (let i = 0; i < formedWord.length; i += 1) {
      if (!isFilled(formedWord[i])) {
        index = i;
        break;
      }
    }
    setCharFocus(index);
  }, []);

  useEffect(() => {
    let interval = null;
    const allFilled = formedWord.every(isFilled);
    if (allFilled) {
      interval = setInterval(() => {
        setFormedWord(resetInitialWord(wordArray.length));
        onEntered(formedWord);
      }, nextRoundInterval);
    } else {
      setFocus(formedWord);
    }

    return () => clearInterval(interval);
  }, [formedWord, onEntered, setFocus, wordArray]);

  /**
   *
   */
  if (refsArray.current.length !== wordArray.length) {
    refsArray.current = Array(wordArray.length)
      .fill()
      .map((_, i) => refsArray.current[i] || createRef());
  }

  const charEntry = formedWord.map((char, index) => (
    <CharInput
      key={index}
      char={char}
      charCheck={wordArray[index]}
      ref={refsArray.current[index]}
      disabled={!enableInput}
      charUpdate={(char) => charEntered(index, char)}
      backSpace={() => backSpaceHandler(index)}
    />
  ));

  const inputs = (
    <React.Fragment>
      {charEntry}
      {!formedWord.every(isFilled) ? null : (
        <Result isCorrect={sameWord(wordArray, formedWord)} />
      )}
    </React.Fragment>
  );

  const content = wordArray.length ? (
    inputs
  ) : (
    <p role="alert">No word received</p>
  );

  return (
    <div role="group" className={styles.CharChain}>
      {content}
    </div>
  );
};

CharChain.propTypes = {
  enableInput: PropTypes.any,
  onEntered: PropTypes.func,
  wordArray: PropTypes.array,
};

export default CharChain;
