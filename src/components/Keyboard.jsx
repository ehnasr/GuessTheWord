import { clsx } from "clsx";

export default function Keyboard({
  currentWord,
  guessedLetters,
  onGuess,
  countries,
}) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;
  const isGameLost = wrongGuessCount >= countries.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameOver = isGameWon || isGameLost;

  return (
    <section className="keyboard">
      {alphabet.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);

        return (
          <button
            key={letter}
            className={clsx({
              correct: isCorrect,
              wrong: isWrong,
            })}
            disabled={isGameOver || isGuessed}
            aria-label={`Letter ${letter}`}
            onClick={() => onGuess(letter)}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </section>
  );
}
