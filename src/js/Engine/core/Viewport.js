/**
 * The Camera class manages the viewport and viewport for the game.
 */
class Viewport {
    width = 0
    height = 0
    scale = [1.0, 1.0]
    maxZoom = 1000
    minZoom = 500
    lookAt = [0, 0]
    zoom = 1000
    app

    constructor({ app, forceSize = false }) {
        this.app = app
        this.forceSize = forceSize
    }

    updateCtx(ctx) {
        ctx.restore()
        ctx.save()
        ctx.canvas.height = this.forceSize ? this.forceSize.height : window.innerHeight
        ctx.canvas.width = this.forceSize ? this.forceSize.width : window.innerWidth
    }

    updateViewport = (ctx = this.app.gui.ctx) => {
        const fieldOfView = Math.PI / 4.0
        const aspectRatio = ctx.canvas.width / ctx.canvas.height

        this.width = this.zoom * Math.tan(fieldOfView)
        this.height = this.width / aspectRatio
        this.scale = [
            ctx.canvas.width / this.width,
            ctx.canvas.height / this.height
        ]
    }

    scaleAndTranslate(ctx) {
        ctx.scale(this.scale[0], this.scale[1])
        const x = this.lookAt[0] - (this.width / 2.0)
        const y = this.lookAt[1] - (this.height / 2.0)
        ctx.translate(-x, -y)
    }

    zoomTo(z) {
        this.zoom = z
        this.updateViewport()
    }

    moveTo([x, y]) {
        this.lookAt = [x, y]
        this.updateViewport()
    }

    followTo(target) {
        this.moveTo([
            target.x,
            target.y
        ])
    }

    update = (ctx, handler) => {
        this.updateCtx(ctx)
        this.updateViewport(ctx)
        this.scaleAndTranslate(ctx)
        handler()
    }
}

export default Viewport