class Controls {
    forward = 0
    reverse = 0
    right = 0
    left = 0

    /**
     * Create a new Controls instance to manage movement controls.
     *
     * @param {App} app - The application instance.
     * @param {Entity} entity - The entity for which controls are applied.
     */
    constructor(app, entity) {
        this.app = app
        this.entity = entity
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

        // Implement your logic for movement based on deltaX and deltaY.
        // You can use thresholds or other conditions to determine the direction.

        // Example logic:
        if (deltaX > 10) {
            this.right = 1;
            this.left = 0;
        } else if (deltaX < -10) {
            this.left = 1;
            this.right = 0;
        } else {
            this.right = 0;
            this.left = 0;
        }

        if (deltaY > 10) {
            this.reverse = 1;
            this.forward = 0;
        } else if (deltaY < -10) {
            this.forward = 1;
            this.reverse = 0;
        } else {
            this.forward = 0;
            this.reverse = 0;
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