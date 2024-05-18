/* eslint-disable react/prop-types */
import React, { useState, } from 'react'
import { Center, Card, Text } from '@chakra-ui/react'

const StatPane = ({numGames, numWords, longWord, highScore}) => {
    return (
    <Card margin='8px' paddingBottom='8px'>
        <Center fontWeight='bold'>Stats</Center>
        <Text>High Score: {highScore}</Text>
        <Text>Games Played: {numGames}</Text>
        <Text>Num Words: {numWords}</Text>
        <Text>Longest Word: {longWord}</Text>
    </Card>
    )
}

export default StatPane 