import { diceHandler } from "../diceHandler";

function hsBoardMaker(solver){

    const HS = 120
    const dh = diceHandler()
   
    function getHSBoard() {
        let board = []
        do {
            board = dh.rollDice()
        } while(solver.solveBoard(board).length < HS)
        return board
    }
    return { getHSBoard }
}

export {hsBoardMaker}