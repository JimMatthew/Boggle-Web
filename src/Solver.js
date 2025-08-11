function solver(dictionary) {
    const root = Node();
    const MaxWordLength = 16;
    let board = Array.from(Array(4), () => new Array(4));
    let visited = Array.from(Array(4), () => new Array(4).fill(false));
    let wordsFound = new Set();

    const rows = [-1, 1, 0, 0, -1, 1, -1, 1];
    const cols = [0, 0, -1, 1, -1, 1, 1, -1];

    const insert = (word) => {
        let node = root;
        for (let char of word.trim()) {
            let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!node.children[index]) {
                node.children[index] = Node();
            }
            node = node.children[index];
        }
        node.isEndOfWord = true;
    };

    for (let word of dictionary) {
        insert(word);
    }

    const isValidCell = (row, col) => {
        return row >= 0 && row < 4 && col >= 0 && col < 4;
    };

    const resetVisited = () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                visited[i][j] = false;
            }
        }
    };

    const solveBoard = (boggleBoard) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[i][j] = boggleBoard[i * 4 + j];
            }
        }
        wordsFound.clear(); 
        resetVisited(); 

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const index = board[i][j].charCodeAt(0) - 'a'.charCodeAt(0);
                const nextNode = root.children[index];
                if (nextNode) {
                    solve(board[i][j], i, j, nextNode);
                }
            }
        }

        // Convert set to sorted array
        return Array.from(wordsFound).sort((a, b) => b.length - a.length);
    };

    const solve = (current, row, col, node) => {
        visited[row][col] = true;

        if (node.isEndOfWord) {
            wordsFound.add(current);
        }

        if (current.length === MaxWordLength) {
            visited[row][col] = false;
            return;
        }

        for (let i = 0; i < 8; i++) {
            const newrow = row + rows[i];
            const newcol = col + cols[i];
            if (isValidCell(newrow, newcol) && !visited[newrow][newcol]) {
                const letter = board[newrow][newcol];
                const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
                const nextNode = node.children[index];
                if (nextNode) {
                    solve(current + letter, newrow, newcol, nextNode);
                }
            }
        }

        visited[row][col] = false;
    };

    return { solveBoard };
}

function Node() {
    let children = Array(26).fill(null);
    let isEndOfWord = false;
    return { children, isEndOfWord };
}

export { solver };