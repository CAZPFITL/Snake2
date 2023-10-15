/**
 * A utility class containing static methods for common screen-related operations.
 */
class ScreenMethods {
    /**
     * Create and return a canvas context for the specified HTML canvas element.
     *
     * @param {string} id - The ID of the HTML canvas element.
     * @returns {CanvasRenderingContext2D} - The canvas 2D rendering context.
     */
    static createCanvas(id) {
        const canvas = document.getElementById(id);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas.getContext('2d');
    }

    /**
     * Clear the specified area on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     * @param {number} x - The X-coordinate of the top-left corner of the area to clear.
     * @param {number} y - The Y-coordinate of the top-left corner of the area to clear.
     * @param {number} width - The width of the area to clear.
     * @param {number} height - The height of the area to clear.
     */
    static clear(ctx, x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    }

    /**
     * Check for hovering and out events on a collection of entities based on client coordinates.
     *
     * @param {Object} options - An object with the following properties:
     * @param {Object} options.collection - The collection of entities to check for hovering.
     * @param {Event} options.event - The event (e.g., mousemove) containing client coordinates.
     * @param {Object} options.viewport - The viewport settings with scale, left, and top properties.
     * @param {Function} options.isHover - A function to execute when an entity is hovered.
     * @param {Function} options.isOut - A function to execute when an entity is no longer hovered.
     * @param {string} options.caller - The key corresponding to the entity causing the check (optional).
     */
    static checkHoverCollection({collection, event, viewport, isHover, isOut, caller}) {
        for (const key in collection) {
            if (
                ScreenMethods.isHover(collection[key], {x: event.clientX, y: event.clientY}) ||
                ScreenMethods.isHover(collection[key], ScreenMethods.viewportCoords(event, viewport))
            ) {
                isHover(key);
            } else {
                if (caller === key) {
                    isOut(key);
                }
            }
        }
    }

    /**
     * Check if a point defined by `click` is within the boundaries of the specified `entity`,
     * and execute a `callback` if the point is within the entity.
     *
     * @param {Object} entity - The entity (e.g., button) to check.
     * @param {Object} click - The point to check (with x and y coordinates).
     * @param {Function} callback - The callback function to execute if the point is within the entity.
     */
    static isClicked(entity, click, callback) {
        if (!entity) return;
        const {x, y, width, height} = entity;
        if (click.x > x && click.x < x + width && click.y > y && click.y < y + height) {
            callback();
        }
    }

    /**
     * Check if a point defined by `click` is within the boundaries of the specified `entity`.
     *
     * @param {Object} entity - The entity (e.g., button) to check.
     * @param {Object} click - The point to check (with x and y coordinates).
     * @returns {boolean} - True if the point is within the entity, otherwise false.
     */
    static isHover(entity, click) {
        const {x, y, width, height} = entity;
        return (
            click.x > x &&
            click.x < x + width &&
            click.y > y &&
            click.y < y + height
        );
    }

    /**
     * Convert client coordinates to viewport coordinates using the specified viewport scale and position.
     *
     * @param {Object} click - The client coordinates (e.g., mouse click) with x and y properties.
     * @param {Object} viewport - The viewport settings with scale, left, and top properties.
     * @returns {Object} - The converted viewport coordinates with x and y properties.
     */
    static viewportCoords = ({x, y}, viewport) => ({
        x: x / viewport.scale[0] + viewport.left,
        y: y / viewport.scale[1] + viewport.top
    })

    /**
     * Convert client coordinates to viewport coordinates using the specified viewport scale and position.
     *
     * @param {Event} e - The event (e.g., mouse click) containing client coordinates.
     * @param {Object} viewport - The viewport settings with scale, left, and top properties.
     * @returns {Object} - The converted viewport coordinates with x and y properties.
     */
    static clickCoords = (e, viewport) => ({
        x: e.clientX / viewport.scale[0] + viewport.left,
        y: e.clientY / viewport.scale[1] + viewport.top
    })
}

export default ScreenMethods