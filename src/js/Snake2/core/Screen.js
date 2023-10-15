import { BUTTONS, EventsMethods } from './../dir/core.js'


/**
 * Represents a screen in the application, handling events and rendering components.
 */
export default class Screen extends EventsMethods {
    constructor(app) {
        super(app)
        this.app = app
        app.gui.viewport
            .setProp('maxZoom', 1000)
            .setProp('minZoom', 500)
            .setProp('zoom', 500)
            .setProp('lookAt', [0, 0])
    }

    /**
     * Get the button states for a given key and variant.
     *
     * @param {string} key - The key for the button.
     * @param {object} variant - The button variant configuration.
     * @returns {object} - The button state properties (bg, color, stroke).
     */
    getButtonStates(key, variant) {
        let state = this.app.gui.elementHovered === key ? 'hover' : (this.app.gui.buttonsStates[key] ?? 'normal')

        state = this.app.gui.buttonsStates[key] === 'click' ? 'click' : state

        return ({
            bg: variant[state].bg,
            color: variant[state].color,
            stroke: variant[state].stroke,
        })
    }

    /**
     * Update the screen components, including buttons, text, and other decorations.
     */
    update(){
        this.app.gui.decorations = {
            LOAD_ENGINE: {
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
                        y: window.innerHeight / 2 - 25,
                        width: 200,
                        height: 50,
                        ...this.getButtonStates('startButton', BUTTONS.normal),
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
                        font: '30px Mouse',
                        text: `score: ${this.app?.level?.player?.length}`,
                        x: window.innerWidth / 2 + 15,
                        y: window.innerHeight - 10,
                        color: '#ffcf5b'
                    }
                },
                speedBar: {
                    type: 'bar',
                    props: {
                        ctx: this.app.gui.windowCtx,
                        x: window.innerWidth / 2 - 175,
                        y: window.innerHeight - 20,
                        textProps: {
                            font: '12px Mouse',
                            text: 'speed',
                            color: '#ffcf5b'
                        },
                        height: 10,
                        fillColor: 'green',
                        stroke: 'black',
                        barColor: 'white',
                        cap: this.app?.level?.player?.speedParameters?.max * 80,
                        fill:  this.app?.level?.player?.speed * 80
                    }
                },
                timer: {
                    type: 'text',
                    props: {
                        ctx: this.app.gui.windowCtx,
                        font: '40px Mouse',
                        text: this.app?.level?.timer?.print('h:m:s'),
                        x: window.innerWidth / 2,
                        y: window.innerHeight - 900,
                        color: '#ffffff'
                    }
                },
                die: {
                    type: 'text',
                    props: {
                        ctx: this.app.gui.windowCtx,
                        font: '70px Mouse',
                        text: this.app?.level?.timer.value > 0 && !this.app?.level?.player?.alive ? 'GAME OVER' : '',
                        x: window.innerWidth / 2 - (String(this.app?.level?.player?.length).length * 10),
                        y: window.innerHeight - 450,
                        color: '#ffffff'
                    }
                }
            }
        }
    }
}