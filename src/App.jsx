import { useState } from "react";
import Confetti from "react-confetti";
import { countries } from "./countries.js";
import { getRandomWord, getRandomCountries } from "./utils.js";

import Header from "../src/components/Header.jsx";
import Countries from "../src/components/Countries.jsx";
import GuessWord from "./components/GuessWord.jsx";
import Keyboard from "./components/Keyboard.jsx";
import NewGame from "./components/NewGame.jsx";
import GameStatus from "./components/GameStatus.jsx";

export default function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [activeCountries, setActiveCountries] = useState(() =>
    getRandomCountries(countries, 9)
  );

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setActiveCountries(getRandomCountries(countries, 9));
  }

  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}

      <Header />

      <GameStatus
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        countries={activeCountries}
      />

      <Countries
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        countries={activeCountries}
      />

      <GuessWord currentWord={currentWord} guessedLetters={guessedLetters} />

      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        onGuess={addGuessedLetter}
        countries={activeCountries}
      />

      <NewGame
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        onNewGame={startNewGame}
        countries={activeCountries}
      />
    </main>
  );
}
