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
    loop = () => {
        this.app.gui.viewport.loop(() => {
            // Loop through components in the game looper and call their update functions.
            this.app.looper.forEach(({ update }) => update?.(this.request));

            // Request the next animation frame and continue the loop.
            this.request = requestAnimationFrame(this.loop);
        });
    }
}

export default Animation