import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './Lights.module.scss';
import LightBulb from '../LightBulb/LightBulb';

/**
 * Confirms match of chars to be displayed with word chars
 * @function
 * @param {*} availableChars - Array of chars to be displayed
 * @param {*} wordChars - Array of chars in the word
 * @returns {boolean}
 */
const checkMatchingChars = (availableChars, wordChars) => {
  for (let char of wordChars) {
    if (!availableChars.includes(char)) {
      return false;
    }
  }
  return true;
};

const shuffle = (availableChars) => {
  const shuffledArray = [...availableChars];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }
  return shuffledArray;
};

const Lights = ({ availableChars, wordArray, changeSpeed, started }) => {
  const [currentLight, setCurrentLight] = useState(0);
  const [lightsProps, setLightsProps] = useState([]);
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const shuffled = shuffle(availableChars);
    const lightsProps = shuffled.map((letter, ind) => ({
      key: ind,
      char: letter,
      height: Math.random() * (200 - 10) + 10,
    }));
    setLightsProps(lightsProps);
  }, [availableChars]);

  useEffect(() => {
    let interval = null;
    if (!lightsProps.length) {
      return;
    }
    const currLetter = wordArray[currentLight];

    const lights = lightsProps.map((props) => (
      <LightBulb {...props} lightenUp={started && currLetter === props.char} />
    ));

    if (started && currentLight < wordArray.length) {
      interval = setInterval(() => {
        setCurrentLight((currentLight) => currentLight + 1);
      }, changeSpeed);
    }

    setLights(lights);
    return () => clearInterval(interval);
  }, [currentLight, started, lightsProps, changeSpeed, wordArray]);

  const content = <div className={styles.Lights}>{lights}</div>;
  const alert = <p>Available chars don't match word chars.</p>;

  return checkMatchingChars(availableChars, wordArray) ? content : alert;
};

Lights.propTypes = {
  wordArray: PropTypes.array.isRequired,
};

export default React.memo(Lights);
