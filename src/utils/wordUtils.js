const castCase = (char) => {
  try {
    return char.toUpperCase();
  } catch (e) {
    return null;
  }
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
