class Speedometer {
    x = window.innerWidth / 2 - 100
    y = window.innerHeight - 20
    text = 'speed'
    height = 10
    fillColor = 'green'
    stroke = 'black'
    barColor = 'white'
    cap
    fill

    constructor({ app }) {
        this.app = app
        this.ctx = this.app.gui.windowCtx
    }

    draw = () => {
        this.cap = this.app.level.player.speedParameters?.max * 80
        this.fill =  this.app.level.player.speed * 80
        this.app.gui.get.bar(this)
    }

    update = () => {
        this.draw()
    }
}

export default Speedometer