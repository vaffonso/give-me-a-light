import React, { useState } from 'react';
import { STATUS } from '../../utils/Game';
import WordFetcher from '../../service/WordFetcher';

import styles from './StatusMessage.module.scss';
import { useEffect } from 'react';

const StatusMessage = ({ status, word }) => {
  let content;
  const [wordDetail, setWordDetail] = useState(null);

  const getDetails = async (word) => {
    word = Array.isArray(word) ? word.join('') : word;
    const details = await WordFetcher.getDetails(word);
    setWordDetail(details);
  };

  useEffect(() => {
    if (word) {
      getDetails(word);
    }
  }, [word]);

  if (status === STATUS.COMPLETE) {
    content = (
      <React.Fragment>
        <span role="img" aria-label="Congratulations">
          🎉CONGRATULATIONS! 🥳
        </span>
        <p>
          <b>{word}</b> is a <em>{wordDetail && wordDetail.type}</em>
        </p>
        <p>{wordDetail && wordDetail.definition}</p>
      </React.Fragment>
    );
  }
  if (status === STATUS.GAME_OVER) {
    content = (
      <>
        <span role="img" aria-label="Sad face">
          😔
        </span>
        The word was {word}. Play it again.
      </>
    );
  }

  return content ? <div className={styles.StatusMessage}>{content}</div> : null;
};

export default StatusMessage;
