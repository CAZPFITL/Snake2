import { Viewport } from './../dir/core.js'
class Map {
    constructor({ app, height = 100, width = 100, ...props }) {
        this.app = app
        this.width = width
        this.height = height
        this.viewport = new Viewport({ app, fixedSize: { width, height } })
        this.init()
    }

    init() {
        console.log('new map created')
    }

    update() {
        this.viewport.begin(this.app.gui.mapCtx)
        console.log('maploop')
        this.viewport.end()
    }
}

export default Map