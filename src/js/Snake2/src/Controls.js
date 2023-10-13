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
        this.app.listeners
            .pushListener('keydown', this.onKeyDown)
            .pushListener('keyup', this.onKeyUp)
    }

    /**
     * Handle the keyup event to stop movement in a specific direction.
     *
     * @param {Event} event - The keyup event.
     */
    onKeyUp = (event) => {
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
    onKeyDown = (event) => {
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
}

export default Controls