import Food from './Food.js'
import Snake from './SnakeObject/Snake.js'
import Marker from "./Marker.js";

/**
 * Represents a game level containing food, a snake, and a marker.
 */
class Level {
    app
    activeFood
    bounds = {
        x: -500,
        y: -500,
        width: 1000,
        height: 1000
    }
    border = 10
    variable =1234234

    /**
     * Create a new `Level` instance within the specified application.
     *
     * @param {Object} options - An object containing game-related options.
     * @param {App} options.app - The application instance.
     */
    constructor({ app }) {
        this.app = app
        this.init(app)
        this.timerInterval = null;
        this.totalTime = 0;
    }

    /**
     * Initialize the game level by creating food, a snake, and a marker.
     *
     * @param {App} app - The application instance.
     */
    init(app) {
        this.activeFood = new Food({ app, level: this })
        this.player = new Snake({ app, id: 1 })
        this.marker = new Marker({ app })
    }

    /**
     * Draw the game level on the specified canvas context or the default GUI context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context.
     */
    draw(ctx = this.app.gui.ctx) {
        this.app.gui.get.square({
            ctx,
            color: '#b7b7b7',
            stroke: '#4f0069',
            widthStroke: this.border,
            center: true,
            ...this.bounds
        })
        this.timer()
    }

    /**
     * Generate a new food item within the game level.
     */
    newFood() {
        this.activeFood = new Food({ app: this.app, level: this })
    }

    timer(){
        let seconds = 0

        if (this.timerInterval === null) {
            this.timerInterval = setInterval(() => {
                if (this.player.alive === true) {
                    seconds++;

                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const SecondsLeft = seconds % 60;

                    const Hours = hours.toString().padStart(2, '0');
                    const Minutes = minutes.toString().padStart(2, '0');
                    const Seconds = SecondsLeft.toString().padStart(2, '0');

                    this.totalTime = `${Hours}:${Minutes}:${Seconds}`;
                } else {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                }
            }, 1000);
        }
    }

    /**
     * Update the game level, including drawing, updating food, the snake, and the marker.
     */
    update = () => {
        this.draw()
        this.activeFood.update()
        this.player.update()
        this.marker.update()
    }
}

export default Level