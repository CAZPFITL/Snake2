import {Food, Snake, Timer, Marker, Viewport} from './../dir/core.js'

/**
 * Represents a game level containing food, a snake, and a marker.
 */
class Level {
    app
    activeFood
    bounds = {
        x: -500,
        y: -500,
        width: 1000,
        height: 1000
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
        this.mapViewport = new Viewport({ app })
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

        // draw ctx
        this.draw(gui.ctx)
        this.player.draw(gui.ctx)
        this.activeFood.draw(gui.ctx)

        // draw windowCtx
        this.marker.draw(gui.windowCtx)

        // draw appCtx
        this.mapViewport.update({ ctx: gui.mapCtx, updateSize: false }, () => this.draw(gui.mapCtx))
    }
}

export default Level