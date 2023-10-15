class EventsMethods {
    app
    gui

    constructor({ listeners }) {
        const props = Object.getOwnPropertyNames(this);
        const eventTypes = props.filter(prop => typeof this[prop] === 'function');
        eventTypes.forEach(eventType => {
            listeners.pushListener(eventType, this[eventType]);
        });
    }

    /**
     * Handle the mouse wheel event to zoom or pan the viewport.
     *
     * @param {Event} event - The mouse wheel event.
     */
    wheel = (event) => {
        {
            event.preventDefault()
            event.stopPropagation()
            const delta = Math.max(-this.app.gui.viewport.rate, Math.min(this.app.gui.viewport.rate, event.deltaY))

            if (event.ctrlKey) {
                let zoomLevel = this.app.gui.viewport.zoom + Math.floor(delta)

                this.app.gui.viewport.zoomTo(
                    (zoomLevel <= this.app.gui.viewport.minZoom) ?
                        this.app.gui.viewport.minZoom :
                        (zoomLevel >= this.app.gui.viewport.maxZoom) ?
                            this.app.gui.viewport.maxZoom :
                            zoomLevel
                )
            } else {
                if (event.shiftKey) {
                    this.app.gui.viewport.moveTo([
                        this.app.gui.viewport.lookAt[0] + Math.floor(delta),
                        this.app.gui.viewport.lookAt[1]
                    ])
                } else {
                    this.app.gui.viewport.moveTo([
                        this.app.gui.viewport.lookAt[0],
                        this.app.gui.viewport.lookAt[1] + Math.floor(delta),
                    ])
                }
            }
        }
    }

    /**
     * Handle the mousemove event to track the position of the cursor.
     *
     * @param {Event} event - The mousemove event.
     */
    mousemove = (event) => {
        const buttons = this.app.gui.buttonsCollection

        app.gui.hover((key) => {
            this.app.gui.elementHovered = key
            buttons[key].props.callbacks?.mousemove?.(event)
        }, (key) => {
            this.app.gui.elementHovered = null
        }, event)
    }

    /**
     * Handle the mousedown event when a mouse button is pressed.
     *
     * @param {Event} event - The mousedown event.
     */
    mousedown = (event)=>{
        const buttons = this.app.gui.buttonsCollection

        Object.keys(buttons).forEach(key => {
            if (key === this.app.gui.elementHovered) {
                this.app.gui.buttonsStates[key] = 'click'
                buttons[key].props.callbacks?.mousedown?.(event)
            }
        })
    }


    /**
     * Handle the mouseup event when a mouse button is released.
     *
     * @param {Event} event - The mouseup event.
     */
    mouseup = (event)=>{
        const buttons = this.app.gui.buttonsCollection

        Object.keys(buttons).forEach(key => {
            if (key === this.app.gui.elementHovered) {
                buttons[key].props.callbacks?.mouseup?.(event)
            }

            this.app.gui.buttonsStates[key] = 'normal'
        })
    }
}

export default EventsMethods