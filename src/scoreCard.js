/**
 * ScoreCard module to manage game score and words found.
 */
function scoreCard() {
    let score = 0;
    let words = [];

    /**
     * Adds a word to the scorecard and updates the score.
     * @param {string} word - The word to add.
     */
    const addWord = (word) => {
        score += computeScore(word);
        words.push(word);
    };

    /**
     * Gets the list of words found.
     * @returns {string[]} The list of words.
     */
    const getWords = () => {
        return words;
    };

    /**
     * Checks if a word has already been found.
     * @param {string} word - The word to check.
     * @returns {boolean} True if the word is found, otherwise false.
     */
    const isWordFound = (word) => {
        return words.includes(word);
    };

    /**
     * Gets the current score.
     * @returns {number} The current score.
     */
    const getScore = () => {
        return score;
    };

    /**
     * Gets the number of words found.
     * @returns {number} The number of words.
     */
    const getNumWords = () => {
        return words.length;
    };

    /**
     * Resets the scorecard.
     */
    const reset = () => {
        score = 0;
        words = [];
    };

    /**
     * Computes the score for a given word based on its length.
     * @param {string} word - The word to compute the score for.
     * @returns {number} The score for the word.
     */
    const computeScore = (word) => {
        const length = word.length;
        if (length > 7) return 11;
        if (length > 6) return 5;
        if (length > 5) return 3;
        if (length > 4) return 2;
        return length > 2 ? 1 : 0;
    };

    return {
        addWord,
        getWords,
        isWordFound,
        getScore,
        getNumWords,
        reset
    };
}

export { scoreCard };