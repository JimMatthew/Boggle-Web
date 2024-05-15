import { diceHandler} from "./diceHandler"
import { dictionary } from "./dictionary"
import { scoreCard } from "./scoreCard"

function diceGame() {
    
    const dice = diceHandler()
    const dict = dictionary()
    const scorecard = scoreCard()
    let timeLeft = 90;
    let intervalId = null;
    let onTickCallback = null;

    function setOnTick(onTick) {
        onTickCallback = onTick       
    }

    function isGameOver() {
        return (timeLeft <= 0)
    }

    function newGame() {
        dice.rollDice()
        scorecard.reset()
        resetTimer()
        startTimer()
    }

    function getDice() {
        return dice.getDice()
    }

    function submitWord(word) {
        if (!isGameOver()){
            if (!scorecard.isWordFound(word)){
                if (dict.wordsExists(word)) {
                    scorecard.addWord(word)
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
        
    }

    function wordsFound() {
        return scorecard.getWords()
    }

    function numWordsFound() {
        return scorecard.getNumWords()
    }

    function score() {
        return scorecard.getScore()
    }

    const startTimer = () => {
        if (intervalId === null) {
          intervalId = setInterval(() => {
            timeLeft -= 1;
            if (onTickCallback) {
              onTickCallback(timeLeft);
            }
    
            if (timeLeft <= 0) {
              stopTimer();
            }
          }, 1000);
        }
      };
    
      const stopTimer = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
    
      const resetTimer = () => {
        timeLeft = 90;
        if (onTickCallback) {
          onTickCallback(timeLeft);
        }
      };
    
      const onTick = (callback) => {
        onTickCallback = callback;
      };
    

    return { newGame, getDice, submitWord, wordsFound, numWordsFound, score, isGameOver, onTick }

}
export { diceGame }