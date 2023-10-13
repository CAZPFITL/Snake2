class Controls {
    forward = 0
    reverse = 0
    right = 0
    left = 0
    touchStartX = 0;
    touchStartY = 0;

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
        function mapValue(value, inMin, inMax, outMin, outMax) {
            // Map value from the input range (inMin to inMax) to the output range (outMin to outMax)
            return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }

        const touch = event.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;

        alert(deltaX, deltaY);

        // Definir el rango deseado para el delta (entre 0 y 0.2)
        const minRange = 0;
        const maxRange = 0.2;

        // Mapear deltaX y deltaY al rango deseado sin sensitivityThreshold
        this.right = mapValue(deltaX, -Infinity, Infinity, minRange, maxRange);
        this.left = mapValue(deltaX, -Infinity, Infinity, minRange, maxRange);
        this.reverse = mapValue(deltaY, -Infinity, Infinity, minRange, maxRange);
        this.forward = mapValue(deltaY, -Infinity, Infinity, minRange, maxRange);
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