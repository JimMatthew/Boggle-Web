
const statTracker = (() => {
    const storage = localStorage;
  
    const getItem = (key, defaultValue) => {
      const value = storage.getItem(key);
      return value !== null ? value : defaultValue;
    };
  
    const setItem = (key, value) => {
      storage.setItem(key, value);
    };
  
    const addGame = (score, numWords) => {
      const highScore = parseInt(getItem('highScore', '0'), 10);
      const gamesPlayed = parseInt(getItem('gamesPlayed', '0'), 10) + 1;
      const words = parseInt(getItem('mostWords', '0'), 10)

      if (numWords > words) {
        setItem('mostWords', numWords)
      }
      if (score > highScore) {
        setItem('highScore', score);
      }
      setItem('gamesPlayed', gamesPlayed);
    };
  
    const getGamesPlayed = () => {
      return parseInt(getItem('gamesPlayed', '0'), 10);
    };
  
    const getHighScore = () => {
      return parseInt(getItem('highScore', '0'), 10);
    };

    const getMostWordsFound = () => {
      return parseInt(getItem('mostWords', '0'), 10)
    }
  
    const addWord = (word) => {
      const numWords = parseInt(getItem('numWords', '0'), 10) + 1;
      setItem('numWords', numWords);
  
      const longestWord = getItem('longestWord', '');
      if (word.length > longestWord.length) {
        setItem('longestWord', word);
      }
    };
  
    const getLongestWord = () => {
      return getItem('longestWord', '');
    };
  
    const getNumWords = () => {
      return parseInt(getItem('numWords', '0'), 10);
    };
  
    return {
      addGame,
      getGamesPlayed,
      getHighScore,
      addWord,
      getLongestWord,
      getNumWords,
      getMostWordsFound
    };
  })();
  
  export { statTracker };