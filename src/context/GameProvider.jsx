/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer, useEffect,} from "react";
import { DiceGame } from "../utils/diceGame";

const GameContext = createContext()

const initialState = {
    pressed: Array(16).fill(false),
    currWord: "",
    timeLeft: 60,
    status: "",
    checkbox: false,
    game: new DiceGame(),
}

function gameReducer(state, action) {
    switch(action.type) {
        case 'SET_PRESSED':
            return { ...state, pressed: action.payload }
        case 'SET_CURR_WORD':
            return { ...state, currWord: action.payload }
        case 'SET_TIME_LEFT':
            return { ...state, timeLeft: action.payload }
        case 'SET_STATUS':
            return { ...state, status: action.payload }
        case 'SET_CHECKBOX':
            state.game.setCheckBoxState(action.payload)
            return { ...state, checkbox: action.payload }    
        case 'NEW_GAME':
            state.game.newGame()
            return { ...state, pressed: Array(16).fill(false), currWord: "", timeLeft: 60, status: "" }
        default:
            return state    
    }
}

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState)

    useEffect(() => {
        state.game.onTick((time) => dispatch({ type: 'SET_TIME_LEFT', payload: time }))
        state.game.onStatus((status) => dispatch({ type: 'SET_STATUS', payload: status }))
    }, [state.game])

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext)