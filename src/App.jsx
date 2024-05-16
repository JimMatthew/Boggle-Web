/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box, GridItem } from '@chakra-ui/react'
import { SimpleGrid, Button, Input, Text, Container } from '@chakra-ui/react'
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

  useEffect(() => {
    game.onTick(setTimeLeft)
    game.newGame()
  }, [])

  const handleDieClick = (index) => {
    if (!game.isGameOver()){
      if (dph.isPressed(index) !== -1) { //die is already pressed
        const ix = dph.isPressed(index)  //we slice the current word and the
        setCurrWord(currWord.slice(0, ix)) //pressed array at the click location
        dph.slicepressed(ix)
        setPressed(dph.getPressedAsBoolArr())
      }
      else if (dph.isNextTo(index)) {
          dph.press(index)
          setCurrWord(currWord+game.getDice()[index])
          setPressed(prevClicked => {
              const newClicked = [...prevClicked]; // Create a copy of the clicked array
              newClicked[index] = !newClicked[index]; // Toggle the clicked state of the die at the specified index
              return newClicked; // Update the state with the modified array
          });
      }
    }
  };

  const handleSubmit = () => {
      game.submitWord(currWord)
      setCurrWord("")
      setPressed(( Array.from({ length: 16 }, () => false)))
      dph.clear()
  }
  
  const newgame = () => {
    game.newGame()
    setCurrWord("")
    dph.clear()
    setPressed(( Array.from({ length: 16 }, () => false)))
  }

    return (
      <Container >
        <Text fontWeight={'bold'} fontSize={'x-large'} bg='#4299E1' padding={'10px'} margin={0}>Boggle</Text>
        <Text fontWeight={'bold'} fontSize={'x-large'}>Time Left: {timeLeft}</Text>
      <Box padding={'auto'}>
        <GameGrid clicked={pressed} setClicked={ handleDieClick} letters={game.getDice()} />
        <Button margin={'5px'} colorScheme='blue' onClick={ newgame }>roll</Button>
        <Button margin={'5px'} colorScheme='blue' onClick={ handleSubmit }> submit</Button>
        <Box>
            <Text minHeight={'1.5em'} fontWeight={'bold'}>{currWord.toUpperCase()}</Text>
        </Box>
        <Text fontWeight={'bold'}>
            Words Found: { game.numWordsFound() }
        </Text>
        <Text fontWeight={'bold'} >
            Score: { game.score() }
        </Text>
    </Box>
      </Container>
  )
}

export default App
