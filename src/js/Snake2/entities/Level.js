import { Food, Snake, Timer, Marker, Map } from './../dir/core.js'

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
    border = 10

    /**
     * Create a new `Level` instance within the specified application.
     *
     * @param {Object} options - An object containing game-related options.
     * @param {App} options.app - The application instance.
     */
    constructor({ app }) {
        this.app = app
        this.init(app)
    }

    /**
     * Initialize the game level by creating food, a snake, and a marker.
     *
     * @param {App} app - The application instance.
     */
    init = (app) => {
        this.activeFood = new Food({ app, level: this })
        this.player = new Snake({ app })
        this.marker = new Marker({ app })
        this.timer = new Timer({ app })
        this.map = new Map({ app })
    }

    /**
     * Draw the game level on the specified canvas context or the default GUI context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context.
     */
    draw(ctx = this.app.gui.ctx) {
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
        this.draw()
        this.activeFood.update()
        this.player.update()
        this.marker.update()
        this.map.update()
    }
}

export default Level