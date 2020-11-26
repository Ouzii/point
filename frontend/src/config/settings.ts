// URI of backend
export const BASE_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/point_api' : 'https://app.hyytiala.fi/point_api'
// Canvas side length in pixels
export const CANVAS_SIZE = 800
// Number of all tasks. Used for progress bar
export const AMOUNT_OF_TASKS = 48


export default {
    BASE_PATH,
    CANVAS_SIZE,
    AMOUNT_OF_TASKS
}