import SnakeControls from "./SnakeControls.js";

class SnakeObject {
    DISTANCE_THRESHOLD = 2
    id = 0
    body = [
        {x: 0, y: 0},
        {x: 0, y: 0}
    ]
    length = 2
    friction= 0.01
    acceleration = 0.02
    maxSpeed = 0.7
    normalSpeed = 0.5
    minSpeed = 0.3
    turnSpeed = 0.05
    speed = 0.5
    angle = 0
    alive = true

    constructor({ app, id = 0 }) {
        this.app = app
        this.id = id
        this.controls = new SnakeControls(app, this)
    }

    checkBoundCollision(){
        const head = this.body[0]
        const { x, y, width, height } = this.app.level.bounds;
        const headX = head.x;
        const headY = head.y;

        if (headX < x + this.app.level.border) {
            this.alive = false
        } else if (headX > x + width - this.app.level.border) {
            this.alive = false
        }

        if (headY < y + this.app.level.border) {
            this.alive = false
        } else if (headY > y + height - this.app.level.border) {
            this.alive = false
        }
    }

    checkSelfCollision() {
        for (let i = 2; i < this.body.length - 1; i++) {
            const line1 = [
                { x: this.body[0].x, y: this.body[0].y },
                {
                    x: this.body[0].x + Math.cos(this.angle) * this.app.tools.calculateDistance(this.body[0], this.body[1]),
                    y: this.body[0].y + Math.sin(this.angle) * this.app.tools.calculateDistance(this.body[0], this.body[1])
                }
            ];
            const line2 = [this.body[i], this.body[i+1]];
            if (this.app.tools.segmentsIntersection(line1, line2)) {
                this.alive = false;
            }
        }
    }


    move() {
        // TURN
        if (this.controls.left === 1) {
            this.angle -= this.turnSpeed;
        } else if (this.controls.right === 1) {
            this.angle += this.turnSpeed;
        }

        this.angle %= 2 * Math.PI;

        // SPEED
        if (this.controls.forward === 1) {
            if (this.controls.reverse === 0 && this.speed <= this.maxSpeed) {
                this.speed += this.acceleration
            }
        } else {
            if (this.controls.reverse === 1) {
                this.speed >= this.minSpeed && (this.speed -= this.acceleration)
            } else {
                this.speed += this.speed > this.normalSpeed ? -this.friction : this.friction ?? 0
            }
        }

        const calcX = this.body[0].x - this.app.level.activeFood.x
        const calcY = this.body[0].y - this.app.level.activeFood.y

        if (this.app.tools.calculateDistance(this.body[0], this.app.level.activeFood) < 2) {
            this.length++
            this.app.level.newFood()
        }
    }

    updatePosition() {
        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle);
            const velocityY = this.speed * Math.sin(this.angle);
            const newHeadX = this.body[0].x + velocityX;

            const newHeadY = this.body[0].y + velocityY;
            if (this.body.length <= this.length) {

                if (this.app.tools.calculateDistance(this.body[0], this.body[1]) > this.DISTANCE_THRESHOLD) {
                    this.body.unshift({ x: newHeadX, y: newHeadY });
                } else {
                    this.body[0] = { x: newHeadX, y: newHeadY }
                }
            }
            if (this.body.length > this.length) {

                this.body.pop()
            }
        }
    }


    draw = (ctx = this.app.gui.ctx) => {
        this.app.gui.get.path({
            ctx,
            collection: this.body,
            color: 'rgb(255, 0, 255)',
            width: 2,
            lineCap: 'round',
            scale: 1
        })
    }
    update = () => {
        if (this.alive) {
            this.checkBoundCollision()
            // this.checkSelfCollision()
            this.move()
            this.updatePosition()
        }
        this.draw()
    }
}

export default SnakeObject