import ScreenObjects from './core/ScreenObjects.js'
import Viewport from './core/Viewport.js'

/**
 * The Gui class handles the graphical user interface for the game.
 */
export default class Gui extends ScreenObjects {
    get = Gui
    app
    ctx
    controlsCtx
    viewport
    mapViewport
    decorations = {}
    buttonsCollection = {}
    hoverCollection = {}
    buttonsStates = {}
    elementHovered = null

    /**
     * Create a new Gui instance.
     *
     * @param {Object} app - The game application instance.
     */
    constructor(app) {
        super();
        this.app = app

        // context collection, individual declarations for easy access from outside
        this.ctx = this.get.createCanvas('gameCanvas')
        this.controlsCtx = this.get.createCanvas('windowCanvas')
        this.mapCtx = this.get.createCanvas('mapCanvas')

        // viewport collection, individual declarations for easy access from outside
        this.viewport = new Viewport({ app })
        this.mapViewport = new Viewport({ app, forceSize: { width: 100, height: 100 } })

        app.gui = this
    }

    /**
     * Update the GUI elements.
     */
    update = () => {
        // DECLARE COLLECTION
        if (!this?.decorations) return;

        const collection = Object.values(this.decorations?.[this.app.state] ?? {});

        // DRAW COLLECTION
        for (let i = 0; i < collection.length; i++) {
            const item = collection[i];
            this.get?.[item.type]?.(item.props);
        }

        // BUTTONS COLLECTION
        this.buttonsCollection = {};
        Object.entries(this?.decorations?.[this?.app?.state] ?? {}).forEach(([key, element]) =>
            element.type === 'button' && (this.buttonsCollection[key] = element))

        // HOVER EVENTS
        this.hoverCollection = {};
        Object.entries(this.buttonsCollection).forEach(key =>
            (this.hoverCollection[key[0]] = key[1].props));

        // CANVAS BACKGROUND
        (this.ctx.canvas.style.backgroundColor = this.decorations[this.app.state]?.stateBg);
        (this.mapCtx.canvas.style.backgroundColor = this.decorations[this.app.state]?.stateBg);
    };
}
