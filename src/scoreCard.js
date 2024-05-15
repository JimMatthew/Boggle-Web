
function scoreCard() {

    let score = 0;
    let numwords = 0;
    let words = []

    function addWord(word) {
        words.push(word)
        numwords++
    }

    function getWords() {
        return words
    }

    function getNumWords() {
        return numwords
    }

    function reset() {
        score = 0;
        numwords = 0;
        words = [];
    }

    return { addWord, getNumWords, getWords, reset }
}

export { scoreCard }