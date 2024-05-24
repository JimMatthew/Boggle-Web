
import { diceHandler } from "../diceHandler";
/**
 * Makes high scoring Boggle Boards
 */
function hsBoardMaker(solver){

    const HS = 120
    const dh = diceHandler()
    /**
     * @returns a single high score Boggle Board
     */
    function getHSBoard() {
        let board = []
        do {
            board = dh.rollDice()
        } while(solver.solveBoard(board) < HS)
        return board
    }
    return { getHSBoard }
}

export {hsBoardMaker}