/**
 * Manages the current state of the application.
 */
export default class StateManager {
    /**
     * The current state of the application.
     */
    state = 'LOAD_ENGINE';

    /**
     * Set the state of the application.
     *
     * @param {string} state - The new state to set.
     */
    setState = (state) => this.state = state;
}