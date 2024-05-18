import assetAsString from './wordlist.txt?raw';

/**
 * Handles dictionary operations such as checking if a word exists in the dictionary.
 */
function dictionary() {
    // Split the word list into an array and trim any whitespace from each word.
    const dict = assetAsString.split('\n').map(word => word.trim());

    /**
     * Checks if a word exists in the dictionary.
     * @param {string} word - The word to check.
     * @returns {boolean} True if the word exists, otherwise false.
     */
    const wordExists = (word) => {
        return dict.includes(word);
    };

    /**
     * Gets the entire dictionary.
     * @returns {string[]} The dictionary array.
     */
    const getDict = () => {
        return dict;
    };

    return { wordExists, getDict };
}

export { dictionary };