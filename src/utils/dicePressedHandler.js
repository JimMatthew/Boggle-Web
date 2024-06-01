function dicePressedHandler() {
    const SIZE = 4
    let pressed = []

    const press = (die) => {
        pressed.push(die)
    }

    const clear = () => {
        pressed = []
    }

    const slicePressed = (die) => {
        pressed = pressed.slice(0, die)
    }

    const isPressed = (die) => {
        return pressed.indexOf(die)
    }

    const isLastPressed = (die) => {
        return pressed.indexOf(die) === pressed.length - 1
    }

    const getPressed = () => {
        const boolArray = Array(16).fill(false)
        pressed.forEach(index => {
            if (index >= 0 && index < 16) { 
                boolArray[index] = true
            }
        })
        return boolArray
    }
    
    const isNextTo = (die) => {
        if (pressed.length === 0) {
            return true;
        }
        const last = pressed[pressed.length - 1]
        const Xbtt = Math.floor(die / SIZE)
        const Ybtt = die % SIZE
        const Xblp = Math.floor(last / SIZE)
        const Yblp = last % SIZE

        return (
            (Xbtt === Xblp && Math.abs(Ybtt - Yblp) === 1) ||
            (Ybtt === Yblp && Math.abs(Xbtt - Xblp) === 1) ||
            (Math.abs(Xbtt - Xblp) === 1 && Math.abs(Ybtt - Yblp) === 1)
        )
    }

    return { press, clear, slicePressed, isPressed, isNextTo, getPressed, isLastPressed }
}

export { dicePressedHandler }