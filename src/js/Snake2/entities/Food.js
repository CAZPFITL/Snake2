import Tools from '../../Engine/core/Tools.js'

class Food {
    radius = Tools.random(1, 5, true)
    color = '#FF00FF'
    constructor({ app, level }) {
        const { bounds: { width, height }, border } = level
        this.app = app
        this.x = app.tools.random(-width / 2 + border * 2 + this.radius, width / 2 - border * 2 - this.radius)
        this.y = app.tools.random(-height / 2 + border * 2 + this.radius, height / 2 - border * 2 - this.radius)
    }

    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.circle(ctx, this)
    }

    update = () => {
        this.draw()
    }
}

export default Food