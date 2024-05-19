import { diceHandler} from "./diceHandler"
import { dictionary } from "./dictionary"
import { scoreCard } from "./scoreCard"
import { solver } from "./Solver"
import { statTracker } from "./statTracker"

function diceGame() {
    
    const dice = diceHandler()
    const dict = dictionary()
    const scorecard = scoreCard()
    const solvr = solver(dict.getDict())
    const TIME = 60
    let timeLeft = TIME;
    let intervalId = null
    let onTickCallback = null   
    let statusCallback = null
    let wordsOnBoard =[]
    let numWordsOnBoard = 0

    const newGame = () => {
        dice.rollDice()
        scorecard.reset()
        resetTimer()
        startTimer()
        sendCallback("")
        wordsOnBoard = solvr.solveBoard(dice.getDice())
        numWordsOnBoard = wordsOnBoard.length
    }

    const isGameOver = () => timeLeft <=0
    const getNumGamesPlayed = () => statTracker.getGamesPlayed()
    const getLongestWordFound = () => statTracker.getLongestWord()
    const getNumWordsFound = () => statTracker.getNumWords()
    const getHighScore = () => statTracker.getHighScore()
    const getDice = () => dice.getDice()
    const getNumWordsOnBoard = () => numWordsOnBoard
    const getWordsOnboard = () => wordsOnBoard
    const wordsFound = () => scorecard.getWords()
    const numWordsFound = () => scorecard.getNumWords()
    const score = () => scorecard.getScore()
    
    const submitWord = (word) => {
        if (isGameOver()) return false
        
        if (scorecard.isWordFound(word)) {
            sendCallback(word.toUpperCase() +" was already found!")
            return false
        }
        if (!dict.wordExists(word)) {
            sendCallback(word.toUpperCase() + " is not a word!")
            return false
        }
        scorecard.addWord(word)
        statTracker.addWord(word)
        sendCallback(word.toUpperCase() + " was found!")
        return true
    }

    const sendCallback = (status) => {
        if (statusCallback) statusCallback(status)
    }

    const startTimer = () => {
        if (intervalId === null) {
          intervalId = setInterval(() => {
            timeLeft -= 1;
            if (onTickCallback) onTickCallback(timeLeft)
            if (timeLeft <= 0) {
                statTracker.addGame(score())
                stopTimer();
                if (statusCallback) statusCallback("Game Over!")
            }
          }, 1000);
        }
    }
    
    const stopTimer = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
    }
    
    const resetTimer = () => {
        timeLeft = TIME;
        if (onTickCallback) onTickCallback(timeLeft);
    }
    
    const onTick = (callback) => {  
        onTickCallback = callback;  
    }

    const onStatus = (callback) => {  
        statusCallback = callback
    }
    
    return { 
        newGame, 
        getDice, 
        submitWord, 
        wordsFound, 
        numWordsFound, 
        score, 
        isGameOver, 
        onTick, 
        onStatus, 
        getNumWordsOnBoard, 
        getWordsOnboard, 
        getLongestWordFound, 
        getNumGamesPlayed, 
        getNumWordsFound, 
        getHighScore 
    }
}
export { diceGame }