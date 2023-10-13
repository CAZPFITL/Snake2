class Controls {
    forward = 0
    reverse = 0
    right = 0
    left = 0

    constructor(app) {
        this.app = app
        const props = Object.getOwnPropertyNames(this);
        const eventTypes = props.filter(prop => typeof this[prop] === 'function');
        eventTypes.forEach(eventType => {
            app.listeners.pushListener(eventType, this[eventType]);
        });
        // initialize update method
        if ('ontouchstart' in window) {
            this.joystick = new JoyStick('joystick')
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
        // event.preventDefault()
        switch (event.key) {
            case 'ArrowUp':
                this.forward = 0
                break;
            case 'ArrowDown':
                this.reverse = 0
                break;
            case 'ArrowRight':
                this.right = 0
                break;
            case 'ArrowLeft':
                this.left = 0
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
                this.forward = 1
                break;
            case 'ArrowDown':
                this.reverse = 1
                break;
            case 'ArrowRight':
                this.right = 1
                break;
            case 'ArrowLeft':
                this.left = 1
                break;
        }
    }

    update = () => {
        this.forward = this.joystick.GetY() > 20 ? 1 : 0
        this.reverse = this.joystick.GetY() < 0 ? 1 : 0
        this.right = this.joystick.GetX() > 20 ? this.joystick.GetX() / 100 : 0
        this.left = this.joystick.GetX() < 20 ? -this.joystick.GetX() / 100 : 0
    }
}

export default Controls