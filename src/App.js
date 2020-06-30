import React, { useState, useEffect } from 'react';
// import 'normalize.css';
import './styles.scss';

import WordFetcher from './service/WordFetcher';
import CharChain from './components/CharChain/CharChain';
import Lights from './components/Lights/Lights';
import Controller from './components/Controller/Controller';
import WordsRegistered from './components/WordsRegistered/WordsRegistered';

import { sameWord } from './utils/wordUtils';
import { STATUS } from './utils/Game';
import StatusMessage from './components/StatusMessage/StatusMessage';

// const initialGameLevel = LEVELS.MEDIUM;

const maxGuesses = 5;

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
  const [game, setGame] = useState({
    status: STATUS.INITIAL,
    level: '',
    enteredWords: [],
  });
  const [lights, setLights] = useState({
    changeSpeed: game.level,
    state: false,
  });

  const wordEnteredHandler = (wordEntered) => {
    const newEnteredWords = [...game.enteredWords, wordEntered];
    if (sameWord(wordEntered, randomWord)) {
      setGame((prevGameState) => ({
        ...prevGameState,
        status: STATUS.COMPLETE,
        enteredWords: newEnteredWords,
      }));
    } else if (newEnteredWords.length >= maxGuesses) {
      setGame((prevGameState) => ({
        ...prevGameState,
        status: STATUS.GAME_OVER,
        enteredWords: newEnteredWords,
      }));
    } else {
      setGame((prevGameState) => ({
        ...prevGameState,
        enteredWords: newEnteredWords,
      }));
    }
  };

  useEffect(() => {
    // console.log(`words entered changing ${enteredWords.length}`);
    const newLightSpeed = game.level + 25 * game.enteredWords.length;
    setLights({
      changeSpeed: newLightSpeed,
      state: true,
    });
  }, [game]);

  console.log(`
    App State
    Game: ${JSON.stringify(game)}
    Secret word: ${randomWord.join('')}
    Guesses: ${game.enteredWords.length}
    Lights: ${JSON.stringify(lights)} 
  `);

  return (
    <div className="App">
      <h1>Give me a light!</h1>
      <h3>Guess the word based on sequence the letters light up.</h3>

      <Controller
        started={game.status === STATUS.STARTED}
        selectedLevel={game.level}
        onStart={() =>
          setGame((prevGameState) => ({
            ...prevGameState,
            status: STATUS.STARTED,
          }))
        }
        onLevelChange={(level) => {
          setGame((prevGameState) => ({
            ...prevGameState,
            level: Number(level),
          }));
        }}
      />

      <Lights
        wordArray={randomWord}
        availableChars={alphaChars}
        start={game.status === STATUS.STARTED && lights.state}
        onComplete={() =>
          setLights((prevState) => ({ ...prevState, state: false }))
        }
        changeSpeed={lights.changeSpeed}
      />

      {/* <h4 className="secretWord">{randomWord && randomWord.join('')}</h4> */}
      <CharChain
        wordArray={randomWord}
        onEntered={(word) => wordEnteredHandler(word)}
        enableInput={game.status === STATUS.STARTED && !lights.state}
      />
      <StatusMessage status={game.status} word={randomWord} />
      <WordsRegistered words={game.enteredWords} secretWord={randomWord} />
    </div>
  );
}
