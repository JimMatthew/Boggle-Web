/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { SimpleGrid, GridItem, Box, Image } from '@chakra-ui/react'
import blank from '../assets/blank.png'

const GameGrid = ({ letters, clicked, setClicked }) => {

  const [isDragging, setIsDragging] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleMouseDown = (index, event) => {
    event.cancelable && event.preventDefault()
    setSelectedIndex(index);
    setIsDragging(true)
    setClicked(index)
  }

  const handleMouseEnter = (index, event) => {
    event.cancelable && event.preventDefault()
    if (isDragging) {
      setClicked(index)
      setSelectedIndex(index);
    }
  }

  const handleMouseUp = (event) => {
    event.cancelable && event.preventDefault()
    setIsDragging(false)
    setSelectedIndex(-1);
  }

  const handleTouchMove = (event) => {
    event.cancelable && event.preventDefault()
    if (isDragging) {
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        let boxElement = target;
        // Traverse up the DOM to find the correct box element
        while (boxElement && !boxElement.dataset.index) {
          boxElement = boxElement.parentElement;
        }
        if (boxElement && boxElement.dataset.index) {
          const newIndex = parseInt(boxElement.dataset.index, 10);
          if (newIndex !== selectedIndex){
            setClicked(newIndex)
            setSelectedIndex(newIndex)
          }
        }
      }
    }
  }

  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isDragging){
        setIsDragging(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mouseup', handleMouseUpOutside)
    document.addEventListener('touchend', handleMouseUpOutside);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside)
      document.removeEventListener('touchend', handleMouseUpOutside);
    }
  },[isDragging])

  return (
    <Box
      className='boxclass'
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
            cursor="pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={clicked[index] ? "red" : "black"}
            onMouseDown={(event) => handleMouseDown(index, event)}
            fontWeight="bold"
            fontSize={'x-large'}
          >
             <Box
              position="relative"
              width="100%"
              height="100%"
              padding="1%"
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
                paddingLeft="15px"
                paddingRight="15px"
                paddingTop="5px"
                paddingBottom="5px"
                data-index={index}
                className='boxclass'
                onMouseEnter={(event) => handleMouseEnter(index,event)}
                onMouseUp={handleMouseUp}
                onTouchStart={(event) => handleMouseDown(index, event)}
                onTouchMove={(event) => handleTouchMove(event)}
                onTouchEnd={handleMouseUp}
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