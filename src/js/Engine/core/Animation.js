/**
 * Represents a class for managing the animation loop of the game application.
 */
class Animation {
    app; // Reference to the game application.
    request; // A reference to the animation frame request.

    constructor(app) {this.app = app;
        return this;
    }

    /**
     * The main animation loop function.
     */
    mainLoop = () => {
        const { gui, looper } = this.app

        // viewport and map viewport run the same handler to make only one calculation
        gui.viewport.update(gui.ctx, () => {
            gui.mapViewport.update(gui.mapCtx, () => {
                // updates the controls/stats ctx, as handler from main viewport this only requires a simple update
                gui.viewport.updateCtx( gui.controlsCtx )
                // Loop through components in the game looper and call their update functions.
                looper.forEach(({ update }) => update?.(this.request));
                // Request the next animation frame and continue the loop.
                this.request = requestAnimationFrame(this.mainLoop);
            })
        })
    }
}

export default Animation