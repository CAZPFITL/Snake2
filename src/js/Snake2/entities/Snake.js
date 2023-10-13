import SnakeControls from "../src/Controls.js";

/**
 * Represents a snake entity in the game.
 */
class Snake {
    id = 0
    head = {x: 0, y: 0}
    body = [{x: 0, y: 0}]
    width = 1
    length = 2
    acceleration = 0.02
    maxSpeed = 0.65
    normalSpeed = 0.5
    minSpeed = 0.35
    turnSpeed = 0.1
    speed = 0.5
    angle = 0
    alive = true

    /**
     * Create a new `Snake` instance associated with the provided application and optional ID.
     *
     * @param {Object} options - An object containing game-related options.
     * @param {App} options.app - The application instance.
     * @param {number} [options.id=0] - The unique identifier for the snake.
     */
    constructor({ app, id = 0 }) {
        this.app = app
        this.id = id
        this.controls = new SnakeControls(app, this)
    }

    /**
     * Check if the snake collides with the game level's boundaries and set its alive state accordingly.
     */
    checkBoundCollision(){
        const { x, y, width, height } = this.app.level.bounds;
        const adjustment = this.width / 2 + this.app.level.border / 2
        const check = (
            this.head.x < x + adjustment ||
            this.head.x > x + width - adjustment ||
            this.head.y < y + adjustment ||
            this.head.y > y + height - adjustment
        )

        this.alive = !check;
    }

    /**
     * Check if the snake collides with itself, and set its alive state accordingly.
     */
    checkSelfCollision() {
        /**
         * The 'precisionReliabilityTradeOff' variable represents the balance between precision and reliability.
         * A higher value favors reliability at the cost of precision, while a lower value prioritizes precision
         * but may decrease reliability. Adjust this value according to your specific requirements.
         * It is recommended not to use values lower than 4.
         */
        const precisionReliabilityTradeOff = 4

        const line1 = [
            { x: this.head.x, y: this.head.y },
            {
                x: this.body[this.body?.[precisionReliabilityTradeOff] ? precisionReliabilityTradeOff : this.body.length - 1].x,
                y: this.body[this.body?.[precisionReliabilityTradeOff] ? precisionReliabilityTradeOff : this.body.length - 1].y
            }
        ]

        for (let i = precisionReliabilityTradeOff + 1; i < this.body.length - 1; i++) {
            if (this.body[i + precisionReliabilityTradeOff]) {
                const line2 = [ this.body[i], this.body[i + precisionReliabilityTradeOff] ]
                if (this.app.tools.segmentsIntersection(line1, line2)) {
                    console.log({line1, line2})
                    this.alive = false
                }
            }
        }
    }

    /**
     * Update the snake's angle based on user controls for turning left and right.
     */
    updateAngle() {
        if (this.controls.left === 1 || this.controls.right === 1) {
            this.angle += (this.controls.left === 1 ? -1 : 1) * this.turnSpeed;
        }

        // Keep angle within a readable range
        this.angle %= 2 * Math.PI;
    }

    /**
     * Update the snake's speed based on user controls for accelerating and reversing.
     */
    updateSpeed() {
        if (this.controls.forward === 1) {
            if (this.controls.reverse === 0 && this.speed <= this.maxSpeed) {
                this.speed += this.acceleration;
            }
        } else if (this.controls.reverse === 1) {
            if (this.speed >= this.minSpeed) {
                this.speed -= this.acceleration;
            }
        } else {
            this.speed += this.speed > this.normalSpeed ? -this.acceleration : this.acceleration ?? 0;
        }
    }

    /**
     * Update the snake's body length when it consumes food items.
     */
    updateBodyLength() {
        const distanceToFood = this.app.tools.calculateDistance(this.head, this.app.level.activeFood)
        const minimumDistanceToEat = this.app.level.activeFood.radius + ( this.width / 2 )

        if (distanceToFood < minimumDistanceToEat) {
            const foodMultiplier = this.app.level.activeFood.isSpecial ? 20 : 1
            const foodValue = this.app.level.activeFood.radius * foodMultiplier
            this.length += (foodValue * this.app.level.multiplier)
            this.app.level.newFood()
        }
    }

    /**
     * Update the snake's position based on its current speed and angle.
     */
    updatePosition() {
        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle)
            const velocityY = this.speed * Math.sin(this.angle)
            const newHeadX = this.head.x + velocityX
            const newHeadY = this.head.y + velocityY

            this.head = { x: newHeadX, y: newHeadY }

            if (this.app.tools.calculateDistance(this.head, this.body[0]) > this.width) {
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
        this.app.gui.get.path({
            ctx,
            collection: [this.head, ...this.body],
            color: 'rgb(255, 0, 255)',
            width: this.width,
            lineCap: 'round',
            scale: 1
        }, true)
    }

    /**
     * Update the snake by executing speed, position, angle, body length, bound collision, and self-collision checks.
     */
    update = () => {
        if (this.alive) {
            this.updateSpeed()
            this.updatePosition()
            this.updateAngle()
            this.updateBodyLength()
            this.checkBoundCollision()
            this.checkSelfCollision()
            this.app.game.follow()
        }
        this.draw()
    }
}

export default Snake