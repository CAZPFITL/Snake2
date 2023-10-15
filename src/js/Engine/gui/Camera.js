/**
 * The Camera class manages the viewport and camera for the game.
 */
export default class Camera {
    app;
    fieldOfView;
    rate;
    viewport;
    maxZoom;
    minZoom;
    lookAt;
    zoom;

    /**
     * Create a new Camera instance.
     *
     * @param {Object} app - The game application instance.
     */
    constructor(app, props) {
        this.app = app
        this.init()
        this.fixedSize = this.fixedSize
    }

    /**
     * Initialize the camera with default values.
     */
    init() {
        this.fieldOfView = Math.PI / 4.0
        this.rate = 120
        this.viewport = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            scale: [1.0, 1.0]
        }
        this.maxZoom = 2000
        this.minZoom = 500
        this.lookAt = [0, 0]
        this.zoom = 1000
    }

    /**
     * Set a property of the camera.
     *
     * @param {string} prop - The name of the property to set.
     * @param {*} value - The value to set.
     * @returns {Camera} The Camera instance.
     */
    setProp(prop, value) {
        this[prop] = value
        return this
    }

    /**
     * Zoom the camera to a specified zoom level.
     *
     * @param {number} z - The zoom level to set.
     */
    zoomTo(z) {
        this.zoom = z
        this.#updateViewportData()
    }

    /**
     * Move the camera to a specified position.
     *
     * @param {Array} coordinates - The [x, y] coordinates to move the camera to.
     */
    moveTo([x, y]) {
        this.lookAt = [x, y]
        this.#updateViewportData()
    }

    /**
     * Update the camera's viewport data based on the current canvas context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context to use for calculations.
     */
    #updateViewportData = (ctx = this.app.gui.ctx) => {
        this.aspectRatio = this.fixedSize ?? ctx.canvas.width / ctx.canvas.height
        this.viewport.width = this.zoom * Math.tan(this.fieldOfView)
        this.viewport.height = this.viewport.width / this.aspectRatio

        this.viewport.left = this.lookAt[0] - (this.viewport.width / 2.0)
        this.viewport.top = this.lookAt[1] - (this.viewport.height / 2.0)
        this.viewport.right = this.viewport.left + this.viewport.width
        this.viewport.bottom = this.viewport.top + this.viewport.height
        this.viewport.scale = [
            ctx.canvas.width / this.viewport.width,
            ctx.canvas.height / this.viewport.height
        ]
    }

    /**
     * Scale and translate the canvas context based on the camera's viewport.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context to scale and translate.
     */
    #scaleAndTranslate(ctx = this.app.gui.ctx) {
        ctx.scale(this.viewport.scale[0], this.viewport.scale[1])
        ctx.translate(-this.viewport.left, -this.viewport.top)
    }

    /**
     * Begin camera operations, setting up the viewport and transformation.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to begin.
     * @param {boolean} [viewport=true] - Whether to update the viewport data.
     */
    begin = (ctx = this.app.gui.ctx, viewport = true) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth
        viewport && this.#updateViewportData(ctx)
        ctx.save()
        viewport && this.#scaleAndTranslate(ctx)
    }

    /**
     * End camera operations and restore the canvas state.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to end.
     */
    end = (ctx = this.app.gui.ctx) => {
        ctx.restore()
    }

    /**
     * Execute a rendering loop within the camera context.
     *
     * @param {function} handler - The rendering loop function to execute.
     */
    loop(handler) {
        this.begin(this.app.gui.ctx)
        this.begin(this.app.gui.windowCtx, false)
        handler()
        this.end(this.app.gui.ctx)
        this.end(this.app.gui.windowCtx, false)
    }
}
