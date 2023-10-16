/**
 * The Camera class manages the viewport and viewport for the game.
 */
class Viewport {
    fieldOfView = Math.PI / 4.0
    rate = 120
    left = 0
    right = 0
    top = 0
    bottom = 0
    width = 0
    height = 0
    scale = [1.0, 1.0]
    maxZoom = 2000
    minZoom = 500
    lookAt = [0, 0]
    zoom = 1000
    app

    constructor({ app}) {
        this.app = app
    }

    /**
     * Set a property of the viewport.
     *
     * @param {string} prop - The name of the property to set.
     * @param {*} value - The value to set.
     * @returns {Viewport} The Camera instance.
     */
    setProp(prop, value) {
        this[prop] = value
        return this
    }

    /**
     * Zoom the viewport to a specified zoom level.
     *
     * @param {number} z - The zoom level to set.
     */
    zoomTo(z) {
        this.zoom = z
        this.#updateViewportData()
    }

    /**
     * Move the viewport to a specified position.
     *
     * @param {Array} coordinates - The [x, y] coordinates to move the viewport to.
     */
    moveTo([x, y]) {
        this.lookAt = [x, y]
        this.#updateViewportData()
    }

    /**
     * Update the viewport's viewport data based on the current canvas context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context to use for calculations.
     */
    #updateViewportData = (ctx = this.app.gui.ctx) => {
        this.aspectRatio = ctx.canvas.width / ctx.canvas.height
        this.width = this.zoom * Math.tan(this.fieldOfView)
        this.height = this.width / this.aspectRatio

        this.left = this.lookAt[0] - (this.width / 2.0)
        this.top = this.lookAt[1] - (this.height / 2.0)
        this.right = this.left + this.width
        this.bottom = this.top + this.height
        this.scale = [
                ctx.canvas.width / this.width,
                ctx.canvas.height / this.height
            ]
    }

    /**
     * Scale and translate the canvas context based on the viewport's viewport.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context to scale and translate.
     */
    #scaleAndTranslate(ctx = this.app.gui.ctx) {
        ctx.scale(this.scale[0], this.scale[1])
        ctx.translate(-this.left, -this.top)
    }

    /**
     * Begin viewport operations, setting up the viewport and transformation.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to begin.
     * @param {boolean} [viewport=true] - Whether to update the viewport data.
     * @param updateSize
     */
    begin = ({ctx , viewport = true, keepSize = false}) => {
        ctx.canvas.height = keepSize ? ctx.canvas.height : window.innerHeight
        ctx.canvas.width = keepSize ? ctx.canvas.width : window.innerWidth
        viewport && this.#updateViewportData(ctx)
        viewport && this.#scaleAndTranslate(ctx)
        ctx.save()
    }

    /**
     * End viewport operations and restore the canvas state.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to end.
     */
    end = (ctx) => {
        ctx.restore()
    }

    follow(target) {
        this.moveTo([
            target.x,
            target.y
        ])
    }

    update = (props, handler) => {
        this.begin(props)
        handler()
        this.end(props.ctx)
    }
}

export default Viewport