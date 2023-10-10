import ScreenObjects from "./ScreenObjects.js";
import Camera from './Camera.js';

export default class Gui extends ScreenObjects {
    app;
    ctx;
    camera;
    get = Gui;
    decorations = {};
    buttonsCollection = {};
    hoverCollection = {};
    buttonsStates = {};
    elementHovered = null;
    constructor(app) {
        super();
        this.app = app;
        this.ctx = Gui.createCanvas('gameCanvas');
        this.camera = new Camera(app);
        app.gui = this;
    }

    hover(isHover, isOut, event){
        app.gui.get.checkHoverCollection({
            collection: this.hoverCollection,
            event,
            viewport: this.camera.viewport,
            isHover,
            isOut,
            caller: this.elementHovered,
        });
    }

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
