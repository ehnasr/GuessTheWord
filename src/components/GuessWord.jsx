import { clsx } from "clsx";
import { useState, useEffect } from "react";

export default function GuessWord({ currentWord, guessedLetters }) {
  const [isNewGame, setIsNewGame] = useState(true);
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;
  const isGameLost = wrongGuessCount >= 9; // 10 countries → 9 wrong allowed

  // Reset new game state when word changes
  useEffect(() => {
    setIsNewGame(true);
    const timer = setTimeout(() => setIsNewGame(false), 1000);
    return () => clearTimeout(timer);
  }, [currentWord]);

  return (
    <section className="word">
      {currentWord.split("").map((letter, index) => {
        const revealed = isGameLost || guessedLetters.includes(letter);
        const isCorrect = guessedLetters.includes(letter);
        const isMissed = isGameLost && !guessedLetters.includes(letter);

        return (
          <span
            key={index}
            className={clsx(
              "letter",
              isCorrect && "correct",
              isMissed && "missed-letter",
              revealed && "revealed",
              isNewGame && "new-game"
            )}
            style={{
              "--index": index,
              "--animation-delay": `${index * 0.1}s`,
            }}
            data-letter={letter}
          >
            {revealed ? letter.toUpperCase() : ""}
          </span>
        );
      })}
    </section>
  );
}
