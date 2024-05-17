import assetAsString from './wordlist.txt?raw'

function dictionary() {

    const dict = assetAsString.split('\n').map(word => word.trim());
    
    const wordsExists = (wordt) => {
        let isWordIncluded = false;
        for (let i = 0; i < dict.length; i++) {
            if (dict[i] === wordt) {
              isWordIncluded = true;
              break;
            }
          }
       return isWordIncluded
    }

    const getDict = () => {
      return dict
    }
    return { wordsExists, getDict}
}

export { dictionary }