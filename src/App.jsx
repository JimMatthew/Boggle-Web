/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box, Button, Text, Container,Flex, Spacer, Card, HStack, Center } from '@chakra-ui/react'
import StatPane from './components/StatPane'
import GameGrid from './components/GameGrid'
import WordTable from './components/WordTable'
import { GameProvider, useGameContext } from './context/GameProvider'
import useDiceHandler from './hooks/useDiceHandler'
import { useTimer } from './hooks/useTimer'

const AppContent = () => {

  const { state, dispatch } = useGameContext()
  const { handleDieClick, handleSubmit } = useDiceHandler()
  useTimer()

  const newgame = () => dispatch({ type: 'NEW_GAME' })

  return (
    <Box minHeight='100dvh' backgroundColor='gray.200'>
      <Container minHeight='100dvh' backgroundColor='white' padding='0'>
        <Text 
          fontWeight='bold' 
          fontSize='x-large' 
          bg='blue.300'
          padding='5px' 
          margin={0}>Boggle
        </Text>
        <Card margin='5px'>
          <Text 
            margin='.3em' 
            fontWeight='bold' 
            fontSize='x-large'>Time Left: {state.timeLeft}
          </Text>
        </Card>

        <Box padding='auto'>
          {!state.game.isGameOver() ? (
            <GameGrid 
              clicked={state.pressed} 
              setClicked={handleDieClick} 
              letters={state.game.getDice()} />
          ) : (
            <Box> 
              <StatPane 
                highScore={state.game.getHighScore()}
                numGames={state.game.getNumGamesPlayed()} 
                numWords={state.game.getNumWordsFound()} 
                longWord={state.game.getLongestWordFound()} />
            </Box>
          )}
          <Card margin='8px' marginBottom='5px' marginTop='10px'>
            <Box>
              <Text fontSize='x-large' minHeight='1.5em' fontWeight='bold'>
                {state.currWord.toUpperCase()}
              </Text>
            </Box>

            <Center>
              <HStack spacing={8}>
                <Button 
                  margin='5px' 
                  colorScheme='blue' 
                  onClick={newgame}>New Game
                </Button>
                <Button 
                  margin='5px' 
                  colorScheme='blue' 
                  onClick={handleSubmit}>Submit
                </Button>
              </HStack>
            </Center>
          
            <Text fontWeight='bold'>
              Words Found: {state.game.numWordsFound()}
            </Text>
            <Text fontWeight='bold'>
              Score: {state.game.score()}
            </Text>
            <Text fontWeight='bold'>
              Words on Board: {state.game.getNumWordsOnBoard()}
            </Text>
            <Text 
              fontSize='x-large' 
              minHeight='1.5em' 
              fontWeight='bold'>{state.status}
            </Text>
          </Card>
        </Box>

        {state.game.isGameOver() && (
          <Flex>
            <WordTable wordlist={state.game.getWordsOnboard()} title="All Words" />
            <WordTable wordlist={state.game.wordsFound()} title="Words Found" />
          </Flex>
        )}
        <Spacer />
      </Container>
    </Box>
  );
}

const App = () => (
  <GameProvider>
    <AppContent />
  </GameProvider>
)

export default App
