import { STATUS } from '../utils/Game';
import * as gameActions from './gameActions';
import { sameWord } from '../utils/wordUtils';

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case gameActions.NEW_GUESS: {
      const wordEntered = action.payload;
      const newEnteredWords = [...state.enteredWords, wordEntered];
      if (sameWord(wordEntered, state.word)) {
        return {
          ...state,
          status: STATUS.COMPLETE,
          enteredWords: newEnteredWords,
        };
      } else if (newEnteredWords.length >= state.maxGuesses) {
        return {
          ...state,
          status: STATUS.GAME_OVER,
          enteredWords: newEnteredWords,
        };
      } else {
        return {
          ...state,
          enteredWords: newEnteredWords,
        };
      }
    }
    case gameActions.START:
      const { payload: word } = action;
      return {
        ...state,
        enteredWords: [],
        status: STATUS.STARTED,
        word: word,
      };
    case gameActions.LEVEL_UPDATE:
      const { payload: level } = action;
      const newState = {
        ...state,
        level: level,
      };
      return newState;
    default:
      return state;
  }
};

export default reducer;
