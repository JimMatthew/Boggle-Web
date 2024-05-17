
function diceHandler() {

    const dice = [
        "aaeegn", "elrtty", "abbjoo", "abbkoo", "ehrtvw", "cimotu", "distty",
        "eiosst", "achops", "himnqu", "eeinsu", "eeghnnw", "affkps", "hlnnrz",
        "deilrx", "delrvy"
      ];

      const rollDie = (die) => {
        const randomIndex = Math.floor(Math.random() * die.length);
        return die[randomIndex];
      }

      // Function to shuffle an array using Fisher-Yates algorithm
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Function to generate a random letter arrangement from all dice
      const getRandomDiceRoll = () => {
        const letters = dice.map(die => rollDie(die));
        return shuffleArray(letters);
      }

      let rolledDice = getRandomDiceRoll()

      const getDice = () => {
        return rolledDice
      }

      const rollDice = () => {
        rolledDice = getRandomDiceRoll()
        return rolledDice
      }

      return { getDice, rollDice }
}

export { diceHandler }