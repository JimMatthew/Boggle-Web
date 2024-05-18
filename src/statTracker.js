
const statTracker = (() => {
    const storage = localStorage;
  
    const getItem = (key, defaultValue) => {
      const value = storage.getItem(key);
      return value !== null ? value : defaultValue;
    };
  
    const setItem = (key, value) => {
      storage.setItem(key, value);
    };
  
    const addGame = (score) => {
      const highScore = parseInt(getItem('highScore', '0'), 10);
      if (score > highScore) {
        setItem('highScore', score);
      }
  
      const gamesPlayed = parseInt(getItem('gamesPlayed', '0'), 10) + 1;
      setItem('gamesPlayed', gamesPlayed);
    };
  
    const getGamesPlayed = () => {
      return parseInt(getItem('gamesPlayed', '0'), 10);
    };
  
    const getHighScore = () => {
      return parseInt(getItem('highScore', '0'), 10);
    };
  
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
      getNumWords
    };
  })();
  
  export { statTracker };