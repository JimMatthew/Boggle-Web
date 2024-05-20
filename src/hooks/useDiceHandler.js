import { useGameContext } from '../context/GameProvider'
import { dicePressedHandler } from '../utils/dicePressedHandler'

const dph = dicePressedHandler()

const useDiceHandler = () => {
  const { state, dispatch } = useGameContext()
  const { currWord, game } = state

  const handleDieClick = (index) => {
    if (game.isGameOver()) return

    if (dph.isPressed(index) !== -1) {
      if (dph.isPressed(index) >= 2 && dph.isLastPressed(index)) {
        handleSubmit()
        return
      }

      const ix = dph.isPressed(index) + 1
      if (ix === 1 && dph.isLastPressed(index)) {
        dispatch({ type: 'SET_CURR_WORD', payload: '' })
        dph.clear()
        dispatch({ type: 'SET_PRESSED', payload: dph.getPressed() })
        return
      }
      const newCurrWord = currWord.slice(0, ix)
      dph.slicePressed(ix)
      dispatch({ type: 'SET_CURR_WORD', payload: newCurrWord })
      dispatch({ type: 'SET_PRESSED', payload: dph.getPressed() })
      return
    } else if (dph.isNextTo(index)) {
      dph.press(index)
      const newCurrWord = currWord + game.getDice()[index]
      dispatch({ type: 'SET_CURR_WORD', payload: newCurrWord })
      dispatch({ type: 'SET_PRESSED', payload: dph.getPressed() })
    }
  }

  const handleSubmit = () => {
    game.submitWord(currWord)
    dispatch({ type: 'SET_CURR_WORD', payload: '' })
    dph.clear()
    dispatch({ type: 'SET_PRESSED', payload: dph.getPressed() })
  }

  return { handleDieClick, handleSubmit }
}

export default useDiceHandler