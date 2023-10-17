import { Collisions, Tools } from './../dir/core.js'

/**
 * Represents a snake entity in the game.
 */
class Snake extends Collisions {
    color = `rgb(${Tools.random(0,255,true)},${Tools.random(0,255,true)},${Tools.random(0,255,true)})`
    id = 0
    x = 0
    y = 0
    head = [{x: 0, y: 0}]
    body = [{x: 0, y: 0}]
    headSize = 5
    radius = 4
    length = 10
    alive = true

    constructor({ app, id = 0 }) {
        super()
        this.app = app
        this.id = id
    }

    /**
     * Update the snake's body length when it consumes food items.
     */
    eat() {
        const level = this.app.level
        const distanceToFood = this.app.tools.calculateDistance(this, level.activeFood)
        const minimumDistanceToEat = level.activeFood.radius + ( this.radius / 2 )

        if (distanceToFood < minimumDistanceToEat) {
            this.length += level.activeFood.value
            level.setFood()
            level.size++
        }
    }

    /**
     * Update the snake's position based on its current speed and angle.
     */
    move() {
        if (this.speed > 0) {
            const velocityX = this.speed * Math.cos(this.angle)
            const velocityY = this.speed * Math.sin(this.angle)
            this.x = this.x + velocityX
            this.y = this.y + velocityY

            this.head = [{x: this.x, y: this.y}, ...this.head.slice(0, this.headSize)]

            // Update body
            if (this.app.tools.calculateDistance(this, this.body[0]) > this.radius / 2) {
                this.body = [{x: this.x, y: this.y}, ...this.body.slice(0, this.length)]
            }
        }
    }

    /**
     * Draw the snake on the canvas context.
     */
    draw = (ctx) => {
        const appGui = this.app.gui.get
        const opts = { ctx, width: this.radius * 2, lineCap: 'round', scale: 1 }
        appGui.path({ collection: this.body, color: this.color, ...opts })
        appGui.path({ collection: this.head, color: '#000000', ...opts })

    }

    /**
     * Update the snake
     */
    update = () => {
        const { gui, level } = this.app
        if (this.alive) {
            this.move()
            this.eat()

            this.checkBoundCollision()
            this.checkSelfCollision()
            this.updateData()

            gui.viewport.followTo(level.player)
            gui.mapViewport.followTo(level.player)

        }
    }
}

export default Snake