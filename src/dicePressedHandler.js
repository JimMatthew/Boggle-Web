import { mapIndexesToBooleans } from "./mapIndextoBool"

function dicePressedHandler() {
    
    let pressed = []
    const SIZE = 4

    const press = (die) => {
      pressed.push(die)
    }

    const clear = () => {
        pressed = []
    }

    const slicepressed = (die) => {
        pressed = pressed.slice(0, die)
    }

    const isPressed = (die) => {
        return pressed.indexOf(die)
    }

    const isLastPressed = (die) => {
      return (pressed.indexOf(die) === pressed.length-1) 
    }

    const getPressed = () => {
      return mapIndexesToBooleans(pressed)
    }

    // function to determine if this die is in a valid
    // position in reference to the last die, if one exists
    const isNextTo = (die) => {
        if (pressed.length === 0) {
          return true
        }
        const last = pressed[pressed.length-1]
        const Xbtt = Math.floor(die / SIZE);
        const Ybtt = die % SIZE;
        const Xblp = Math.floor(last / SIZE);
        const Yblp = last % SIZE;

        if (Xblp === -1) {
          return true;
        }

        return (
          (Xbtt === Xblp && Math.abs(Ybtt - Yblp) === 1) ||
          (Ybtt === Yblp && Math.abs(Xbtt - Xblp) === 1) ||
          (Math.abs(Xbtt - Xblp) === 1 && Math.abs(Ybtt - Yblp) === 1)
        );
      }

      return { press, clear, isPressed, isNextTo, slicepressed, getPressed, isLastPressed }
}
export { dicePressedHandler }
