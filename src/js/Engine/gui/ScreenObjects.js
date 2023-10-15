import ScreenMethods from './ScreenMethods.js'

/**
 * A collection of static methods for drawing various screen objects and shapes.
 */
export default class ScreenObjects extends ScreenMethods {
    constructor() {
        super()
    }

    /**
     * Draw a polygon on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Object[]} collection - An array of points defining the polygon.
     * @param {string} [fill='#000'] - The fill color for the polygon.
     */
    static polygon(ctx, collection, fill = '#000') {
        ctx.save()
        if (collection.length < 1) return

        ctx.beginPath()
        ctx.moveTo(collection[0].x, collection[0].y)

        for (let i = 1; i < collection.length; i++) {
            ctx.lineTo(collection[i].x, collection[i].y)
        }

        ctx.fillStyle = fill
        ctx.fill()
        ctx.restore()
    }

    /**
     * Draw a circle on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Object} entity - An object representing the circle with properties like x, y, radius, and color.
     * @param {string} [fill=true] - If true, fill the circle otherwise, stroke it.
     */
    static circle({ctx, x, y, radius, fill = 'rgba(0,0,0,1)', stroke = 'rgba(0,0,0,1)', widthStroke = 0}) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.lineWidth  = widthStroke
        ctx.strokeStyle = stroke
        ctx.fillStyle = fill
        fill ? ctx.fill() : ctx.stroke()
        ctx.restore()
    }

    /**
     * Draw a button with text on the canvas context.
     *
     * @param {Object} options - An object containing button properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {string} options.font - The font style for the text.
     * @param {number} options.x - The x-coordinate of the button.
     * @param {number} options.y - The y-coordinate of the button.
     * @param {number} options.width - The width of the button.
     * @param {number} options.height - The height of the button.
     * @param {string} options.text - The text to display on the button.
     * @param {string} [options.bg='#ffffff'] - The background color of the button.
     * @param {string} [options.color='#000'] - The color of the text.
     * @param {string} [options.stroke='#000'] - The stroke color.
     * @param {boolean} [options.center=true] - Whether to center the text on the button.
     * @param {number} [options.widthStroke=1] - The stroke width.
     * @param {Object} [options.textPosition={ x: 0, y: 0 }] - The text position relative to the button.
     */
    static button({
        ctx,
        font,
        x,
        y,
        width,
        height,
        text,
        bg = '#ffffff',
        color = '#000',
        stroke = '#000',
        center = true,
        widthStroke = 1,
        textPosition = { x: 0, y: 0 }
    }) {
    ctx.save()
    this.square({ctx, x, y, width, height, color: bg, stroke, widthStroke})
    this.text({ctx, font, color, text, x: x + textPosition.x, y: y + textPosition.y, width, height, center})
    ctx.restore()
    }

    /**
     * Draw a square on the canvas context.
     *
     * @param {Object} options - An object containing square properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {number} options.x - The x-coordinate of the square.
     * @param {number} options.y - The y-coordinate of the square.
     * @param {number} options.width - The width of the square.
     * @param {number} options.height - The height of the square.
     * @param {string} [options.color='#FFF'] - The fill color of the square.
     * @param {string|boolean} [options.stroke=false] - The stroke color or false if no stroke.
     * @param {number} [options.widthStroke=1] - The stroke width.
     */
    static square({ctx, x, y, width, height, color = '#FFF', stroke = false, widthStroke = 1}) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.fillStyle = color
        ctx.fill()

        if (stroke) {
            const cache = ctx.lineWidth
            ctx.strokeStyle = stroke
            ctx.lineWidth = widthStroke
            ctx.stroke()
            ctx.lineWidth = cache
        }
        ctx.restore()
    }

    /**
     * Draw text on the canvas context.
     *
     * @param {Object} options - An object containing text properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {string} options.font - The font style for the text.
     * @param {string} options.color - The color of the text.
     * @param {string} options.text - The text to display.
     * @param {number} options.x - The x-coordinate of the text.
     * @param {number} options.y - The y-coordinate of the text.
     * @param {number} options.width - The width of the text area.
     * @param {number} options.height - The height of the text area.
     * @param {boolean} [options.center=false] - Whether to center the text in the area.
     */
    static text({ctx, font, color, text, x, y, width, height, center = false}) {
        ctx.save()
        ctx.font = font
        ctx.fillStyle = color
        const xText = x + width / 2 - ctx.measureText(text).width / 2
        const yText = y + height / 2 + 5
        ctx.fillText(text, center ? xText : x, center ? yText : y)
        return ctx.measureText(text).width
        ctx.restore()
    }

    /**
     * Draw a progress bar on the canvas context.
     *
     * @param {Object} options - An object containing progress bar properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {number} options.x - The x-coordinate of the progress bar.
     * @param {number} options.y - The y-coordinate of the progress bar.
     * @param {string} [options.text] - The text to display above the bar.
     * @param {number} options.cap - The maximum value of the progress bar.
     * @param {number} options.fill - The current fill value of the progress bar.
     * @param {number} [options.height=10] - The height of the progress bar.
     * @param {string} [options.fillColor] - The fill color of the progress bar.
     * @param {string|boolean} [options.barColor='transparent'] - The bar color or 'transparent' for no fill.
     * @param {string|boolean} [options.stroke] - The stroke color or false for no stroke.
     * @param {boolean} [negative=false] - Whether the bar fills from right to left (for negative values).
     */
    static bar({
       ctx,
       x,
       y,
       cap,
       fill,
       height = 10,
       fillColor,
       barColor = 'transparent',
       stroke,
       textProps = {
        font: '12px Mouse',
        color: '#000000',
        text: ''
       }
   }, negative = false) {
        ctx.save()
        const normalizedProgress = fill / (cap / 255)
        const progress = negative ? cap - fill : fill

        ctx.fillStyle = barColor
        ctx.fillRect(x, y, cap, height)

        if (stroke) {
            ctx.strokeStyle = stroke
            ctx.strokeRect(x, y, cap, height)
        }

        ctx.fillStyle = fillColor === 'green-red'
        ? `rgb(${normalizedProgress}, ${255 - normalizedProgress}, 0)`
        : fillColor === 'red-green'
            ? `rgb(${255 - normalizedProgress}, ${normalizedProgress}, 0)`
            : fillColor

        ctx.fillRect(x, y, progress, height)

        this.text({ctx, font: '12px Mouse', ...textProps, x, y: y - height})
        ctx.restore()
    }

    /**
     * Draw a line on the canvas context.
     *
     * @param {Object} options - An object containing line properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {number} options.x1 - The x-coordinate of the starting point.
     * @param {number} options.y1 - The y-coordinate of the starting point.
     * @param {number} options.x2 - The x-coordinate of the ending point.
     * @param {number} options.y2 - The y-coordinate of the ending point.
     * @param {string} [options.color='#000'] - The color of the line.
     * @param {number} [options.width] - The line width.
     * @param {string} [options.lineCap] - The line cap style.
     */
    static line({ctx, x1, y1, x2, y2, color = '#000', width, lineCap}) {
        ctx.save()
        ctx.lineWidth = width
        ctx.lineCap = lineCap

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = color
        ctx.stroke()
        ctx.restore()
    }

    /**
     * Draw a path (sequence of line segments) on the canvas context.
     *
     * @param {Object} options - An object containing path properties.
     * @param {CanvasRenderingContext2D} options.ctx - The canvas rendering context.
     * @param {Array} options.collection - An array of points defining the path.
     * @param {string} [options.color='#000'] - The color of the path.
     * @param {number} [options.width] - The line width.
     * @param {string} [options.lineCap] - The line cap style.
     * @param {number} [options.scale] - The scale factor for the path.
     */
    static path({ctx, collection, color = '#000', width, lineCap, scale}) {
        ctx.save()
        ctx.lineWidth = width
        ctx.lineCap = lineCap

        // Draw the vectors path
        ctx.beginPath()
        ctx.strokeStyle = color
        for (const element of collection) {
            const x = element.x / scale
            const y = element.y / scale
            ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.restore()
    }

    /**
     * Draw an ellipse on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Object} entity - An object defining the ellipse properties.
     * @param {number} entity.x - The x-coordinate of the ellipse center.
     * @param {number} entity.y - The y-coordinate of the ellipse center.
     * @param {number} entity.radiusX - The horizontal radius of the ellipse.
     * @param {number} entity.radiusY - The vertical radius of the ellipse.
     * @param {string} entity.color - The fill/stroke color of the ellipse.
     * @param {boolean} [fill=true] - Whether to fill the ellipse (true by default).
     */
    static ellipse(ctx, entity, fill = true) {
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(entity.x, entity.y, entity.radiusX, entity.radiusY, 0, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.strokeStyle = ctx.fillStyle = entity.color
        fill ? ctx.fill() : ctx.stroke()
        ctx.restore()
    }
}
