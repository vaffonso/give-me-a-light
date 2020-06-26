import React, { useState, useEffect } from 'react';
// import 'normalize.css';
import './styles.scss';

import WordFetcher from './service/WordFetcher';
import CharChain from './components/CharChain/CharChain';
import Lights from './components/Lights/Lights';
import Controller from './components/Controller/Controller';
import WordsRegistered from './components/WordsRegistered/WordsRegistered';

import Levels from './utils/Levels';

const initialLevel = Levels.MEDIUM;

const getAvailableChars = () => {
  const allChars = [];
  for (var i = 97; i < 123; i++) {
    allChars.push(String.fromCharCode(i));
  }
  return allChars;
};

const getWord = () => Array.from(WordFetcher.getRandom());

const alphaChars = getAvailableChars();

export default function App() {
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(initialLevel);
  const [randomWord] = useState(() => getWord());
  const [enteredWords, setEnteredWords] = useState([]);

  const wordEnteredHandler = (wordEntered) => {
    const newEnteredWords = [...enteredWords, wordEntered];
    setEnteredWords(newEnteredWords);
  };

  useEffect(() => {
    console.log(`words entered changing ${enteredWords.length}`);
  }, [enteredWords]);

  return (
    <div className="App">
      <h1>Give me a light!</h1>
      <h2>Guess the word based on sequence the letters light up.</h2>
      <div style={{ textAlign: 'left' }}>
        <h3>App state</h3>
        <ul>
          <li>Started: {started.toString()}</li>
          <li>Level: {level}</li>
          <li>Secret word: {randomWord.join('')}</li>
          <li>Guesses: {enteredWords.length}</li>
        </ul>
      </div>

      <Lights
        wordArray={randomWord}
        availableChars={alphaChars}
        started={started}
        changeSpeed={level}
      />

      <Controller
        started={started}
        selectedLevel={level}
        onStart={() => setStarted(true)}
        onLevelChange={(level) => setLevel(level)}
      />

      {/* <h4 className="secretWord">{randomWord && randomWord.join('')}</h4> */}
      <CharChain
        wordArray={randomWord}
        onEntered={(word) => wordEnteredHandler(word)}
      />
      <WordsRegistered words={enteredWords} />
    </div>
  );
}
