import express from 'express'

const scoreRouter = express.Router()

scoreRouter.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello')
})

export default scoreRouter