import React from 'react';

const WordsRegistered = ({ words }) => {
  const items = words.map((word, index) => <li key={index}>{word}</li>);

  return (
    <React.Fragment>
      <h5>Words entered</h5>
      <ol>{items}</ol>
    </React.Fragment>
  );
};

export default WordsRegistered;
