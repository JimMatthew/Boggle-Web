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

    const isGameOver = () => {
        return (timeLeft <= 0)
    }

    const newGame = () => {
        dice.rollDice()
        scorecard.reset()
        resetTimer()
        startTimer()
    }

    const getDice = () => {
        return dice.getDice()
    }

    const submitWord = (word) => {
        if (isGameOver()) {
            return false
        }
        if (scorecard.isWordFound(word)) {
            sendCallback(word+" was already found!")
            return false
        }
        if (!dict.wordsExists(word)) {
            sendCallback(word+ " is not a word!")
            return false
        }
        scorecard.addWord(word)
        sendCallback(word + " was found!")
        return true
    }

    const sendCallback = (status) => {
        if (statusCallback) {
            statusCallback(status)
        }
    }

    const wordsFound = () => {
        return scorecard.getWords()
    }

    const numWordsFound = () => {
        return scorecard.getNumWords()
    }

    const score = () => {
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
    
    const onTick = (callback) => {  //callback to be called every tick (second) while the timer is 
        onTickCallback = callback;  //running. It passes the current time left every tick
    };

    const onStatus = (callback) => {  //if set, will call with status updates during gameplay
        statusCallback = callback
    }
    
    return { newGame, getDice, submitWord, wordsFound, numWordsFound, score, isGameOver, onTick, onStatus }
}
export { diceGame }