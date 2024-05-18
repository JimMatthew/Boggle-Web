/**
 * DiceHandler module to manage the rolling and retrieving of dice.
 */
function diceHandler() {
  // Dice configuration with each die represented by a string of letters.
  const dice = [
      "aaeegn", "elrtty", "abbjoo", "abbkoo", "ehrtvw", "cimotu", "distty",
      "eiosst", "achops", "himnqu", "eeinsu", "eeghnnw", "affkps", "hlnnrz",
      "deilrx", "delrvy"
  ];

  /**
   * Rolls a single die and returns a random letter from it.
   * @param {string} die - The die to roll.
   * @returns {string} A random letter from the die.
   */
  const rollDie = (die) => {
      const randomIndex = Math.floor(Math.random() * die.length);
      return die[randomIndex];
  };

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param {Array} array - The array to shuffle.
   * @returns {Array} The shuffled array.
   */
  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  /**
   * Generates a random letter arrangement from all dice.
   * @returns {string[]} An array of randomly selected letters from the dice.
   */
  const getRandomDiceRoll = () => {
      const letters = dice.map(die => rollDie(die));
      return shuffleArray(letters);
  };

  let rolledDice = getRandomDiceRoll();

  /**
   * Gets the current rolled dice.
   * @returns {string[]} The current array of rolled dice letters.
   */
  const getDice = () => {
      return rolledDice;
  };

  /**
   * Rolls the dice and updates the current rolled dice.
   * @returns {string[]} The new array of rolled dice letters.
   */
  const rollDice = () => {
      rolledDice = getRandomDiceRoll();
      return rolledDice;
  };

  return { getDice, rollDice };
}

export { diceHandler };