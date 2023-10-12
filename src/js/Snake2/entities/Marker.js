class Marker {
    x = window.innerWidth / 2
    y = window.innerHeight / 2
    angle = 0
    width = 100
    height = 50
    polygons = []
    constructor({app}) {
        this.app = app
    }

    updateShape() {
        const halfBase = this.width / 2;

        const vertex1 = {
            x: this.x + halfBase * Math.cos(this.angle),
            y: this.y + halfBase * Math.sin(this.angle)
        };

        const vertex2 = {
            x: this.x + halfBase * Math.cos(this.angle + Math.PI),
            y: this.y + halfBase * Math.sin(this.angle + Math.PI)
        };

        const vertex3 = {
            x: this.x + this.height * Math.cos(this.angle + Math.PI / 2),
            y: this.y + this.height * Math.sin(this.angle + Math.PI / 2)
        };

        this.polygons = [vertex1, vertex2, vertex3];
    }

    draw() {
        this.app.gui.get.polygon(this.app.gui.windowCtx, this.polygons, 'red')
    }

    update = () => {
        this.updateShape()
        this.draw()
        this.angle+= 0.01
    }
}

export default Marker