export const STATUS = Object.freeze({
  STARTED: 'started',
  GAME_OVER: 'gameover',
  INITIAL: 'initial',
  COMPLETE: 'complete',
});

export const LEVELS = Object.freeze({ EASY: 500, MEDIUM: 300, HARD: 200 });

export const initialGameState = {
  status: STATUS.INITIAL,
  level: '',
  enteredWords: [],
  word: null,
  maxGuesses: 5,
};
