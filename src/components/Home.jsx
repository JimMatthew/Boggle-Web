import React, { useState, } from 'react'
import { Center, Card, Text, Box, Container, Button } from '@chakra-ui/react'

const Home = () => {

    const [started, start] = useState(false)
    return (
        <Box>
             <Card>
                <Button>Start</Button>
                <Button>Stats</Button>
            </Card>
        </Box>
           
     
    )
   
}

export default Home