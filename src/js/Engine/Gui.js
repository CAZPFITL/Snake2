import ScreenObjects from './core/ScreenObjects.js'
import Viewport from './core/Viewport.js'

/**
 * The Gui class handles the graphical user interface for the game.
 */
export default class Gui extends ScreenObjects {
    app;
    ctx;
    windowCtx;
    viewport;
    get = Gui;
    decorations = {};
    buttonsCollection = {};
    hoverCollection = {};
    buttonsStates = {};
    elementHovered = null;

    /**
     * Create a new Gui instance.
     *
     * @param {Object} app - The game application instance.
     */
    constructor(app) {
        super();
        this.app = app;
        this.ctx = Gui.createCanvas('gameCanvas');
        this.windowCtx = Gui.createCanvas('windowCanvas');
        this.viewport = new Viewport(app);
        app.gui = this;
    }

    /**
     * Handle hover events for GUI elements.
     *
     * @param {function} isHover - The callback function when an element is hovered.
     * @param {function} isOut - The callback function when an element is no longer hovered.
     * @param {Event} event - The hover event.
     */
    hover(isHover, isOut, event){
        app.gui.get.checkHoverCollection({
            collection: this.hoverCollection,
            event,
            viewport: this.viewport,
            isHover,
            isOut,
            caller: this.elementHovered,
        });
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
    };
}
