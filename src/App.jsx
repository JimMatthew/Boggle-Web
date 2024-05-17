/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box, Button, Text, Container, } from '@chakra-ui/react'
import { diceGame } from './diceGame'
import { dicePressedHandler } from './dicePressedHandler'
import GameGrid from './components/GameGrid'

let game = diceGame()
let dph = dicePressedHandler()

function App() {
 
  // state of which dice are currently 'pressed' and the current word
  // since the game doesn't care about what dice we are selecting until we actually submit a 
  // word, we will keep track of the state here until it is submitted to the game object
  
  const [pressed, setPressed] = useState( Array.from({ length: 16 }, () => false))
  const [currWord, setCurrWord] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [status, setStatus] = useState("")

  useEffect(() => {
    game.onTick(setTimeLeft) // set the callback for the timer
    game.onStatus(setStatus)
    game.newGame()
  }, [])

  const handleDieClick = (index) => {
    if (!game.isGameOver()){
      if (dph.isPressed(index) !== -1) { //die is already pressed
        if (dph.isPressed(index) >= 2 && dph.isLastPressed(index)) {
          handleSubmit()     //if there are more than 2 char pressed, and the last 
          return             //char is pressed again, submit the word
        }                    
        const ix = dph.isPressed(index) +1 //we slice the current word and the
        setCurrWord(currWord.slice(0, ix)) //pressed array at the click location
        dph.slicepressed(ix)
        setPressed(dph.getPressed())
      }
      else if (dph.isNextTo(index)) {
          dph.press(index)
          setCurrWord(currWord+game.getDice()[index])
          setPressed(dph.getPressed())
      }
    }
  };

  const handleSubmit = () => {
      game.submitWord(currWord)
      setCurrWord("")
      dph.clear()
      setPressed(dph.getPressed())
  }
  
  const newgame = () => {
    game.newGame()
    setCurrWord("")
    dph.clear()
    setPressed(dph.getPressed())
  }

  return (
    <Container padding='0'>
      <Text fontWeight={'bold'} fontSize={'x-large'} bg='#4299E1' padding={'10px'} margin={0}>Boggle</Text>
      <Text margin='2em' fontWeight={'bold'} fontSize={'x-large'}>Time Left: {timeLeft}</Text>
      <Box padding={'auto'}>
        <GameGrid clicked={pressed} setClicked={ handleDieClick} letters={game.getDice()} />
        <Box>
            <Text fontSize='x-large' minHeight={'1.5em'} fontWeight={'bold'}>{currWord.toUpperCase()}</Text>
        </Box>
        <Button margin={'5px'} colorScheme='blue' onClick={ newgame }>roll</Button>
        <Button margin={'5px'} colorScheme='blue' onClick={ handleSubmit }> submit</Button>
        <Text fontWeight={'bold'}>
            Words Found: { game.numWordsFound() }
        </Text>
        <Text fontWeight={'bold'} >
            Score: { game.score() }
        </Text>
        <Text fontSize='x-large' minHeight={'1.5em'} fontWeight={'bold'}>{status}</Text>
      </Box>
    </Container>
  )
}

export default App
