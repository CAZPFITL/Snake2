import {Screen, Level, AudioBox, Controls} from './dir/core.js'


/**
 * Represents the main class for the Snake2 game.
 */
export default class Snake2 {
    app
    screen

    constructor(app) {
        this.app = app
        app.game = this
        app.screen = new Screen({ app })
        app.audio = new AudioBox({ app })
        app.controls = new Controls({ app })
        app.listeners.init()
    }

    /**
     * Set the game state to the main menu state and initialize the event listeners.
     */
    setMenuState() {
        this.app.setState('MAIN_MENU')
        this.app.gui.mapCtx.canvas.style.display = 'none'
    }

    /**
     * Set the game state to the play state, create a new game level, push the level to the looper, and initialize event listeners.
     */
    setPlayState() {
        this.app.setState('PLAY')
        this.app.gui.mapCtx.canvas.style.display = 'block'
        this.app.level = new Level({ app: this.app })
        this.app.audio.play()
    }

    /**
     * Update the game. If the current state is 'LOAD_GAME', set the menu state, and then update the screen.
     */
    update = () => {
        if (this.app.state === 'LOAD_GAME') this.setMenuState()
        this.app?.level?.update()
        if (!this.app?.level?.player?.alive) {
            this.app.audio.stop()
        }
        this.app.screen.update()
    }
}