import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styles from './Lights.module.scss';
import LightBulb from '../LightBulb/LightBulb';

import { checkMatchingChars } from '../../utils/wordUtils';

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

const Lights = ({
  availableChars,
  wordArray,
  changeSpeed,
  start,
  onComplete,
}) => {
  const [currentLight, setCurrentLight] = useState(0);
  const [lightsProps, setLightsProps] = useState([]);

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

    if (start) {
      if (currentLight < wordArray.length) {
        interval = setInterval(() => {
          setCurrentLight((currentLight) => currentLight + 1);
        }, changeSpeed);
      } else {
        setCurrentLight(0);
        onComplete();
      }
    }

    return () => clearInterval(interval);
  }, [currentLight, start, changeSpeed, wordArray, onComplete]);

  const lights = lightsProps.map((props) => (
    <LightBulb
      {...props}
      lightenUp={start && wordArray[currentLight] === props.char}
    />
  ));

  const content = <div className={styles.Lights}>{lights}</div>;
  const alert = <p>Available chars don't match word chars.</p>;

  return checkMatchingChars(availableChars, wordArray) ? content : alert;
};

Lights.propTypes = {
  wordArray: PropTypes.array.isRequired,
};

export default React.memo(Lights);
