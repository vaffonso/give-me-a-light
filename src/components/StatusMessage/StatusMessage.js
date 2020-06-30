import React from 'react';
import { STATUS } from '../../utils/Game';

const StatusMessage = ({ status, word }) => {
  if (status === STATUS.COMPLETE) {
    return <div>CONGRATULATIONS</div>;
  }
  if (status === STATUS.GAME_OVER) {
    return (
      <div>
        <span role="img" aria-label="Sad face">
          😔
        </span>
        The word was {word}. Play it again.
      </div>
    );
  }
  return null;
};

export default StatusMessage;
