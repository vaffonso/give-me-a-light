import React from "react";
import "./styles.css";

import WordFetcher from "./service/WordFetcher";
import CharChain from "./components/CharChain/CharChain";

export default function App() {
  const randomWord = WordFetcher.getRandom();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>-{randomWord}-</h3>
      <CharChain word={randomWord}></CharChain>
    </div>
  );
}
