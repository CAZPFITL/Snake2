import Controls from './../../src/Controls.js'

class SnakePhysics {
    acceleration = 0
    turnSpeed = 0.01
    speed = 0.5
    maxSpeed = 1
    minSpeed = 0.5
    angle = 0
    maxAngle = 0.2
    minAngle = -0.2
    controls = new Controls(app)

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
}

export default  SnakePhysics