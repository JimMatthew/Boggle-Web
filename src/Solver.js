
function solver(dictionary) {
    const root = Node()
    const MaxWordLength = 16
    let board = Array.from(Array(4), () => new Array(4));
    let wordsFound = []

    const insert = (word) => {
        let node = root
        for (let char of word.trim()) {
            let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!node.children[index]) {
                node.children[index] = Node();
            }
            node = node.children[index];
        }
        node.isEndOfWord = true;
    }

    for (let word of dictionary) {
        insert(word);
    }

    const isValidCell = (row, col) => {
        return row >= 0 && row < 4 && col >= 0 && col < 4;
    }

    const solveBoard = (b) => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[i][j] = b[(i*4)+j]
            }
        }
        wordsFound = []
        let visited = Array.from(Array(4), () => new Array(4).fill(false));
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                solve(visited, "", i, j)
            }
        }
        wordsFound = [...new Set(wordsFound)];
        wordsFound.sort((a, b) => b.length - a.length); // Sort by length
        return wordsFound;
    }

    const solve = (visited, current, row, col) => {

        visited[row][col] = true
        current += board[row][col]
        let node = root

        for (let level = 0; level < current.length; level++) {
            let index = current.charCodeAt(level) - 'a'.charCodeAt(0)
            
            if (!node.children[index]) {
                visited[row][col] = false
                return
            }
            node = node.children[index]
        }
        if (node.isEndOfWord) {
            wordsFound.push(current)
        }

        if (current.length === MaxWordLength) {
            visited[row][col] = false
            return
        }
        const rows = [-1, 1, 0, 0, -1, 1, -1, 1];
        const cols = [0, 0, -1, 1, -1, 1, 1, -1];

        for (let i = 0; i < 8; i++) {
            const newrow = row + rows[i]
            const newcol = col + cols[i]
            if (isValidCell(newrow, newcol) && !visited[newrow][newcol]) {
                solve(visited, current, newrow, newcol)
            }
        }
        visited[row][col] = false
    }
    return { solveBoard }
}

function Node() {
    let children = Array(26).fill(null);
    let isEndOfWord = false

    return {children, isEndOfWord}
}

export { solver }
