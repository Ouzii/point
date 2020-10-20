import express from 'express'
import * as csv from 'fast-csv'
import Task from '../models/task'

const scoreRouter = express.Router()

scoreRouter.get('/csv', async (req: express.Request, res: express.Response) => {
    const tasks = await Task.findAll()
    res.setHeader('Content-disposition', 'attachment; filename=results.csv')
    res.setHeader('content-type', 'text/csv')
    const stream = csv.format({ headers: true })
    stream.pipe(res)
    stream.write(Object.keys(tasks[0].dataValues))
    tasks.forEach(e => stream.write(Object.values(e.dataValues)))
    stream.end()

})

export default scoreRouter