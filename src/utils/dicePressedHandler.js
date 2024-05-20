class DicePressedHandler {
    constructor() {
        this.pressed = Array(16).fill(false);
        this.lastPressedIndex = -1;
    }

    isPressed(index) {
        return this.pressed[index] ? this.pressed.indexOf(true) : -1;
    }

    isLastPressed(index) {
        return this.lastPressedIndex === index;
    }

    isNextTo(index) {
        if (this.lastPressedIndex === -1) return true; // First press

        const lastRow = Math.floor(this.lastPressedIndex / 4);
        const lastCol = this.lastPressedIndex % 4;
        const row = Math.floor(index / 4);
        const col = index % 4;

        return Math.abs(lastRow - row) <= 1 && Math.abs(lastCol - col) <= 1;
    }

    press(index) {
        this.pressed[index] = true;
        this.lastPressedIndex = index;
    }

    slicePressed(ix) {
        this.pressed.fill(false, ix);
        this.lastPressedIndex = -1;
    }

    clear() {
        this.pressed.fill(false);
        this.lastPressedIndex = -1;
    }

    getPressed() {
        return this.pressed;
    }
}

export const dicePressedHandler = () => new DicePressedHandler();