
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
        let wf = []
        let board = []
        do {
            board = dh.rollDice()
            wf = solver.solveBoard(board)
        } while(wf.length < HS)
        return board
    }
    return { getHSBoard }
}

export {hsBoardMaker}