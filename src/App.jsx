/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box, GridItem } from '@chakra-ui/react'
import { SimpleGrid, Grid, Button, Input, Text, Container } from '@chakra-ui/react'
import Die from './components/Die'
import { diceGame } from './diceGame'
import { dicePressedHandler } from './dicePressedHandler'

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
  
  function newgame() {
    game.newGame()
    setCurrWord("")
    dph.clear()
    setPressed(( Array.from({ length: 16 }, () => false)))
  }
    
    return (
      <Container >
        <Text fontWeight={'bold'} fontSize={'x-large'}>Boggle</Text>
        <Text fontWeight={'bold'} fontSize={'x-large'}>Time Left: {timeLeft}</Text>
      <Box padding={'auto'}>
        <GameGrid clicked={pressed} setClicked={ handleDieClick} letters={game.getDice()} />
        <Button onClick={ newgame }>roll</Button>
        <Button onClick={ handleSubmit }> submit</Button>
        <Box>
            <Input type='text' value={ currWord }></Input>
        </Box>
        <Text>
            Words Found: { game.numWordsFound() }
        </Text>
        <Text>
            Score: { game.score() }
        </Text>
    </Box>
      </Container>
    
  )
}

const GameGrid = ({ letters, clicked, setClicked }) => {
  return (
    <Box
      width={'90vw'}
      maxWidth="600px"
      aspectRatio={1}
      margin={'0 auto'} 
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid columns={4} rows={4} spacing={2} width="100%" height="100%" >
        {letters.map((letter, index) => (
          <GridItem 
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={ clicked[index] ? "yellow" : "teal.200"}
            onClick={() => setClicked(index)}
            fontWeight="bold"
            fontSize={'x-large'}
          >
            {letter}
          </GridItem>
        ))}
      </SimpleGrid>

    </Box>
  )
}

// Render the random letters in a 4x4 grid
function RandomLetterGrid({ letters, clicked, setClicked }) {
    
  return (
    <Grid borderWidth={'1px'} templateColumns="repeat(4, 1fr)" gap={2} width={"90vw"} maxWidth="600px" aspectRatio={1} >
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
