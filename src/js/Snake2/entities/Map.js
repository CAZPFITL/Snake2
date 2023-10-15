import { Viewport } from './../dir/core.js'
class Map {
    constructor({ app, ctx }) {
        this.app = app
        this.ctx = ctx
        this.viewport = new Viewport({ app, fixedSize: { width: 200, height: 200 } })
    }

    update() {
        this.viewport.begin(this.ctx)
        this.app.level.draw(this.ctx)
        this.viewport.end(this.ctx)
    }
}

export default Map