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
                const ctx = this.gui.decorations[this.app.state][key].props.ctx
                this.gui.elementHovered = key
                ctx.canvas.style.cursor = 'pointer'
                // buttons[key].props.callbacks.mousemove?.(event, hoverTranslatedCoords)
            }, (key) => {
                const ctx = this.gui.decorations[this.app.state][key].props.ctx
                this.gui.elementHovered = null
                ctx.canvas.style.cursor = 'default'
            }, event)
    }

    mouseClick = (event, type)=>{
        const buttons = this.gui.buttonsCollection

        Object.keys(buttons).forEach(key => {
            if (key === this.gui.elementHovered) {
                if (type === 'mousedown') {
                    this.gui.buttonsStates[key] = 'click'
                }
                buttons[key].props.callbacks[type]?.(event)
            }

            if (type !== 'mousedown') {
                this.gui.buttonsStates[key] = 'normal'
            }
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
            MENU_MAIN: {
                stateBg: '#ffb3fc',
                startButton: {
                    type: 'button',
                    props: {
                        ctx: this.app.gui.windowCtx,
                        font: '30px Mouse',
                        text: 'START',
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        width: 200,
                        height: 50,
                        bg: this.gui.elementHovered === 'startButton' ? COLORS.WHITE[9]
                            : this.gui.buttonsStates.startButton === 'click' ? COLORS.BLACK[0]
                                : COLORS.WHITE[0],
                        color: this.gui.buttonsStates.startButton === 'click' ? COLORS.WHITE[0] : COLORS.BLACK[0],
                        stroke: this.gui.buttonsStates.startButton === 'click' ? COLORS.WHITE[0] : COLORS.BLACK[0],
                        center: true,
                        widthStroke: 1,
                        textPosition: { x: 5, y: 5 },
                        callbacks: {
                            click: () => {
                                console.log(1111111)
                                // this.app.setState('PLAY');
                            }
                        }
                    }
                }
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