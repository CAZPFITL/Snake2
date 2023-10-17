import { BUTTONS, EventsMethods } from './../dir/core.js'


/**
 * Represents a screen in the application, handling events and rendering components.
 */
export default class Screen extends EventsMethods {
    constructor({ app }) {
        super(app)
        this.app = app

        app.gui.mapViewport.maxZoom = 9999
        app.gui.mapViewport.minZoom = 0
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
        app.gui.mapViewport.zoom = this?.app?.level?.size * 2
        const { gui, game, level } = this.app
        const isGameOver = level?.timer.value > 0 && !level?.player?.alive

        gui.decorations = {
            LOAD_ENGINE: {
                stateBg: '#000000'
            },
            MAIN_MENU: {
                stateBg: '#ffb3fc',
                startButton: {
                    type: 'button',
                    props: {
                        ctx: gui.controlsCtx,
                        font: '30px Mouse',
                        text: 'START',
                        x: window.innerWidth / 2 - 100,
                        y: window.innerHeight / 2 - 25,
                        width: 200,
                        height: 50,
                        ...this.getButtonStates('startButton', BUTTONS.normal),
                        widthStroke: 1,
                        textPosition: { x: 2, y: 10 },
                        callbacks: {
                            mouseup: () => {
                                game.setPlayState()
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
                        ctx: gui.controlsCtx,
                        font: '30px Mouse',
                        text: `score: ${level?.player?.length}`,
                        x: window.innerWidth / 2 + 15,
                        y: window.innerHeight - 10,
                        color: '#ffffff'
                    }
                },
                speedBar: {
                    type: 'bar',
                    props: {
                        ctx: gui.controlsCtx,
                        x: window.innerWidth / 2 - 175,
                        y: window.innerHeight - 20,
                        textProps: {
                            font: '12px Mouse',
                            text: 'speed',
                            color: '#ffffff'
                        },
                        height: 10,
                        fillColor: 'green',
                        stroke: 'black',
                        barColor: 'white',
                        cap: level?.player?.speedParameters?.max * 80,
                        fill:  level?.player?.speed * 80
                    }
                },
                timer: {
                    type: 'text',
                    props: {
                        ctx: gui.controlsCtx,
                        font: '40px Mouse',
                        text: level?.timer?.getTime('h:m:s:x'),
                        x: window.innerWidth / 2 - gui.controlsCtx.measureText(level?.timer?.getTime('h:m:s')).width / 1.2,
                        y: 50,
                        color: '#ffffff'
                    }
                },
                // GAME OVER STUFF, not having two states to keep all in PLAY
                ...isGameOver ? {
                    gameOver: {
                        type: 'text',
                        props: {
                            ctx: gui.controlsCtx,
                            font: '70px Mouse',
                            text: 'GAME OVER',
                            x: window.innerWidth / 2 - gui.controlsCtx.measureText('GAME OVER').width - 10,
                            y: window.innerHeight / 2 - 35,
                            color: '#ffffff'
                        }
                    },
                    restartButton: {
                        type: 'button',
                        props: {
                            ctx: gui.controlsCtx,
                            font: '30px Mouse',
                            text: 'RESTART',
                            x: window.innerWidth / 2 - 100,
                            y: window.innerHeight / 2,
                            width: 200,
                            height: 50,
                            ...this.getButtonStates('restartButton', BUTTONS.normal),
                            widthStroke: 1,
                            textPosition: { x: 4, y: 10 },
                            callbacks: {
                                mouseup: () => {
                                    game.setPlayState()
                                }
                            }
                        }
                    }
                } : {}
            }
        }
    }
}