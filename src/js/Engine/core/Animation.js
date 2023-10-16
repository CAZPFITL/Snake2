/**
 * Represents a class for managing the animation loop of the game application.
 */
class Animation {
    app; // Reference to the game application.
    request; // A reference to the animation frame request.

    constructor(app) {
        this.app = app;
        return this;
    }

    /**
     * The main animation loop function.
     */
    mainLoop = () => {
        const { gui, looper } = this.app
        gui.viewport.update({ ctx: gui.windowCtx, viewport: false }, () =>
            gui.viewport.update({ ctx: gui.ctx }, () => {
                // Loop through components in the game looper and call their update functions.
                looper.forEach(({ update }) => update?.(this.request));
                // Request the next animation frame and continue the loop.
                this.request = requestAnimationFrame(this.mainLoop);
            })
        )
    }
}

export default Animation