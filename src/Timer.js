function Timer(initialTime, onTick) {
    let timeLeft = initialTime
    let intervalId = null

    const isTimeup = () => {
        return (timeLeft <= 0)
    }

    const start = () => {
        if (intervalId === null) {
            intervalId = setInterval(() => {
                timeLeft -= 1
                onTick(timeLeft)
                console.log('start timer')
                if (timeLeft <= 0) {
                    stop()
                }
            }, 1000)
        }
    }

    const stop = () => {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
    }

    const reset = () => {
        timeLeft = initialTime
        onTick(timeLeft)
    }

    return { start, stop, reset, isTimeup }
}

export { Timer }