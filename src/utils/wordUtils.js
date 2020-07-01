const castCase = (char) => {
  try {
    return char.toUpperCase();
  } catch (e) {
    return null;
  }
};

/**
 * Confirms match of chars to be displayed with word chars
 * @function
 * @param {*} availableChars - Array of chars to be displayed
 * @param {*} wordChars - Array of chars in the word
 * @returns {boolean}
 */
export const checkMatchingChars = (availableChars, wordChars) => {
  if (!Array.isArray(availableChars) || !Array.isArray(wordChars)) {
    return false;
  }
  for (let char of wordChars) {
    if (!availableChars.includes(char)) {
      return false;
    }
  }
  return true;
};

export const sameWord = (wordA, wordB) => {
  // Convert entries as arrays
  wordA = wordA instanceof Array ? wordA : Array.from(wordA);
  wordB = wordB instanceof Array ? wordB : Array.from(wordB);

  if (wordA.length !== wordB.length) {
    return false;
  }

  // Cast to same case
  for (let i = 0; i < wordA.length; i += 1) {
    const charA = castCase(wordA[i]);
    const charB = castCase(wordB[i]);

    // console.log(`charA(${charA}) and charB(${charB})`);

    if (charA !== charB) {
      return false;
    }
  }
  return true;
};
