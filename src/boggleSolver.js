import { Children } from "react";


function convertTo4x4Array(flatArray) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(flatArray.slice(i * 4, i * 4 + 4));
    }
    return result;
  }

  async function readDictionary() {
    const url = 'resources/dictionary.txt';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch dictionary: ${response.statusText}`);
        }
        const text = await response.text();
        // Split the text into an array of strings using newline as the delimiter
        const dictionary = text.split('\n');
        // Remove any empty strings or whitespace from the array
        const filteredDictionary = dictionary.filter(word => word.trim() !== '');

        return filteredDictionary;
    } catch (error) {
        console.error('Error reading dictionary file:', error);
        return [];
    }
}

class solver {
    constructor() {
        this.wordsFound = []
        this.board = Array.from(Array(4), () => new Array(4));
        const trie = new Trie()
        this.root = new TrieNode();
        this.MaxWordLength = 16;
        readDictionary()
        .then(dictionary => {
            for (let word of dictionary) {
                trie.insert(word)
            }
        })
        .catch(error => {
        console.error(error);
        });
    }

    solve(b) {
        var board = convertTo4x4Array(b)
        if (board.length !== 16) {
            throw new Error("Board Array must be 16 Strings long");
        }
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

export default solver
