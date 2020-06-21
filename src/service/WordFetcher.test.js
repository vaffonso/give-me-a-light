import WordFetcher from "./WordFetcher";

describe("Word fetcher test", () => {
  let fetcher;
  beforeEach(() => {
    fetcher = WordFetcher;
  });

  it("should provide a string not empty", () => {
    const word = fetcher.getRandom();
    expect(typeof word).toBe("string");
    expect(word.length).toBeGreaterThan(0);
  });
});
