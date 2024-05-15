/* eslint-disable react/prop-types */
import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'

function Die({ letter, clicked, setClicked }) {
    
    return (
        <GridItem
            fontWeight={'bold'}  
            width="100%"
            height="100%"
            backgroundColor={clicked? 'yellow' : 'white'}
            cursor="pointer"
            onClick={setClicked}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize={'x-large'}
        >
            {letter}
       </GridItem>
    )
}

export default Die