class SnakeControls {
    forward = 0
    reverse = 0
    right = 0
    left = 0
    constructor(app, entity) {
        this.app = app
        this.entity = entity
        this.app.listeners
            .pushListener('keydown', this.onKeyDown)
            .pushListener('keyup', this.onKeyUp)
    }

    onKeyUp = (event) => {
        event.stopPropagation()
        event.preventDefault()
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

    onKeyDown = (event) => {
        event.stopPropagation()
        event.preventDefault()
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

export default SnakeControls