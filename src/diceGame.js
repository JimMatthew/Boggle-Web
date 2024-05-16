import { diceHandler} from "./diceHandler"
import { dictionary } from "./dictionary"
import { scoreCard } from "./scoreCard"

function diceGame() {
    
    const dice = diceHandler()
    const dict = dictionary()
    const scorecard = scoreCard()
    let timeLeft = 90;
    let intervalId = null
    let onTickCallback = null
    let statusCallback = null

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
                    if (statusCallback) {
                        statusCallback(word + " was found!")
                    }
                    return true
                } else if (statusCallback) {
                    statusCallback(word+ " is not a word!")
                    return false
                }
            } else if (statusCallback) {
                statusCallback(word+" was already found!")
                return false
            }
        }
        return false
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
              if (statusCallback) {
                statusCallback("Game Over!")
              }
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

    const onStatus = (callback) => {
        statusCallback = callback
    }
    
    return { newGame, getDice, submitWord, wordsFound, numWordsFound, score, isGameOver, onTick, onStatus }
}
export { diceGame }