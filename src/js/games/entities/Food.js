class Food {
    radius = 1
    color = '#FF00FF'
    constructor({ app, bounds }) {
        this.app = app
        this.x = app.tools.random(-bounds.width / 2, bounds.width / 2)
        this.y = app.tools.random(-bounds.height / 2, bounds.height / 2)
    }

    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.circle(ctx, this)
    }

    update = () => {
        this.draw()
    }
}

export default Food