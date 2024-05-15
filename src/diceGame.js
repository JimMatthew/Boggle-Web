import { diceHandler} from "./diceHandler"
import { dictionary } from "./dictionary"
import { scoreCard } from "./scoreCard"

function diceGame() {

    const dice = diceHandler()
    const dict = dictionary()
    const scorecard = scoreCard()

    function newGame() {
        dice.rollDice()
        scorecard.reset()
    }

    function getDice() {
        return dice.getDice()
    }


    function submitWord(word) {
        if (dict.wordsExists(word)) {
            scorecard.addWord(word)
            return true
        } else {
            return false
        }
    }

    function wordsFound() {
        return scorecard.getWords()
    }

    function numWordsFound() {
        return scorecard.getNumWords()
    }

    return { newGame, getDice, submitWord, wordsFound, numWordsFound}

}
export { diceGame }