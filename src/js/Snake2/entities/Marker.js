class Marker {
    x = 0
    y = 0
    angle = 0
    width = 100
    height = 50
    polygons = []
    constructor({app}) {
        this.app = app
    }

    updateShape() {
        const halfBase = this.baseLength / 2;

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

}

export default Marker