import AppMethods from './core/AppMethods.js'

class App extends AppMethods {
    /**
     * Create a new `App` instance for the game.
     *
     * @param {function} Game - The game class to be associated with the application.
     */
    constructor(Game) {
        super(Game, false);
        window.app = this;
    }
}

export default App