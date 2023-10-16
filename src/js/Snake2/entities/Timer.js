class Timer {
    value
    interval
    constructor({app, initValue = 0}){
        this.app = app
        this.value = initValue
        this.init()
    }

    init() {
        this.interval = setInterval(() => {
            this.value++
            if (!this.app.level.player.alive) {
                clearInterval(this.interval)
                this.interval = null
            }
        }, 1000)
    }

    print(format = 'h:m:s') {
        let minutes = Math.floor(this.value / 60)
        let hours = Math.floor(minutes / 60)
        let seconds = this.value % 60

        hours = hours.toString().padStart(2, '0')
        minutes = minutes.toString().padStart(2, '0')
        seconds = seconds.toString().padStart(2, '0')

        const output = format.match(/[h|m|s]/g)
            .map((element)=>
                element === 'h' ? hours : element === 'm'
                    ? minutes : element === 's'
                        ? seconds : 'x')

        return output.join(':');
    }
}

export default Timer