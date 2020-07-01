import React, { useState, useEffect, useReducer } from 'react';
// import 'normalize.css';
import './styles.scss';

import WordFetcher from './service/WordFetcher';
import CharChain from './components/CharChain/CharChain';
import Lights from './components/Lights/Lights';
import Controller from './components/Controller/Controller';
import WordsRegistered from './components/WordsRegistered/WordsRegistered';

import { STATUS, initialGameState } from './utils/Game';
import StatusMessage from './components/StatusMessage/StatusMessage';
import * as gameActions from './reducers/gameActions';
import gameReducer from './reducers/game';
import { useCallback } from 'react';

// const initialGameLevel = LEVELS.MEDIUM;

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
  const [game, dispatch] = useReducer(gameReducer, initialGameState);
  const [lights, setLights] = useState({
    changeSpeed: game.level,
    state: false,
  });

  const startHandler = async () => {
    const newWord = await getWord();
    console.log(`new word is ${newWord}`);
    dispatch({ type: gameActions.START, payload: newWord });
  };

  const levelHandler = (level) => {
    dispatch({ type: gameActions.LEVEL_UPDATE, payload: Number(level) });
  };

  const wordEnteredHandler = (wordEntered) => {
    dispatch({ type: gameActions.NEW_GUESS, payload: wordEntered });
  };

  const logLightsChanges = useCallback(() => {
    console.log(`
    Lights state changed
    Lights: ${JSON.stringify(lights)} 
    `);
  }, [lights]);

  const logGameChanges = useCallback(() => {
    console.log(`
    Games state changed
    Game: ${JSON.stringify(game)}
  `);
  }, [game]);

  useEffect(() => {
    logLightsChanges();
  }, [lights, logLightsChanges]);

  useEffect(() => {
    logGameChanges();

    const newLightSpeed = game.level + 25 * game.enteredWords.length;
    setLights({
      changeSpeed: newLightSpeed,
      state: game.status === STATUS.STARTED,
    });
  }, [game, logGameChanges]);

  const lightsContent = game.word ? (
    <Lights
      wordArray={game.word}
      availableChars={alphaChars}
      start={game.status === STATUS.STARTED && lights.state}
      onComplete={() =>
        setLights((prevState) => ({ ...prevState, state: false }))
      }
      changeSpeed={lights.changeSpeed}
    />
  ) : null;

  const inputContent = game.word ? (
    <React.Fragment>
      <CharChain
        wordArray={game.word}
        onEntered={(word) => wordEnteredHandler(word)}
        enableInput={game.status === STATUS.STARTED && !lights.state}
      />
      <WordsRegistered words={game.enteredWords} secretWord={game.word} />
    </React.Fragment>
  ) : null;
  return (
    <div className="App">
      <h1>Give me a light!</h1>
      <h3>Guess the word based on sequence the letters light up.</h3>

      <Controller
        started={game.status === STATUS.STARTED}
        selectedLevel={game.level}
        word={game.word}
        onStart={() => startHandler()}
        onLevelChange={(level) => levelHandler(level)}
      />

      <StatusMessage status={game.status} word={game.word} />

      {lightsContent}
      {inputContent}
    </div>
  );
}
