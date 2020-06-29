import React, { useState, useEffect } from 'react';
// import 'normalize.css';
import './styles.scss';

import WordFetcher from './service/WordFetcher';
import CharChain from './components/CharChain/CharChain';
import Lights from './components/Lights/Lights';
import Controller from './components/Controller/Controller';
import WordsRegistered from './components/WordsRegistered/WordsRegistered';

// import Levels from './utils/Levels';

// const initialGameLevel = Levels.MEDIUM;

// const maxGuesses = 5;

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
  const [randomWord] = useState(() => getWord());

  const [started, setStarted] = useState(false);

  const [enteredWords, setEnteredWords] = useState([]);

  const [gameLevel, setGameLevel] = useState('');

  const [lights, setLights] = useState({
    changeSpeed: gameLevel,
    state: false,
  });

  const wordEnteredHandler = (wordEntered) => {
    const newEnteredWords = [...enteredWords, wordEntered];
    setEnteredWords(newEnteredWords);
  };

  useEffect(() => {
    // console.log(`words entered changing ${enteredWords.length}`);
    const newLightSpeed = gameLevel + 25 * enteredWords.length;
    setLights({
      changeSpeed: newLightSpeed,
      state: true,
    });
  }, [enteredWords, gameLevel]);

  useEffect(() => {
    if (started) {
      setLights((prevState) => ({ ...prevState, state: true }));
    }
  }, [started]);

  return (
    <div className="App">
      <h1>Give me a light!</h1>
      <h2>Guess the word based on sequence the letters light up.</h2>
      <div hidden={true} style={{ textAlign: 'left' }}>
        <h3>App state</h3>
        <ul>
          <li>Started: {started.toString()}</li>
          <li>Game level: {gameLevel}</li>
          <li>Secret word: {randomWord.join('')}</li>
          <li>Guesses: {enteredWords.length}</li>
          <li>Lights: {JSON.stringify(lights)}</li>
        </ul>
      </div>

      <Controller
        started={started}
        selectedLevel={gameLevel}
        onStart={() => setStarted(true)}
        onLevelChange={(level) => {
          setGameLevel(Number(level));
        }}
      />

      <Lights
        wordArray={randomWord}
        availableChars={alphaChars}
        start={started && lights.state}
        onComplete={() =>
          setLights((prevState) => ({ ...prevState, state: false }))
        }
        changeSpeed={lights.changeSpeed}
      />

      {/* <h4 className="secretWord">{randomWord && randomWord.join('')}</h4> */}
      <CharChain
        wordArray={randomWord}
        onEntered={(word) => wordEnteredHandler(word)}
        enableInput={started && !lights.state}
      />
      <WordsRegistered words={enteredWords} secretWord={randomWord} />
    </div>
  );
}
