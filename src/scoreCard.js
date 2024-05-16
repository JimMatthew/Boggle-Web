
function scoreCard() {

    let score = 0;
    let numwords = 0;
    let words = []

    const addWord = (word) => {
        score = score + computeScore(word)
        words.push(word)
        numwords++
        console.log(words)
    }

    const getWords = () => {
        return words
    }
   
    const isWordFound = (word) => {
        return words.includes(word)
    }
    
    const getScore = () => {
        return score
    }

    const getNumWords = () => {
        return numwords
    }

    const reset = () => {
        score = 0
        numwords = 0
        words = []
    }

    const computeScore = (word) => {
        const l = word.length
        let s = 0;
        if (l > 7) {
            s = 11
        } else if (l > 6) {
            s = 5
        } else if (l > 5) {
            s = 3
        } else if (l > 4) {
            s = 2
        } else if (l > 2) {
            s = 1
        }
        return s
    }

    return { addWord, getNumWords, getWords, reset, isWordFound, getScore }
}

export { scoreCard }