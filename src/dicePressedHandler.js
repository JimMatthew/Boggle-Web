function dicePressedHandler() {

    let pressed = []
    const SIZE = 4
    function press(die) {
        pressed.push(die)
    }

    function clear() {
        pressed = []
    }

    function isPressed(die) {
        return pressed.includes(die)
    }

    function isNextTo(die) {
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

      return { press, clear, isPressed, isNextTo }
}
export { dicePressedHandler }
