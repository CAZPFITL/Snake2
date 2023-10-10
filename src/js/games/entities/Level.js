import Food from './Food.js'
import SnakeObject from './SnakeObject/SnakeObject.js'

class Level {
    activeFood
    bounds = {
        x: -250,
        y: -250,
        width: 500,
        height: 500
    }
    border = 4

    constructor({ app }) {
        this.app = app
        this.init(app)
    }

    init(app) {
        this.activeFood = new Food({ app, bounds: this.bounds })
        this.player = new SnakeObject({ app, id: 1 })
    }

    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.square({
            ctx,
            color: '#eece9d',
            stroke: '#692700',
            widthStroke: this.border + 2.5,
            center: true,
            ...this.bounds
        })
    }

    newFood() {
        this.activeFood = new Food({ app: this.app, bounds: this.bounds })
    }

    update = () => {
        this.draw()
        this.activeFood.update()
        this.player.update()
        this.app.game.follow()
    }
}

export default Level