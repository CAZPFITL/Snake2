import {Food, Snake, Timer, Marker, Viewport, Controls} from './../dir/core.js'

/**
 * Represents a game level containing food, a snake, and a marker.
 */
class Level {
    app
    activeFood
    size = 60
    bounds = {
        x: -this.size,
        y: -this.size,
        width: this.size * 2,
        height: this.size * 2
    }
    border = 20

    constructor({ app }) {
        this.app = app
        this.init()
    }

    /**
     * Initialize the game level by creating food, a snake, and a marker.
     */
    init = () => {
        const { app } = this
        this.activeFood = new Food({ app, level: this })
        this.player = new Snake({ app })
        this.marker = new Marker({ app })
        this.timer = new Timer({ app })
    }

    /**
     * Draw the game level on the specified canvas context or the default GUI context.
     */
    draw(ctx) {
        this.app.gui.get.square({
            ctx,
            color: '#b7b7b7',
            stroke: '#4f0069',
            widthStroke: this.border,
            center: true,
            ...this.bounds
        })
    }

    /**
     * Generate a new food item within the game level.
     */
    setFood() {
        this.activeFood = new Food({ app: this.app, level: this })
    }

    /**
     * Update the game level, including drawing, updating food, the snake, and the marker.
     */
    update = () => {
        const { gui } = this.app

        this.player.update()
        this.marker.update()

        const print = (ctx) => {
            this.draw(ctx)
            this.player.draw(ctx)
            this.activeFood.draw(ctx)
        }

        // draw ctx
        print(gui.ctx)
        print(gui.mapCtx)
        this.marker.draw(gui.controlsCtx)

        this.bounds = {
            x: -this.size,
            y: -this.size,
            width: this.size * 2,
            height: this.size * 2
        }
    }
}

export default Level