import { useEffect } from 'react'
import { useGameContext } from '../context/GameProvider'

export const useTimer = () => {
    const { state, dispatch } = useGameContext()

    useEffect(() => {
        state.game.onTick((time) => dispatch({ type: 'SET_TIME_LEFT', payload: time }))
        state.game.onStatus((status) => dispatch({ type: 'SET_STATUS', payload: status }))
        state.game.newGame()

        return () => state.game.stopTimer()
    }, [state.game, dispatch])
}