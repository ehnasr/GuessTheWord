export default function NewGame({
  currentWord,
  guessedLetters,
  onNewGame,
  countries,
}) {
  const wrongGuessCount = guessedLetters.filter(
    (l) => !currentWord.includes(l)
  ).length;
  const isGameLost = wrongGuessCount >= countries.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((l) => guessedLetters.includes(l));
  const isGameOver = isGameWon || isGameLost;

  if (!isGameOver) return null;

  return (
    <button className="new-game" onClick={onNewGame}>
      New Game
    </button>
  );
}
