import {COLORS} from './../env.js'
import EventsMethods from './EventsMethods.js'

export default class Screen extends EventsMethods {
    constructor(app) {
        super()
        this.app = app
        this.init(app)
    }

    init() {
        this.app.listeners
            .pushListener('mousemove', this.mousemove)
            .pushListener('mousedown', this.mousedown)
            .pushListener('mouseup', this.mouseup)
            .pushListener('wheel', this.wheel)

        this.app.gui.camera
            .setProp('maxZoom', 600)
            .setProp('minZoom', 200)
            .setProp('zoom', 200)
            .setProp('lookAt', [0, 0])
    }

    update(){
        const getButtonStates = (variant, key) => {
            let state = this.app.gui.elementHovered === key ? 'hover' : (this.app.gui.buttonsStates[key] ?? 'normal')

            state = this.app.gui.buttonsStates[key] === 'click' ? 'click' : state

            return ({
                bg: variant[state].bg,
                color: variant[state].color,
                stroke: variant[state].stroke,
            })
        }

        this.app.gui.decorations = {
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
                        x: window.innerWidth / 2 - 100,
                        y: window.innerHeight / 2,
                        width: 200,
                        height: 50,
                        ...getButtonStates({
                            normal: {
                                bg: COLORS.WHITE[0],
                                color: COLORS.BLACK[0],
                                stroke: COLORS.BLACK[0]
                            },
                            hover: {
                                bg: COLORS.WHITE[9],
                                color: COLORS.BLACK[0],
                                stroke: COLORS.BLACK[0]
                            },
                            click: {
                                bg: COLORS.BLACK[0],
                                color: COLORS.WHITE[0],
                                stroke: COLORS.WHITE[0]
                            }
                        }, 'startButton'),
                        center: true,
                        widthStroke: 1,
                        textPosition: { x: 5, y: 5 },
                        callbacks: {
                            mouseup: () => {
                                this.app.game.setPlayState()
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