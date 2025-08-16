import { clsx } from "clsx";

export default function Countries({ currentWord, guessedLetters, countries }) {
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  return (
    <section className="countries-chips">
      {countries.map((country, index) => {
        const isLost = index < wrongGuessCount;
        return (
          <span
            key={country.name}
            className={clsx("chip", isLost && "lost")}
            style={{
              backgroundColor: country.backgroundColor,
              color: country.color,
            }}
          >
            {country.name}
          </span>
        );
      })}
    </section>
  );
}
