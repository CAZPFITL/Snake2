class EventsMethods {
    app
    gui
    wheel = (event) => {
        {
            event.preventDefault()
            event.stopPropagation()
            const delta = Math.max(-this.app.gui.camera.rate, Math.min(this.app.gui.camera.rate, event.deltaY))

            if (event.ctrlKey) {
                let zoomLevel = this.app.gui.camera.zoom + Math.floor(delta)

                this.app.gui.camera.zoomTo(
                    (zoomLevel <= this.app.gui.camera.minZoom) ?
                        this.app.gui.camera.minZoom :
                        (zoomLevel >= this.app.gui.camera.maxZoom) ?
                            this.app.gui.camera.maxZoom :
                            zoomLevel
                )
            } else {
                if (event.shiftKey) {
                    this.app.gui.camera.moveTo([
                        this.app.gui.camera.lookAt[0] + Math.floor(delta),
                        this.app.gui.camera.lookAt[1]
                    ])
                } else {
                    this.app.gui.camera.moveTo([
                        this.app.gui.camera.lookAt[0],
                        this.app.gui.camera.lookAt[1] + Math.floor(delta),
                    ])
                }
            }
        }
    }

    mousemove = (event) => {
        const buttons = this.app.gui.buttonsCollection

        app.gui.hover((key) => {
            this.app.gui.elementHovered = key
            buttons[key].props.callbacks?.mousemove?.(event)
        }, (key) => {
            this.app.gui.elementHovered = null
        }, event)
    }

    mousedown = (event)=>{
        const buttons = this.app.gui.buttonsCollection

        Object.keys(buttons).forEach(key => {
            if (key === this.app.gui.elementHovered) {
                this.app.gui.buttonsStates[key] = 'click'
                buttons[key].props.callbacks?.mousemove?.(event)
            }
        })
    }

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