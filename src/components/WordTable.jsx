/* eslint-disable react/prop-types */
import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

function WordTable({ wordlist, title }) {
    // Ensure wordlist is an array before mapping over it
    if (!Array.isArray(wordlist)) {
        console.error('Invalid wordlist provided to WordTable component.')
        return null
    }

    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>{title}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {wordlist.map((word, index) => (
                        <Tr key={index}>
                            <Td>{word}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default WordTable