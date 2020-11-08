export const BASE_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/point_api' : 'https://app.hyytiala.fi/point_api'
export const CANVAS_SIZE = 800
export const AMOUNT_OF_TASKS = 48


export default {
    BASE_PATH,
    CANVAS_SIZE,
    AMOUNT_OF_TASKS
}