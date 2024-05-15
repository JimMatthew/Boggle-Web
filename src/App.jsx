/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box } from '@chakra-ui/react'
import { SimpleGrid, Grid, Button, Input, Text } from '@chakra-ui/react'
import Die from './components/Die'
import { diceGame } from './diceGame'
import { dicePressedHandler } from './dicePressedHandler'

//var d = dictionary()
let game = diceGame()
let dph = dicePressedHandler()

function App() {
 
  const [dice, setDice] = useState([])
  const [pressed, setPressed] = useState( Array.from({ length: 16 }, () => false))
  const [currWord, setCurrWord] = useState("")

  const handleDieClick = (index) => {
    if (dph.isPressed(index) !== -1) {
        const ix = dph.isPressed(index)
        setCurrWord(currWord.slice(0, ix))
        dph.slicepressed(ix)
        setPressed(mapIndexesToBooleans(dph.getPressed()))
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
  };

  const handleSubmit = () => {
    
      game.submitWord(currWord)
      setCurrWord("")
      setPressed(( Array.from({ length: 16 }, () => false)))
      dph.clear()
  }
  
  function newgame() {
    game.newGame()
    const dr = game.getDice()
    setDice(dr)
  }
    const nwf = game.numWordsFound()
    
    return (
    <Box >
        <RandomLetterGrid clicked={pressed} setClicked={ handleDieClick} letters={dice} />
        <Button onClick={ newgame }>roll</Button>
        <Button onClick={ handleSubmit }> submit</Button>
        <Box>
            <Input type='text' value={ currWord }></Input>
        </Box>
        <Text>
            Words Found: {nwf}
        </Text>
    </Box>
  )
}

// Render the random letters in a 4x4 grid
function RandomLetterGrid({ letters, clicked, setClicked }) {
    
  return (
    <Grid borderWidth={'1px'} templateColumns="repeat(4, 1fr)" gap={2}>
      {letters.map((letter, index) => (
        <Die key={index} letter={letter} clicked={clicked[index]} setClicked={() => setClicked(index)} >
          {letter}
        </Die>
      ))}
    </Grid>
  );
}

function mapIndexesToBooleans(indexes) {
    const boolArray = Array(16).fill(false);
    indexes.forEach(index => {
      if (index >= 0 && index < 16) { 
        boolArray[index] = true;
      }
    });
    return boolArray;
  }

export default App
