import SnakePhysics from './SnakePhysics.js'
import Controls from '../../src/Controls.js'
import Tools from '../../../Engine/core/Tools.js'
/**
 * Represents a snake entity in the game.
 */
class Snake extends SnakePhysics {
    color = `rgb(${Tools.random(0,255,true)},${Tools.random(0,255,true)},${Tools.random(0,255,true)})`
    id = 0
    head = {x: 0, y: 0}
    body = [{x: 0, y: 0}]
    radius = 4
    length = 10
    alive = true
    /**
     * Create a new `Snake` instance associated with the provided application and optional ID.
     *
     * @param {Object} options - An object containing game-related options.
     * @param {App} options.app - The application instance.
     * @param {number} [options.id=0] - The unique identifier for the snake.
     */
    constructor({ app, id = 0 }) {
        super()
        this.app = app
        this.id = id
    }

    /**
     * Update the snake's body length when it consumes food items.
     */
    eat(level = this.app.level) {
        const distanceToFood = this.app.tools.calculateDistance(this.head, level.activeFood)
        const minimumDistanceToEat = level.activeFood.radius + ( this.radius / 2 )

        if (distanceToFood < minimumDistanceToEat) {
            this.length += level.activeFood.value
            level.newFood()
        }
    }

    /**
     * Update the snake's position based on its current speed and angle.
     */
    move() {
        this.angle += this.turnSpeed

        // Keep angle within a readable range
        this.angle %= 2 * Math.PI;

        this.speed += this.acceleration

        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle)
            const velocityY = this.speed * Math.sin(this.angle)
            const newHeadX = this.head.x + velocityX
            const newHeadY = this.head.y + velocityY

            this.head = { x: newHeadX, y: newHeadY }

            // Update body
            if (this.app.tools.calculateDistance(this.head, this.body[0]) > this.radius) {
                this.body = [this.head, ...this.body]

                if (this.body.length > this.length) {
                    this.body.pop()
                }
            }
        }
    }

    /**
     * Draw the snake on the canvas context.
     *
     * @param {CanvasRenderingContext2D} [ctx=this.app.gui.ctx] - The canvas rendering context.
     */
    draw = (ctx = this.app.gui.ctx) => {
        const appGui = this.app.gui.get
        const lineWidth = this.radius * 2
        const lineCap = 'round'
        const scale = 1
        const opts = { ctx, width: lineWidth, lineCap, scale }
        appGui.path({ collection: [this.head, ...this.body], color: this.color, ...opts }, true)
        appGui.path({ collection: [this.head], color: '#000000', ...opts }, true)

    }

    /**
     * Update the snake by executing speed, position, angle, body length, bound collision, and self-collision checks.
     */
    update = () => {
        if (this.alive) {
            this.move()
            this.eat()
            this.checkBoundCollision()
            this.checkSelfCollision()
            this.app.game.follow()
        }
        this.draw()
    }
}

export default Snake