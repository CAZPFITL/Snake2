class Marker {
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    angle = 0
    size = 20
    polygons = []
    display = false
    constructor({app}) {
        this.app = app
    }

    updateAngle() {
        const dx = this.app.level.activeFood.x - this.app.level.player.head.x;
        const dy = this.app.level.activeFood.y - this.app.level.player.head.y;
        this.angle = Math.atan2(dy, dx);
        this.angle %= 2 * Math.PI;
    }

    updateDistance() {
        this.distance = this.app.tools.calculateDistance(this.app.level.player.head, this.app.level.activeFood)
        this.display = this.distance > 30
    }
    updatePosition() {
        this.x = window.innerWidth / 2 + this.distance * Math.cos(this.angle);
        this.y = window.innerHeight / 2 + this.distance * Math.sin(this.angle);
    }

    updateShape() {
        const dist = this.distance / 100
        const width = this.size * (dist < 2 ? dist : 2)
        const height = (this.size * 2) * (dist < 2 ? dist : 2)
        const angle = (this.angle - Math.PI/2) % (2 * Math.PI);

        const halfBase = width / 2;

        const vertex1 = {
            x: this.x + halfBase * Math.cos(angle),
            y: this.y + halfBase * Math.sin(angle)
        };

        const vertex2 = {
            x: this.x + halfBase * Math.cos(angle + Math.PI),
            y: this.y + halfBase * Math.sin(angle + Math.PI)
        };

        const vertex3 = {
            x: this.x + height * Math.cos(angle + Math.PI / 2),
            y: this.y + height * Math.sin(angle + Math.PI / 2)
        };

        this.polygons = [vertex1, vertex2, vertex3];
    }

    draw() {
        if (!this.display || !this.app.level.player.alive) {
            return;
        }
        this.app.gui.get.polygon(this.app.gui.windowCtx, this.polygons, this.app.level.activeFood.color)
    }

    update = () => {
        this.updateAngle()
        this.updatePosition()
        this.updateDistance()
        this.updateShape()
        this.draw()
    }
}

export default Marker