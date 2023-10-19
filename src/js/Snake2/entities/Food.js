import { Tools } from './../dir/core.js'


/**
 * Represents a food item in the game.
 */
class Food {
    app
    radius = 4
    isSpecial = Tools.random(0, 1000, true) < 50
    color = this.isSpecial ? 'rgba(0,255,217,' : 'rgba(0,0,0,'
    value = this.isSpecial ? 10 : 1

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
    draw(ctx) {
        this.app.gui.get.circle({
            ctx,
            fill: this.color + '1)',
            ...this
        })
    }
}

export default Food