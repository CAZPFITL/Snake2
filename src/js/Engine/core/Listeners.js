/**
 * Manages event listeners for the application.
 */
class Listeners {
    app; // Reference to the app
    listeners; // Stores event listeners

    /**
     * Initializes the Listeners class.
     *
     * @param {object} app - The main application object.
     */
    constructor(app) {
        this.app = app; // Reference to the main application
        this.listeners = {}; // Stores event listeners
        app.listeners = this; // Assign this instance to the app object.
    }

    /**
     * Initializes event listeners.
     */
    init() {
        for (let listener in this.listeners) {
            // Add event listeners for each registered event
            document.addEventListener(
                listener,
                (e) => this.listeners[listener].forEach(fn => fn(e)),
                { passive: false }
            );
        }
    }

    /**
     * Registers a new event listener function for a specific event.
     *
     * @param {string} event - The event name (e.g., 'click', 'keydown').
     * @param {Function} fn - The event listener function to execute when the event occurs.
     * @returns {Listeners} - The Listeners instance for method chaining.
     */
    pushListener(event, fn) {
        // Store event listener functions in an array under the event name
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return this; // Return this instance for method chaining.
    }
}

export default Listeners