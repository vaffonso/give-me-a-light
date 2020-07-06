import wordArchive from '../asset/wordArchive';

class WordFetcher {
  constructor(wordList) {
    this.keys = Object.keys(wordList);
    this.wordList = wordList;
  }

  get size() {
    return this.keys.length;
  }

  /**
   * Get random number based on keys
   * @function getRandomIndex
   * @returns {integer}
   */
  getRandomIndex() {
    const index = Math.floor(Math.random() * this.size);
    return index;
  }

  /**
   * Get random word
   * @function getRandom
   * @returns {string}
   */
  getRandom() {
    const index = this.getRandomIndex();
    const word = this.keys[index];
    return word;
  }

  /**
   * Provide details about word
   * @function getDetails
   * @param {string} word
   * @returns {object | null}
   */
  getDetails(word) {
    console.log(`word requested: ${word}`);
    const wordDetail = this.wordList[word];
    console.log(wordDetail);

    return wordDetail;
  }
}

export default new WordFetcher(wordArchive);
