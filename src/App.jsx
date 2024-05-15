/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './App.css'
import { Box } from '@chakra-ui/react'
import { SimpleGrid, Grid, Button, Input, Text } from '@chakra-ui/react'
import assetAsString from './enable1.txt?raw'
import Die from './components/Die'
import { dictionary } from './dictionary'
import { diceGame } from './diceGame'
import { dicePressedHandler } from './dicePressedHandler'

var d = dictionary()
let game = diceGame()
let dph = dicePressedHandler()
console.log('d len ' + d)


function App() {
 // const [words, setWords] = useState([]);
  //const [count, setCount] = useState(0)
 
  const [dice, setDice] = useState([])
  const [pressed, setPressed] = useState( Array.from({ length: 16 }, () => false))
  const [currWord, setCurrWord] = useState("")
  const handleDieClick = (index) => {
    if (dph.isNextTo(index)) {
        dph.press(index)
        const c = game.getDice()[index]
        setCurrWord(currWord+c)
        setPressed(prevClicked => {
            const newClicked = [...prevClicked]; // Create a copy of the clicked array
            newClicked[index] = !newClicked[index]; // Toggle the clicked state of the die at the specified index
            return newClicked; // Update the state with the modified array
        });
    }
  };

  const handleSubmit = () => {
    game.submitWord(currWord)
    setCurrWord("")
    setPressed(( Array.from({ length: 16 }, () => false)))
    dph.clear()
  }
  
  function s() {
    //const dr = dh.rollDice()
    game.newGame()
    const dr = game.getDice()
    setDice(dr)
    //const words = sol.solve(dr)
    //console.log(words)
  }
    const nwf = game.numWordsFound()
    
    console.log(d.wordsExists('dog'))
    console.log(d.length)
    return (
    <Box >
            <RandomLetterGrid clicked={pressed} setClicked={ handleDieClick} letters={dice} />
            <Button onClick={s}>roll</Button>
            <Button onClick={handleSubmit}> submit</Button>
            <Box>
                <Input type='text' value={ currWord }></Input>
            </Box>
            <Text>
                Words Found: {nwf}
            </Text>
    </Box>
  )
}


// Render the random letters in a 4x4 grid
function RandomLetterGrid({ letters, clicked, setClicked }) {
    
  return (
    <Grid borderWidth={'1px'} templateColumns="repeat(4, 1fr)" gap={2}>
      {letters.map((letter, index) => (
        <Die key={index} letter={letter} clicked={clicked[index]} setClicked={() => setClicked(index)} >
          {letter}
        </Die>
      ))}
    </Grid>
  );
}

// Example usage


export default App

import { Children } from "react";



function convertTo4x4Array(flatArray) {
    
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(flatArray.slice(i * 4, i * 4 + 4));
    }
    console.log(result)
    return result;
  }

  async function readDictionary() {
    const url = 'assets/enable1.txt';
    const dict = assetAsString.split('\n')
    console.log('dic length:', dict.length)
    return dict
    
}

class solver  {
    wordsFound = [];
    constructor() {
        this.wordsFound = []
        this.board = Array.from(Array(4), () => new Array(4));
        const trie = new Trie()
        this.root = new TrieNode();
        this.MaxWordLength = 16;
        const dict = assetAsString.split('\n').map(word => word.trim());
        let c = 0;
        for (let word of dict) {
            c++;
            trie.insert(word)
        }
        console.log('size of c', c)
    }

    solve(board) {
        //var board = convertTo4x4Array(b)
        console.log('solver received board:', board)
        this.setBoard(board);
        const visited = Array.from(Array(4), () => new Array(4).fill(false));
        this.wordsFound = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.solvr(visited, "", i, j);
            }
        }
        this.wordsFound = [...new Set(this.wordsFound)]; // Deduplicate words
        this.wordsFound.sort((a, b) => b.length - a.length); // Sort by length
        return this.wordsFound;
    }

    resetVisited(visited) {
        visited = Array.from({ length: 26 }).fill(false);
        return visited
    }

    insert(key) {
        if (!key) {
            return;
        }
        let level;
        const length = key.length;
        let index;
        let pCrawl = this.root;

        for (level = 0; level < length; level++) {
            index = key.charCodeAt(level) - 'a'.charCodeAt(0);
            if (!pCrawl.children[index]) {
                pCrawl.children[index] = new TrieNode();
            }
            pCrawl = pCrawl.children[index];
        }
        pCrawl.isEndOfWord = true;
    }

    setBoard(board) {
        this.wordsFound = [];
        let c = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.board[i][j] = board[c++];
            }
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < 4 && col >= 0 && col < 4;
    }

    solvr(visited, current, row, col) {
        visited[row][col] = true;
        current += this.board[row][col];
        let level;
        const length = current.length;
        let index;
        let pCrawl = this.root;
        console.log(current)
        for (level = 0; level < length; level++) {
            index = current.charCodeAt(level) - 'a'.charCodeAt(0);
            if (!pCrawl.children[index]) { // no more valid words on this branch
                visited[row][col] = false;
                return;
            }
            pCrawl = pCrawl.children[index];
        }
        if (pCrawl.isEndOfWord) {
            this.wordsFound.push(current);
        }

        if (current.length === this.MaxWordLength) {
            visited[row][col] = false;
            return;
        }
        const rows = [-1, 1, 0, 0, -1, 1, -1, 1];
        const cols = [0, 0, -1, 1, -1, 1, 1, -1];

        for (let i = 0; i < 8; i++) {
            const newRow = row + rows[i];
            const newCol = col + cols[i];
            if (this.isValidCell(newRow, newCol) && !visited[newRow][newCol]) {
                this.solvr(visited, current, newRow, newCol);
            }
        }
        visited[row][col] = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    // function for inserting words into dictionary
    insert(word) {
        let node = this.root
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode()
            }
            node = node.children[char]
        }
        node.isEndOfWord = true
    }

    search(word) {
        let node = this.root
        for (let char of word) {
            if (!node.children[char]) {
                return false
            }
            node = node.children[char]
        }
        return node.isEndOfWord
    }
}

class TrieNode {
    constructor() {
        this.children = {}; // Each node has a map of child nodes
        this.isEndOfWord = false; // Indicates if the node represents the end of a word
    }
}
// Usage

const sol = new solver()
