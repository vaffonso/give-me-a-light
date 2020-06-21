import wordArchive from '../asset/wordArchive';

class WordFetcher {
  constructor(wordList) {
    this.keys = Object.keys(wordList);
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
    return Math.floor(Math.random() * (this.size - 1));
  }

  /**
   * Get random word
   * @function getRandom
   * @returns {string}
   */
  getRandom() {
    const index = this.getRandomIndex();
    return this.keys[index];
  }
}

export default new WordFetcher(wordArchive);
