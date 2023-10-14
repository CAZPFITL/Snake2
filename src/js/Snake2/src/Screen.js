import {BUTTONS} from './../env.js'
import EventsMethods from './EventsMethods.js'

/**
 * Represents a screen in the application, handling events and rendering components.
 */
export default class Screen extends EventsMethods {
    constructor(app) {
        super(app)
        this.app = app
        app.gui.camera
            .setProp('maxZoom', 2000)
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