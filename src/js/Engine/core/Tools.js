export default class Tools {
    static lerp = (a, b, t) => a + (b - a) * t

    static random(min, max, floor = false) {
        const r = Math.random() * (max - min) + min
        return floor ? Math.floor(r) : r
    }

    static calculateDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static radToDeg(angle) {
        return angle * (180 / Math.PI)
    }

    static degToRad(angle) {
        return angle * (Math.PI / 180)
    }

    static xDec = (n, x = 2) =>
        Math.round(n * Math.pow(10, x)) / Math.pow(10, x)

    static max(arr) {
        let maxByFor = arr[0];
        for (let index = 1; index < arr.length; index++) {
            if (arr[index] > maxByFor) {
                maxByFor = arr[index]
            }
        }
        return maxByFor
    }

    static getIntersection(A, B, C, D) {
        const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
        const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
        const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
        if (bottom !== 0) {
            const t = tTop / bottom
            const u = uTop / bottom
            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
                return {
                    x: Tools.lerp(A.x, B.x, t),
                    y: Tools.lerp(A.y, B.y, t),
                    offset: t
                }
            }
        }

        return null
    }

    static polysIntersect(poly1, poly2) {
        for (let i = 0; i < poly1.length; i++) {
            for (let j = 0; j < poly2.length; j++) {
                const touch = this.getIntersection(
                    poly1[i],
                    poly1[(i + 1) % poly1.length],
                    poly2[j],
                    poly2[(j + 1) % poly2.length],
                )
                if (touch) {
                    return true
                }
            }
        }
        return false
    }

    static segmentsIntersection(line1, line2) {
        // Tolerance for numerical precision issues
        const epsilon = 1e-10;

        const x1 = line1[0].x;
        const y1 = line1[0].y;
        const x2 = line1[1].x;
        const y2 = line1[1].y;
        const x3 = line2[0].x;
        const y3 = line2[0].y;
        const x4 = line2[1].x;
        const y4 = line2[1].y;

        const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        // Segmentos paralelos o colineales
        if (Math.abs(det) < epsilon) {
            return false;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det;

        // Segmentos se intersectan
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return true;
        }

        return false;
    }
}