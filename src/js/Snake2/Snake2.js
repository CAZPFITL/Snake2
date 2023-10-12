import Screen from './src/Screen.js'
import Level from './entities/Level.js'

export default class Snake2 {
    app
    screen
    constructor(app) {
        this.app = app
        app.game = this
        this.screen = new Screen(app)
    }

    setPlayState() {
        this.app.setState('PLAY')
        this.app.level = new Level({ app: this.app })
        this.app.looper.push(this.app.level)
        this.app.listeners.init()
    }

    follow() {
        this.app.gui.camera.moveTo([
            this.app.level.player.head.x,
            this.app.level.player.head.y
        ])
    }

    update = () => {
        if (this.app.state === 'LOAD_GAME') this.setPlayState()
        this.screen.update()
    }
}