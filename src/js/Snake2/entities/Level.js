import Food from './Food.js'
import SnakeObject from './SnakeObject/SnakeObject.js'

class Level {
    activeFood
    bounds = {
        x: -100,
        y: -100,
        width: 200,
        height: 200
    }
    multiplier = 1
    border = 4

    constructor({ app }) {
        this.app = app
        this.init(app)
    }

    init(app) {
        this.activeFood = new Food({ app, level: this })
        this.player = new SnakeObject({ app, id: 1 })
    }

    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.square({
            ctx,
            color: '#eece9d',
            stroke: '#692700',
            widthStroke: this.border,
            center: true,
            ...this.bounds
        })
    }

    newFood() {
        this.activeFood = new Food({ app: this.app, level: this })
    }

    update = () => {
        this.draw()
        this.activeFood.update()
        this.player.update()
    }
}

export default Level