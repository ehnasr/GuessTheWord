import { clsx } from "clsx";
import { languages } from "../languages.js";

export default function Languages({ currentWord, guessedLetters }) {
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;

  return (
    <section className="language-chips">
      {languages.map((lang, index) => {
        const isLost = index < wrongGuessCount;
        return (
          <span
            key={lang.name}
            className={clsx("chip", isLost && "lost")}
            style={{
              backgroundColor: lang.backgroundColor,
              color: lang.color,
            }}
          >
            {lang.name}
          </span>
        );
      })}
    </section>
  );
}
