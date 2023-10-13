class Controls {
    forward = 0
    reverse = 0
    right = 0
    left = 0
    touchStartX = 0;
    touchStartY = 0;
    sensitivityThreshold = 100;

    /**
     * Create a new Controls instance to manage movement controls.
     *
     * @param {App} app - The application instance.
     * @param {Entity} entity - The entity for which controls are applied.
     */
    constructor(app) {
        this.app = app
        const props = Object.getOwnPropertyNames(this);
        const eventTypes = props.filter(prop => typeof this[prop] === 'function');
        eventTypes.forEach(eventType => {
            app.listeners.pushListener(eventType, this[eventType]);
        });
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

    touchstart = (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }

    touchmove = (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;

        if (Math.abs(deltaX) > this.sensitivityThreshold) {
            this.right = deltaX > 0 ? deltaX : 0;
            this.left = deltaX < 0 ? deltaX : 0;
        } else {
            this.right = 0;
            this.left = 0;
        }

        if (Math.abs(deltaY) > this.sensitivityThreshold) {
            this.reverse = deltaY > 0 ? deltaY : 0;
            this.forward = deltaY < 0 ? deltaY : 0;
        } else {
            this.reverse = 0;
            this.forward = 0;
        }
    }

    touchend = () => {
        // Reset all movement when the touch ends.
        this.forward = 0;
        this.reverse = 0;
        this.right = 0;
        this.left = 0;
    }
}

export default Controls