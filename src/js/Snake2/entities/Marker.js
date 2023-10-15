class Marker {
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    angle = 0
    size = 10
    polygons = []
    display = false

    constructor({app}) {
        this.app = app
    }

    /**
     * Update the angle of the marker based on the position of the active food item and the snake's head.
     */
    updateAngle() {
        const dx = this.app.level.activeFood.x - this.app.level.player.x;
        const dy = this.app.level.activeFood.y - this.app.level.player.y;
        this.angle = Math.atan2(dy, dx);
        this.angle %= 2 * Math.PI;
    }

    /**
     * Update the distance from the marker to the active food item and determine if it should be displayed.
     */
    updateDistance() {
        this.distance = this.app.tools.calculateDistance(this.app.level.player, this.app.level.activeFood)
        this.display = this.distance > 30
    }

    /**
     * Update the position of the marker based on its angle and distance.
     */
    updatePosition() {
        this.x = window.innerWidth / 2 + Math.cos(this.angle) * 50;
        this.y = window.innerHeight / 2 + Math.sin(this.angle) * 50;
    }

    /**
     * Update the shape of the marker and calculate its vertices.
     */
    updateShape() {
        let dist = this.distance / 100
        dist = (dist < 2 ? dist : 2)
        const width = this.size / 2 * dist
        const height = (this.size * 2) * dist
        const angle = (this.angle - Math.PI/2) % (2 * Math.PI);

        const vertex1 = {
            x: this.x + width * Math.cos(angle),
            y: this.y + width * Math.sin(angle)
        };

        const vertex2 = {
            x: this.x + width * Math.cos(angle + Math.PI),
            y: this.y + width * Math.sin(angle + Math.PI)
        };

        const vertex3 = {
            x: this.x + height * Math.cos(angle + Math.PI / 2),
            y: this.y + height * Math.sin(angle + Math.PI / 2)
        };

        this.polygons = [vertex1, vertex2, vertex3];
    }

    /**
     * Draw the marker on the canvas context if it should be displayed and the snake is alive.
     */
    draw() {
        if (!this.display || !this.app.level.player.alive) {
            return;
        }
        const fill = `${this.app.level.activeFood.color}${this.distance/1000})`
        this.app.gui.get.polygon(this.app.gui.windowCtx, this.polygons, fill)
    }

    /**
     * Update the marker by executing angle, position, distance, shape, and drawing updates.
     */
    update = () => {
        this.updateAngle()
        this.updatePosition()
        this.updateDistance()
        this.updateShape()
        this.draw()
    }
}

export default Marker