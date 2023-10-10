import SnakeObject from "./../entities/SnakeObject/SnakeObject.js"
import Screen from "./Screen.js"

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
        this.app.player = new SnakeObject({app: this.app, id: 1})
        this.app.looper.push(this.app.player)
        this.app.listeners.init()
    }

    update = () => {
        if (this.app.state === 'LOAD_GAME') this.setPlayState()

        this.screen.update()
    }
}