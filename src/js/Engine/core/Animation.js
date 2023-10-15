/**
 * Represents a class for managing the animation loop of the game application.
 */
class Animation {
    app; // Reference to the game application.
    request; // A reference to the animation frame request.

    /**
     * Initializes the Animation class.
     *
     * @param {Object} app - The game application.
     */
    constructor(app) {
        this.app = app;
        return this;
    }

    /**
     * The main animation loop function.
     */
    mainLoop = () => {
        this.app.gui.viewport.begin(this.app.gui.ctx)
        this.app.gui.viewport.begin(this.app.gui.windowCtx, false)

        // Loop through components in the game looper and call their update functions.
        this.app.looper.forEach(({ update }) => update?.(this.request));

        // Request the next animation frame and continue the loop.
        this.request = requestAnimationFrame(this.mainLoop);

        this.app.gui.viewport.end(this.app.gui.ctx)
        this.app.gui.viewport.end(this.app.gui.windowCtx, false)
    }
}

export default Animation