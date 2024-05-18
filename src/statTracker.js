
function statTracker() {

    function addGame(score) {
        let hs = localStorage.getItem('highScore')
        if(!hs){
            hs = 0
        }
        if (score >= hs) {
            localStorage.setItem('highScore', score)
        }
        let gp = localStorage.getItem('gamesPlayed')
        if (!gp) {
            gp = 0
        }
        gp++
        localStorage.setItem('gamesPlayed', gp)
    }

    function getGamesPlayed() {
        return localStorage.getItem('gamesPlayed')
    }

    function getHighScore() {
        return localStorage.getItem('highScore')
    }

    function addWord(word) {
        let nw = localStorage.getItem('numWords')
        if (!nw) {
            nw = 0
        }
        nw++
        localStorage.setItem('numWords', nw)
        let lw = localStorage.getItem('longestWord')
        if (!lw) {
            lw = ''
        }
        if (word.length > lw.length) {
            localStorage.setItem('longestWord', word)
        }
    }

    function getLongestWord() {
        return localStorage.getItem('longestWord')
    }

    function getNumWords() {
        return localStorage.getItem('numWords')
    }

    return { addGame, getGamesPlayed, addWord, getLongestWord, getNumWords, getHighScore }
}

export { statTracker }