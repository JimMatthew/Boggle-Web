
function scoreCard() {

    let score = 0;
    let words = []

    const addWord = (word) => {
        score = score + computeScore(word)
        words.push(word)
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
        return words.length
    }

    const reset = () => {
        score = 0
        words = []
    }

    const computeScore = (word) => {
        const l = word.length;
        return l > 7 ? 11 :
               l > 6 ? 5 :
               l > 5 ? 3 :
               l > 4 ? 2 :
               l > 2 ? 1 : 0;
    };

    return { addWord, getNumWords, getWords, reset, isWordFound, getScore }
}

export { scoreCard }