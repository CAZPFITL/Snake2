import Controls from './../../src/Controls.js'

class SnakePhysics {
    x
    y
    app
    head
    body
    radius
    acceleration = 0
    turnSpeed = 0
    speedParameters= {
        max: 2,
        min: 0.6
    }
    speed = 1
    angle = 0
    controls = new Controls(app)

    /**
     * Check if the snake collides with the game level's boundaries and set its alive state accordingly.
     */
    checkBoundCollision(){
        const { x, y, width, height } = this.app.level.bounds;
        const adjustment = this.radius / 2 + this.app.level.border / 2
        const check = (
            this.x < x + adjustment ||
            this.x > x + width - adjustment ||
            this.y < y + adjustment ||
            this.y > y + height - adjustment
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
        const precisionReliabilityTradeOff = this.radius * 2

        const line1 = [
            { x: this.x, y: this.y },
            {
                x: this.body[this.body?.[precisionReliabilityTradeOff] ? precisionReliabilityTradeOff : this.body.length - 1].x,
                y: this.body[this.body?.[precisionReliabilityTradeOff] ? precisionReliabilityTradeOff : this.body.length - 1].y
            }
        ]

        for (let i = precisionReliabilityTradeOff + 1; i < this.body.length - 1; i++) {
            if (this.body[i + precisionReliabilityTradeOff]) {
                const line2 = [ this.body[i], this.body[i + precisionReliabilityTradeOff] ]
                if (this.app.tools.segmentsIntersection(line1, line2)) {
                    this.alive = false
                }
            }
        }
    }

    updateData() {
        this.angle += this.turnSpeed
        this.angle %= 2 * Math.PI // Keep angle within a readable range
        this.speed += this.acceleration
        this.turnSpeed = this.controls.input.x / this.controls.sensibility
        this.acceleration = this.controls.input.y / this.controls.sensibility

        if (this.controls.input.y === 0) {
            this.speed = 1;
        } else {
            this.acceleration = this.controls.input.y / this.controls.sensibility;
        }

        if (this.speed > this.speedParameters.max) {
            this.speed = this.speedParameters.max;
        } else if (this.speed < this.speedParameters.min) {
            this.speed = this.speedParameters.min;
        }
    }

    updatePhysics = () => {
        this.updateData()
    }
}

export default  SnakePhysics