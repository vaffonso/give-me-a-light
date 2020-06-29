import { sameWord } from './wordUtils';

describe('sameWord tests', () => {
  const wordA = 'viaduct';
  it('should return false if missing char', () => {
    expect(sameWord(wordA, 'viaduc')).toBe(false);
  });

  it('should be case insensitive', () => {
    expect(sameWord(wordA, 'ViAdUcT')).toBe(true);
  });

  it('should receive array as parameter', () => {
    const wordB = ['v', 'i', 'A', 'd', 'U', 'c', 'T'];
    expect(sameWord(wordA, wordB)).toBe(true);
  });

  it('should return false char compared to null', () => {
    const wordB = Array(wordA.length).fill();
    expect(sameWord(wordA, wordB)).toBe(false);
  });
});
