import Screen from './src/Screen.js'
import Level from './entities/Level.js'

/**
 * Represents the main class for the Snake2 game.
 */
export default class Snake2 {
    app
    screen

    /**
     * Create a new `Snake2` instance associated with the provided application.
     *
     * @param {App} app - The application instance.
     */
    constructor(app) {
        this.app = app
        app.game = this
        this.screen = new Screen(app)
    }

    /**
     * Set the game state to the main menu state and initialize the event listeners.
     */
    setMenuState() {
        this.app.setState('MENU_MAIN')
        this.app.listeners.init()
    }

    /**
     * Set the game state to the play state, create a new game level, push the level to the looper, and initialize event listeners.
     */
    setPlayState() {
        this.app.setState('PLAY')
        this.app.level = new Level({ app: this.app })
        this.app.looper.push(this.app.level)
        this.app.listeners.init()
    }

    /**
     * Update the camera to follow the snake's head position.
     */
    follow() {
        this.app.gui.camera.moveTo([
            this.app.level.player.head.x,
            this.app.level.player.head.y
        ])
    }

    /**
     * Update the game. If the current state is 'LOAD_GAME', set the menu state, and then update the screen.
     */
    update = () => {
        if (this.app.state === 'LOAD_GAME') this.setMenuState()
        this.screen.update()
    }
}