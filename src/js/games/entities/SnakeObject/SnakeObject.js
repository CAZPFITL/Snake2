import SnakeControls from "./SnakeControls.js";

class SnakeObject {
    DISTANCE_THRESHOLD = 2
    id = 0
    body = [
        {x: 0, y: 0},
        {x: -1, y: 0},
        {x: -2, y: 0},
        {x: -3, y: 0}
    ]
    length = 40
    friction= 0.02
    acceleration = 0.05
    maxSpeed = 0.8
    minSpeed = 0.5
    turnSpeed = 0.06
    speed = 0.5
    angle = 0
    alive = true

    constructor({ app, id = 0, ...props }) {
        this.app = app
        this.id = id
        this.controls = new SnakeControls(app, this)
    }

    calculateDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    checkBoundCollision(){
        const head = this.body[0]
        const { x, y, width, height } = this.app.level.bounds;
        const headX = head.x;
        const headY = head.y;

        let collisionDetected = false;

        if (headX < x) {
            this.body[0].x = x;
            collisionDetected = true;
        } else if (headX > x + width) {
            this.body[0].x = x + width;
            collisionDetected = true;
        }

        if (headY < y) {
            this.body[0].y = y;
            collisionDetected = true;
        } else if (headY > y + height) {
            this.body[0].y = y + height;
            collisionDetected = true;
        }

        this.alive = !collisionDetected
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
            this.speed > this.minSpeed && (this.speed -= this.controls.reverse === 1 ? this.acceleration : this.friction)
        }

        this.checkBoundCollision()

        for (let i = 2; i < this.body.length - 1; i++) {
            const line1 = [this.body[0], this.body[1]]
            const line2 = [this.body[i], this.body[i+1]]
            if (this.app.tools.polysIntersect(line1, line2)) {
                this.alive = false
            }
        }
    }

    updatePosition() {
        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle);
            const velocityY = this.speed * Math.sin(this.angle);

            const newHeadX = this.body[0].x + velocityX;
            const newHeadY = this.body[0].y + velocityY;

            if (this.body.length <= this.length) {
                if (this.calculateDistance(this.body[0], this.body[1]) > this.DISTANCE_THRESHOLD) {
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
            width: 1,
            lineCap: 'round',
            scale: 1
        })
    }

    update = () => {
        if (this.alive) {
            this.move()
            this.updatePosition()
        }
        this.draw()
    }
}

export default SnakeObject