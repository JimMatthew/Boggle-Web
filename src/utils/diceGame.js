import { diceHandler } from "../diceHandler"
import { dictionary } from "../dictionary";
import { scoreCard } from "../scoreCard";
import { solver } from "../Solver";
import { statTracker } from "../statTracker";
import { hsBoardMaker } from "./hsBoardMaker";

class DiceGame {
    constructor() {
        this.dice = diceHandler();
        this.dict = dictionary();
        this.scorecard = scoreCard();
        this.solvr = solver(this.dict.getDict());
        this.TIME = 90;
        this.timeLeft = this.TIME;
        this.intervalId = null;
        this.onTickCallback = null;
        this.statusCallback = null;
        this.wordsOnBoard = [];
        this.numWordsOnBoard = 0;
        this.checkboxState = false;
        this.board = []
        this.hsMaker = hsBoardMaker(this.solvr)
    }

    newGame() {
        if (this.checkboxState) {
            this.board = this.hsMaker.getHSBoard()
            this.wordsOnBoard = this.solvr.solveBoard(this.board);
        } else {
            this.board = this.dice.rollDice();
            this.wordsOnBoard = this.solvr.solveBoard(this.dice.getDice());
        }
        this.scorecard.reset();
        this.resetTimer();
        this.startTimer();
        this.updateStatus("");
        this.numWordsOnBoard = this.wordsOnBoard.length;
    }

    isGameOver() {
        return this.timeLeft <= 0;
    }

    getNumGamesPlayed() {
        return statTracker.getGamesPlayed();
    }

    getLongestWordFound() {
        return statTracker.getLongestWord();
    }

    getNumWordsFound() {
        return statTracker.getNumWords();
    }

    getHighScore() {
        return statTracker.getHighScore();
    }

    getDice() {
        return this.board
    }

    getNumWordsOnBoard() {
        return this.numWordsOnBoard;
    }

    getWordsOnboard() {
        return this.wordsOnBoard;
    }

    wordsFound() {
        return this.scorecard.getWords();
    }

    numWordsFound() {
        return this.scorecard.getNumWords();
    }

    score() {
        return this.scorecard.getScore();
    }

   isHs() {
        return this.hs;
    }

    submitWord(word) {
        if (this.isGameOver()) return false;

        if (this.scorecard.isWordFound(word)) {
            this.updateStatus(`${word.toUpperCase()} was already found!`);
            return false;
        }

        if (!this.dict.wordExists(word)) {
            this.updateStatus(`${word.toUpperCase()} is not a word!`);
            return false;
        }

        this.scorecard.addWord(word);
        statTracker.addWord(word);
        this.updateStatus(`${word.toUpperCase()} was found!`);
        return true;
    }

    updateStatus(status) {
        if (this.statusCallback) this.statusCallback(status);
    }

    startTimer() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.timeLeft -= 1;
                if (this.onTickCallback) this.onTickCallback(this.timeLeft);
                if (this.timeLeft <= 0) {
                    statTracker.addGame(this.score());
                    this.stopTimer();
                    this.updateStatus("Game Over!");
                }
            }, 1000);
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resetTimer() {
        this.timeLeft = this.TIME;
        if (this.onTickCallback) this.onTickCallback(this.timeLeft);
    }

    setCheckBoxState(state) {
        this.checkboxState = state
    }

    setCheckboxState() {
        this.checkboxState = !this.checkboxState
    }

    onTick(callback) {
        this.onTickCallback = callback;
    }

    onStatus(callback) {
        this.statusCallback = callback;
    }
}

export { DiceGame };