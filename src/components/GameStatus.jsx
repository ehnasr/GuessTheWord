import { clsx } from "clsx";
import { getFarewellText } from "../utils.js";

export default function GameStatus({ currentWord, guessedLetters, countries }) {
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameLost = wrongGuessCount >= countries.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  const isLastGuessCorrect =
    lastGuessedLetter && currentWord.includes(lastGuessedLetter);

  const className = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
    correct: !isGameOver && isLastGuessCorrect,
    initial: guessedLetters.length === 0 && !isGameOver,
  });

  let message = null;

  if (guessedLetters.length === 0 && !isGameOver) {
    message = (
      <p className="initial-message">
        Game started! Guess the word by selecting letters.
      </p>
    );
  } else if (!isGameOver && isLastGuessIncorrect) {
    const country = countries[wrongGuessCount - 1];

    // style the country name
    const styledCountry = (
      <span
        style={{
          backgroundColor: country.backgroundColor,
          color: country.color,
          padding: "0 4px",
          borderRadius: "3px",
        }}
      >
        {country.name}
      </span>
    );

    const rawMessage = getFarewellText(country.name);
    const parts = rawMessage.split(country.name);

    message = (
      <p className="farewell-message">
        {parts[0]}
        {styledCountry}
        {parts[1]}
      </p>
    );
  } else if (!isGameOver && isLastGuessCorrect) {
    message = (
      <p className="correct-message">
        Correct! The letter <strong>{lastGuessedLetter.toUpperCase()}</strong>{" "}
        is in the word.
      </p>
    );
  } else if (isGameWon) {
    const nextSafeCountry = countries[wrongGuessCount];

    message = (
      <>
        <h2>You win!</h2>
        {nextSafeCountry ? (
          <p>
            Congratulations! You made it safely to{" "}
            <span
              style={{
                backgroundColor: nextSafeCountry.backgroundColor,
                color: nextSafeCountry.color,
                padding: "0 4px",
                borderRadius: "3px",
              }}
            >
              {nextSafeCountry.name}
            </span>
            !
          </p>
        ) : (
          <p>Well done!</p> // fallback , just in case
        )}
      </>
    );
  } else if (isGameLost) {
    message = (
      <>
        <h2>Game over!</h2>
        <p>You lose! Time to go home and brush up on your knowledge.</p>
      </>
    );
  }

  return (
    <section aria-live="polite" role="status" className={className}>
      {message}
    </section>
  );
}
