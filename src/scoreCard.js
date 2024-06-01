function scoreCard() {
    let score = 0
    let words = []

    const addWord = (word) => {
        score += computeScore(word)
        words.push(word)
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
        return words.length
    }

    const reset = () => {
        score = 0
        words = []
    }
   
    const computeScore = (word) => {
        const length = word.length
        if (length > 7) return 11
        if (length > 6) return 5
        if (length > 5) return 3
        if (length > 4) return 2
        return length > 2 ? 1 : 0
    }

    return {
        addWord,
        getWords,
        isWordFound,
        getScore,
        getNumWords,
        reset
    }
}

export { scoreCard };