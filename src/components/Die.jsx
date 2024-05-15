/* eslint-disable react/prop-types */
import React from 'react'
import { Box } from '@chakra-ui/react'

function Die({ letter, clicked, setClicked }) {
    
    return (
        <Box
            fontWeight={'bold'}  
            width="70px"
            height="70px"
            backgroundColor={clicked? 'yellow' : 'white'}
            cursor="pointer"
            onClick={setClicked}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {letter}
       </Box>
    )
}

export default Die