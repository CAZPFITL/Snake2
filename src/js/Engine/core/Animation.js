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
        app.animation = this; // Register the animation object with the game application.
        return this;
    }

    /**
     * Starts the animation loop with the initial state.
     *
     * @param {string} firstState - The initial state to start the animation with.
     */
    start(firstState) {
        this.loop(); // Start the animation loop.
        this.app.setState(firstState); // Set the initial state of the application.
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