import Tools from '../../Engine/core/Tools.js'

/**
 * Represents a food item in the game.
 */
class Food {
    radius = Tools.random(1, 5, true)
    isSpecial = Tools.random(0, 1000, true) < 50
    color = this.isSpecial ? '#00ffd9' : '#000000'
    /**
     * Create a new `Food` instance within the specified game level.
     *
     * @param {Object} options - An object containing game-related options.
     * @param {App} options.app - The application instance.
     * @param {Object} options.level - The game level properties, including bounds and border.
     */
    constructor({ app, level }) {
        const { bounds: { width, height }, border } = level
        this.app = app
        this.x = app.tools.random(-width / 2 + border * 2 + this.radius, width / 2 - border * 2 - this.radius)
        this.y = app.tools.random(-height / 2 + border * 2 + this.radius, height / 2 - border * 2 - this.radius)
    }

    /**
     * Draw the food item on the specified canvas context or the default GUI context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context.
     */
    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.circle(ctx, this)
    }

    /**
     * Update the food item by redrawing it.
     */
    update = () => {
        this.draw()
    }
}

export default Food