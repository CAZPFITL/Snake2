import Gui from './Gui.js'
import Animation from './core/Animation.js'
import Listeners from './core/Listeners.js'
import StateManager from './core/StateManager.js'
import Tools from './core/Tools.js'

/**
 * Represents a base class for managing a game application.
 */
export default class AppMethods extends StateManager {
    tools = Tools // A reference to the Tools class for utility functions.
    looper = []// Stores components for the game loop.
    listeners // Manages event listeners.
    animation // Manages animations and state transitions.

    /**
     * Initializes the AppMethods class.
     *
     * @param {Function} Game - The main game class to be instantiated.
     */
    constructor(Game) {
        super() // Initialize the state manager.
        this.animation = new Animation(this) // Create an instance of the Animation class.
        this.listeners = new Listeners(this) // Create an instance of the Listeners class.

        // Initialize the looper array with Gui and Game components.
        this.looper.push(new Gui(this))
        this.looper.push(new Game(this))
    }

    /**
     * Initializes the game application.
     */
    init = () => {
        this.setState('LOAD_GAME')
        this.animation.mainLoop()
    }
}
