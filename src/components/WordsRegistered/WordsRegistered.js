import React from 'react';

import PropTypes from 'prop-types';

import styles from './WordsRegistered.module.scss';

const WordsRegistered = ({ secretWord, words }) => {
  const buildRow = (word, index) => {
    let guess = [];
    let correctChars = 0;
    for (let i = 0; i < word.length; i += 1) {
      const char = word[i];
      const correlatedSecretChar = secretWord[i];

      if (char.toUpperCase() === correlatedSecretChar.toUpperCase()) {
        correctChars += 1;
        guess.push(
          <span key={i} className={styles.correctChar}>
            {char.toUpperCase()}
          </span>
        );
      } else {
        guess.push(
          <span key={i} className={styles.wrongChar}>
            {char.toUpperCase()}
          </span>
        );
      }
    }

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className={styles.cellExplained}>{guess}</td>
        <td>{correctChars}</td>
      </tr>
    );
  };

  // const items = words.map((word, index) => <li key={index}>{word}</li>);

  if (!words.length) {
    return null;
  }

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Guess</th>
          <th>Correct chars</th>
        </tr>
      </thead>
      <tbody>{words.map(buildRow)}</tbody>
    </table>
  );
};

WordsRegistered.propTypes = {
  words: PropTypes.array,
  secretWord: PropTypes.array,
};

export default WordsRegistered;
