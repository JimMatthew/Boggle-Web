import assetAsString from './wordlist.txt?raw';

function dictionary() {
    
    const dict = assetAsString.split('\n').map(word => word.trim())

    const wordExists = (word) => {
        return dict.includes(word);
    }

    const getDict = () => {
        return dict;
    }

    return { wordExists, getDict }
}

export { dictionary }