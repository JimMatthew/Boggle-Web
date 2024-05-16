/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { SimpleGrid, GridItem, Box, Image } from '@chakra-ui/react'
import blank from '../assets/blank.png'

const GameGrid = ({ letters, clicked, setClicked }) => {
  return (
    <Box
      width={'90vw'}
      maxWidth="400px"
      aspectRatio={1}
      margin={'0 auto'} 
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid columns={4} rows={4} spacing={2} width="100%" height="100%" marginBottom={'50px'}>
        {letters.map((letter, index) => (
          <GridItem 
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={clicked[index] ? "red" : "black"}
            onClick={() => setClicked(index)}
            fontWeight="bold"
            fontSize={'x-large'}
          >
             <Box
              position="relative"
              width="100%"
              height="100%"
              padding="5%"
            >
              <Image
                src={blank}
                alt="Logo"
                width="100%"
                height="100%"
                objectFit="cover"
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="2xl"
                fontWeight="bold"
                borderRadius="md"
              >
                {letter.toUpperCase()}
              </Box>
            </Box>
            
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default GameGrid 

//backgroundColor={ clicked[index] ? "#90CDF4" : "teal.200"}