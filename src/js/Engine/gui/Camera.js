export default class Camera {
    app
    fieldOfView
    rate
    viewport
    maxZoom
    minZoom
    lookAt
    zoom
    constructor(app) {
        this.app = app
        this.init()
    }

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

    setProp(prop, value) {
        this[prop] = value
        return this
    }

    zoomTo(z) {
        this.zoom = z
        this.#updateViewportData()
    }

    moveTo([x, y]) {
        this.lookAt = [x, y]
        this.#updateViewportData()
    }

    #updateViewportData = (ctx = this.app.gui.ctx) => {
        this.aspectRatio = ctx.canvas.width / ctx.canvas.height
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

    #scaleAndTranslate(ctx = this.app.gui.ctx) {
        ctx.scale(this.viewport.scale[0], this.viewport.scale[1])
        ctx.translate(-this.viewport.left, -this.viewport.top)
    }

    controls(event) {
        {
            event.preventDefault()
            event.stopPropagation()
            const delta = Math.max(-this.rate, Math.min(this.rate, event.deltaY))

            if (event.ctrlKey) {
                let zoomLevel = this.zoom + Math.floor(delta)

                this.zoomTo(
                    (zoomLevel <= this.minZoom) ?
                        this.minZoom :
                        (zoomLevel >= this.maxZoom) ?
                            this.maxZoom :
                            zoomLevel
                )
            } else {
                if (event.shiftKey) {
                    this.moveTo([
                        this.lookAt[0] + Math.floor(delta),
                        this.lookAt[1]
                    ])
                } else {
                    this.moveTo([
                        this.lookAt[0],
                        this.lookAt[1] + Math.floor(delta),
                    ])
                }
            }
        }
    }

    begin = (ctx = this.app.gui.ctx, viewport = true) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth
        viewport && this.#updateViewportData(ctx)
        ctx.save()
        viewport && this.#scaleAndTranslate(ctx)
    }

    end = (ctx = this.app.gui.ctx) => {
        ctx.restore()
    }

    loop(handler) {
        this.begin(this.app.gui.ctx)
        this.begin(this.app.gui.windowCtx, false)
        handler()
        this.end(this.app.gui.ctx)
        this.end(this.app.gui.windowCtx, false)
    }
}
