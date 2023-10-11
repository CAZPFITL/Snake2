import SnakeControls from "./SnakeControls.js";

class SnakeObject {
    DISTANCE_THRESHOLD = 2
    id = 0
    head = {x: 0, y: 0}
    body = [
        {x: 0, y: 0},
        {x: 0, y: 0}
    ]
    width = 2
    length = 2
    friction= 0.01
    acceleration = 0.02
    maxSpeed = 0.7
    normalSpeed = 0.5
    minSpeed = 0.3
    turnSpeed = 0.08
    speed = 0.5
    angle = 0
    alive = true

    constructor({ app, id = 0 }) {
        this.app = app
        this.id = id
        this.controls = new SnakeControls(app, this)
    }

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

    checkSelfCollision() {
        const line1 = [
            { x: this.head.x, y: this.head.y },
            {
                x: this.body[0].x,
                y: this.body[0].y
            }
        ]

        for (let i = 1; i < this.body.length - 1; i++) {
            const line2 = [ this.body[i], this.body[i + 1] ]
            if (this.app.tools.segmentsIntersection(line1, line2)) {
                console.log({line1, line2})
                this.alive = false
            }
        }
    }

    updateAngle() {
        if (this.controls.left === 1 || this.controls.right === 1) {
            this.angle += (this.controls.left === 1 ? -1 : 1) * this.turnSpeed;
        }

        // Keep angle within a readable range
        this.angle %= 2 * Math.PI;
    }

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
            this.speed += this.speed > this.normalSpeed ? -this.friction : this.friction ?? 0;
        }
    }

    updateBodyLength() {
        const distanceToFood = this.app.tools.calculateDistance(this.head, this.app.level.activeFood)
        const minimumDistanceToEat = this.app.level.activeFood.radius + ( this.width / 2 )

        if (distanceToFood < minimumDistanceToEat) {
            this.length += (this.app.level.activeFood.radius * 2)
            this.app.level.newFood()
        }
    }

    updatePosition() {
        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle)
            const velocityY = this.speed * Math.sin(this.angle)
            const newHeadX = this.head.x + velocityX
            const newHeadY = this.head.y + velocityY

            this.head = { x: newHeadX, y: newHeadY }

            if (this.app.tools.calculateDistance(this.head, this.body[0]) > this.DISTANCE_THRESHOLD) {
                this.body = [this.head, ...this.body]

                if (this.body.length > this.length) {
                    this.body.pop()
                }
            }
        }
    }

    draw = (ctx = this.app.gui.ctx) => {
        this.app.gui.get.path({
            ctx,
            collection: [this.head, ...this.body],
            color: 'rgb(255, 0, 255)',
            width: 2,
            lineCap: 'round',
            scale: 1
        })
    }

    update = () => {
        if (this.alive) {
            this.updateSpeed()
            this.updatePosition()
            this.updateAngle()
            this.updateBodyLength()
            this.checkBoundCollision()
            this.checkSelfCollision()
        }
        this.draw()
    }
}

export default SnakeObject