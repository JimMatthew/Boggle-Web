/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { SimpleGrid, GridItem, Box } from '@chakra-ui/react'

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
        <SimpleGrid columns={4} rows={4} spacing={2} width="100%" height="100%" >
          {letters.map((letter, index) => (
            <GridItem 
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              backgroundColor={ clicked[index] ? "#90CDF4" : "teal.200"}
              onClick={() => setClicked(index)}
              fontWeight="bold"
              fontSize={'x-large'}
            >
              {letter.toUpperCase()}
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
    )
}

export default GameGrid 