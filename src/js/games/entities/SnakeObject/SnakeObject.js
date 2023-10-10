import SnakeControls from "./SnakeControls.js";

class SnakeObject {
    DISTANCE_THRESHOLD = 2
    id = 0
    body = [
        {x: 0, y: 0},
        {x: 0, y: 0}
    ]
    length = 10
    friction= 0.02
    acceleration = 0.05
    maxSpeed = 0.8
    minSpeed = 0.5
    turnSpeed = 0.06
    speed = 0.5
    angle = 0

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

    checkCollisions() {

    }

    move() {
        if (this.controls.left === 1) {
            this.angle -= this.turnSpeed;
        } else if (this.controls.right === 1) {
            this.angle += this.turnSpeed;
        }

        this.angle %= 2 * Math.PI;

        if (this.controls.forward === 1) {
            if (this.controls.reverse === 0 && this.speed <= this.maxSpeed) {
                this.speed += this.acceleration
            }
        } else {
            this.speed > this.minSpeed && (this.speed -= this.controls.reverse === 1 ? this.acceleration : this.friction)
        }

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
        this.move()
        this.draw()
    }
}

export default SnakeObject