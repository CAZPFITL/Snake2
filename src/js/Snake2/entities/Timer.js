class Timer {
    value
    interval
    constructor({ app, initValue = 0 }) {
        this.app = app
        this.value = initValue
        this.init()
    }

    init() {
        this.interval = setInterval(() => {
            this.value += 0.01
            if (!this.app.level.player.alive) {
                clearInterval(this.interval)
                this.interval = null
            }
        }, 10)
    }

    getTime(format = 'h:m:s:x') {
        const totalCentiseconds = Math.floor(this.value * 100)
        const hours = Math.floor(totalCentiseconds / 360000)
        const minutes = Math.floor((totalCentiseconds % 360000) / 6000)
        const seconds = Math.floor((totalCentiseconds % 6000) / 100)
        const centiseconds = totalCentiseconds % 100

        const output = format
            .replace('h', hours.toString().padStart(2, '0'))
            .replace('m', minutes.toString().padStart(2, '0'))
            .replace('s', seconds.toString().padStart(2, '0'))
            .replace('x', centiseconds.toString().padStart(3, '0'))

        return output
    }
}

export default Timer
