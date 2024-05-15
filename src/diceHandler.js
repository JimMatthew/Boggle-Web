
function diceHandler() {

    const dice = [
        "aaeegn", "elrtty", "abbjoo", "abbkoo", "ehrtvw", "cimotu", "distty",
        "eiosst", "achops", "himnqu", "eeinsu", "eeghnnw", "affkps", "hlnnrz",
        "deilrx", "delrvy"
      ];

      let rolledDice = getRandomDiceRoll()
      let pressed = []

      function getDice() {
        return rolledDice
      }

      function rollDice() {
        rolledDice = getRandomDiceRoll()
        return rolledDice
      }

      function isNextTo(die) {
        if (pressed.length === 0) {
          return true
        }
        const last = pressed[pressed.length-1]
        const Xbtt = Math.floor(die / SIZE);
        const Ybtt = die % SIZE;
        const Xblp = Math.floor(last / SIZE);
        const Yblp = last % SIZE;

        if (Xblp === -1) {
          return true;
        }

        return (
          (Xbtt === Xblp && Math.abs(Ybtt - Yblp) === 1) ||
          (Ybtt === Yblp && Math.abs(Xbtt - Xblp) === 1) ||
          (Math.abs(Xbtt - Xblp) === 1 && Math.abs(Ybtt - Yblp) === 1)
        );
      }

      function rollDie(die) {
        const randomIndex = Math.floor(Math.random() * die.length);
        return die[randomIndex];
      }
      
      // Function to generate a random letter arrangement from all dice
      function getRandomDiceRoll() {
        const letters = dice.map(die => rollDie(die));
        return shuffleArray(letters);
      }
      
      // Function to shuffle an array using Fisher-Yates algorithm
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      return { getDice, rollDice }
}

export { diceHandler }



