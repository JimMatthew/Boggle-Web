/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { SimpleGrid, GridItem, Box, Image } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

function WordTable ({ wordlist }) {
    return (
        <TableContainer>
        <Table size='sm' >
        <Thead>
            <Tr>
                <Th>
                Words Found
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {wordlist.map((word, index) => (
                <Tr key={index}>
                    <Td> {word}</Td>
                </Tr>
            ))}
        </Tbody>
        </Table>
      
    </TableContainer>
    )
}

export default WordTable