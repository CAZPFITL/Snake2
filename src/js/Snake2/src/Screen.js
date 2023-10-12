import {COLORS} from './env.js'

export default class Screen {
    app
    gui

    constructor(app) {
        this.app = app
        this.gui = this.app.gui
        this.init(app)
    }

    mouseMove = (event) => {
        const buttons = this.gui.buttonsCollection

        const hoverTranslatedCoords = this.gui.get.viewportCoords({
            x: event.offsetX,
            y: event.offsetY
        }, this.gui.camera.viewport)

        app.gui.hover((key) => {
                this.gui.buttonsStates[key] !== 'click' && (this.gui.buttonsStates[key] = 'hover')
                this.gui.elementHovered = key
                this.gui.ctx.canvas.style.cursor = 'pointer'
                buttons[key].props.callbacks.mousemove?.(event, hoverTranslatedCoords)
            }, (key) => {
                this.gui.elementHovered = null
                this.gui.ctx.canvas.style.cursor = 'default'
            }, event)
    }

    mouseClick = (event, type)=>{
        const coords = this.gui.get.viewportCoords({
            x: event.offsetX,
            y: event.offsetY
        }, this.gui.camera.viewport)

        const buttons = this.gui.buttonsCollection

        Object.keys(buttons).forEach(key => {
            this.gui.get.isClicked(
                buttons[key].props,
                coords,
                () => {
                    this.gui.buttonsStates[key] = type === 'mousedown' ? 'click' : 'normal'
                    buttons[key].props.callbacks[type]?.(event)
                }
            )
        })
    }

    init(app) {
        this.app.listeners
            .pushListener('mousemove', this.mouseMove)
            .pushListener('mousedown', (event) => this.mouseClick(event, 'mousedown'))
            .pushListener('mouseup', (event) => this.mouseClick(event, 'mouseup'))
            .pushListener('wheel', (event) => this.app.gui.camera.controls(event))

        this.app.gui.camera
            .setProp('maxZoom', 600)
            .setProp('minZoom', 200)
            .setProp('zoom', 200)
            .setProp('lookAt', [0, 0])
    }

    update(){
        const ctx = this.gui.ctx

        this.gui.decorations = {
            LOAD_GAME: {
                stateBg: '#000000'
            },
            PLAY: {
                stateBg: '#000000',
                score: {
                    type: 'text',
                    props: {
                        ctx: this.app.gui.windowCtx,
                        font: '40px Mouse',
                        text: this.app?.level?.player?.length,
                        x: 30,
                        y: window.innerHeight - 20,
                        color: '#ffffff',
                        width: 0,
                        height: 0
                    }
                }
            }
        }
    }
}