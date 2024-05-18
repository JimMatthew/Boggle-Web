import { mapIndexesToBooleans } from "./mapIndextoBool";

/**
 * Handles the pressed state of dice in a 4x4 grid.
 */
function dicePressedHandler() {
    const SIZE = 4;
    let pressed = [];

    /**
     * Presses a die.
     * @param {number} die - The index of the die to press.
     */
    const press = (die) => {
        pressed.push(die);
    };

    /**
     * Clears all pressed dice.
     */
    const clear = () => {
        pressed = [];
    };

    /**
     * Slices the pressed array up to the given die index.
     * @param {number} die - The index to slice up to.
     */
    const slicePressed = (die) => {
        pressed = pressed.slice(0, die);
    };

    /**
     * Checks if a die is pressed.
     * @param {number} die - The index of the die to check.
     * @returns {boolean} True if the die is pressed, otherwise false.
     */
    const isPressed = (die) => {
        return pressed.indexOf(die) !== -1;
    };

    /**
     * Checks if a die is the last pressed die.
     * @param {number} die - The index of the die to check.
     * @returns {boolean} True if the die is the last pressed, otherwise false.
     */
    const isLastPressed = (die) => {
        return pressed.indexOf(die) === pressed.length - 1;
    };

    /**
     * Gets the pressed dice as a boolean array.
     * @returns {boolean[]} An array of booleans indicating pressed dice.
     */
    const getPressed = () => {
        return mapIndexesToBooleans(pressed);
    };

    /**
     * Determines if a die is next to the last pressed die.
     * @param {number} die - The index of the die to check.
     * @returns {boolean} True if the die is next to the last pressed die, otherwise false.
     */
    const isNextTo = (die) => {
        if (pressed.length === 0) {
            return true;
        }

        const last = pressed[pressed.length - 1];
        const Xbtt = Math.floor(die / SIZE);
        const Ybtt = die % SIZE;
        const Xblp = Math.floor(last / SIZE);
        const Yblp = last % SIZE;

        return (
            (Xbtt === Xblp && Math.abs(Ybtt - Yblp) === 1) ||
            (Ybtt === Yblp && Math.abs(Xbtt - Xblp) === 1) ||
            (Math.abs(Xbtt - Xblp) === 1 && Math.abs(Ybtt - Yblp) === 1)
        );
    };

    return { press, clear, slicePressed, isPressed, isNextTo, getPressed, isLastPressed };
}

export { dicePressedHandler };