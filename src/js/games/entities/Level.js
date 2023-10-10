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

    constructor({ app }) {
        this.app = app
        this.init(app)
    }

    init(app) {
        this.activeFood = new Food({ app })
        this.player = new SnakeObject({ app, id: 1 })
    }

    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.square({
            ctx,
            color: '#4d878f',
            stroke: '#000000',
            widthStroke: 1,
            center: true,
            ...this.bounds
        })
    }

    update = () => {
        this.draw()
        this.activeFood.update()
        this.player.update()
        this.app.game.follow()
    }
}

export default Level