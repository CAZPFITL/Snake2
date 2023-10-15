/**
 * A utility class for common mathematical and geometric operations.
 */
class Tools {
    /**
     * Linear interpolation between two values.
     *
     * @param {number} a - The initial value.
     * @param {number} b - The final value.
     * @param {number} t - The interpolation factor.
     * @returns {number} - The interpolated value.
     */
    static lerp = (a, b, t) => a + (b - a) * t

    /**
     * Generate a random number within a specified range.
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @param {boolean} floor - Whether to round the result to the nearest integer.
     * @returns {number} - A random number within the specified range.
     */
    static random(min, max, floor = false) {
        const r = Math.random() * (max - min) + min
        return floor ? Math.floor(r) : r
    }

    /**
     * Calculate the Euclidean distance between two points.
     *
     * @param {Object} point1 - The first point with x and y coordinates.
     * @param {Object} point2 - The second point with x and y coordinates.
     * @returns {number} - The distance between the two points.
     */
    static calculateDistance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Convert an angle from radians to degrees.
     *
     * @param {number} angle - The angle in radians.
     * @returns {number} - The angle in degrees.
     */
    static radToDeg(angle) {
        return angle * (180 / Math.PI)
    }

    /**
     * Convert an angle from degrees to radians.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {number} - The angle in radians.
     */
    static degToRad(angle) {
        return angle * (Math.PI / 180)
    }

    /**
     * Round a number to a specified number of decimal places.
     *
     * @param {number} n - The number to round.
     * @param {number} [x=2] - The number of decimal places to round to.
     * @returns {number} - The rounded number.
     */
    static xDec = (n, x = 2) =>
        Math.round(n * Math.pow(10, x)) / Math.pow(10, x)

    /**
     * Find the maximum value in an array of numbers.
     *
     * @param {number[]} arr - An array of numbers.
     * @returns {number} - The maximum value in the array.
     */
    static max(arr) {
        let maxByFor = arr[0];
        for (let index = 1; index < arr.length; index++) {
            if (arr[index] > maxByFor) {
                maxByFor = arr[index]
            }
        }
        return maxByFor
    }

    /**
     * Find the intersection point of two line segments.
     *
     * @param {Object} A - The start point of the first line segment with x and y coordinates.
     * @param {Object} B - The end point of the first line segment with x and y coordinates.
     * @param {Object} C - The start point of the second line segment with x and y coordinates.
     * @param {Object} D - The end point of the second line segment with x and y coordinates.
     * @returns {Object|null} - The intersection point if it exists, or null if there is no intersection.
     */
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

    /**
     * Check if two polygons intersect by checking if any of their line segments intersect.
     *
     * @param {Object[]} poly1 - An array of points representing the first polygon.
     * @param {Object[]} poly2 - An array of points representing the second polygon.
     * @returns {boolean} - True if the polygons intersect, false otherwise.
     */
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

    /**
     * Check if two line segments intersect.
     *
     * @param {Object[]} line1 - An array containing the start and end points of the first line segment.
     * @param {Object[]} line2 - An array containing the start and end points of the second line segment.
     * @returns {boolean} - True if the line segments intersect, false otherwise.
     */
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

        // Parallel or collinear segments
        if (Math.abs(det) < epsilon) {
            return false;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det;

        // Segments intersect
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return true;
        }

        return false;
    }
}

export default Tools