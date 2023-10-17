class Controls {
    input = { x: 0, y: 0 }
    sensibility = 10
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    constructor({ app }) {
        this.app = app
        const props = Object.getOwnPropertyNames(this);
        const eventTypes = props.filter(prop => typeof this[prop] === 'function');
        eventTypes.forEach(eventType => {
            app.listeners.pushListener(eventType, this[eventType]);
        });
        // initialize update method
        if (this.isMobile) {
            this.xJoystick = new JoyStick('x-joystick')
            this.yJoystick = new JoyStick('y-joystick')
            this.app.looper.push(this)
        }
    }

    /**
     * Handle the keyup event to stop movement in a specific direction.
     *
     * @param {Event} event - The keyup event.
     */
    keyup = (event) => {
        event.stopPropagation()
        const { level, game, state } = this.app
        // event.preventDefault()
        // const isGameOver = level?.timer.value > 0 && !level?.player?.alive
        // if (isGameOver) game.setPlayState()

        switch (event.key) {
            case 'ArrowUp':
                this.input.y = 0
                break;
            case 'ArrowDown':
                this.input.y = 0
                break;
            case 'ArrowRight':
                this.input.x = 0
                break;
            case 'ArrowLeft':
                this.input.x = 0
                break;
            default:
                break;
        }
    }

    /**
     * Handle the keydown event to initiate movement in a specific direction.
     *
     * @param {Event} event - The keydown event.
     */
    keydown = (event) => {
        event.stopPropagation()
        // event.preventDefault()
        switch (event.key) {
            case 'ArrowUp':
                this.input.y = 1
                break;
            case 'ArrowDown':
                this.input.y = -1
                break;
            case 'ArrowRight':
                this.input.x = 1
                break;
            case 'ArrowLeft':
                this.input.x = -1
                break;
        }
    }

    update = () => {
        this.input = {
            x: this.xJoystick.GetX() / 100,
            y: this.yJoystick.GetY() / 100
        }
    }
}

export default Controls