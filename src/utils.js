import { words } from "./words";

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function getFarewellText(country) {
  const options = [
    `${country} is no longer safe to travel to.`,
    `You can’t go to ${country} anymore.`,
    `${country} is now closed off.`,
    `${country} is no longer an option.`,
    `The path to ${country} is blocked.`,
    `${country} is out of reach now.`,
    `You have lost access to ${country}.`,
    `Travel to ${country} is no longer possible.`,
    `${country} is off-limits now.`,
    `${country} can’t shelter you anymore.`,
    `${country} is no longer available.`,
    `${country} has closed its doors to you.`,
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

export function getRandomCountries(countriesArray, count = 9) {
  const home = countriesArray.find((c) => c.name === "Home");
  const others = countriesArray.filter((c) => c.name !== "Home");

  const shuffled = [...others].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // Always put home last
  return [...selected, home];
}
