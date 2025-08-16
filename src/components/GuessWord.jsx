import { clsx } from "clsx";

export default function GuessWord({ currentWord, guessedLetters }) {
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;
  const isGameLost = wrongGuessCount >= 9; // 10 countries → 9 wrong allowed

  return (
    <section className="word">
      {currentWord.split("").map((letter, index) => {
        const revealed = isGameLost || guessedLetters.includes(letter);
        return (
          <span
            key={index}
            className={clsx(
              isGameLost && !guessedLetters.includes(letter) && "missed-letter"
            )}
          >
            {revealed ? letter.toUpperCase() : ""}
          </span>
        );
      })}
    </section>
  );
}
