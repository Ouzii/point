import express from 'express'
import * as csv from 'fast-csv'
import Task from '../models/task'
import User from '../models/user'

const scoreRouter = express.Router()

scoreRouter.get('/csv', async (req: express.Request, res: express.Response) => {
    const tasks = await Task.findAll({include: [User]})
    console.log(tasks)
    res.setHeader('Content-disposition', 'attachment; filename=results.csv')
    res.setHeader('content-type', 'text/csv')
    const stream = csv.format({ headers: true })
    stream.pipe(res)
    if (tasks.length > 0) {
        const parsed = tasks.map(e => ({
            ...e.dataValues,
            age: e.dataValues.User.dataValues.age,
            gender: e.dataValues.User.dataValues.gender,
            inputDevice: e.dataValues.User.dataValues.inputDevice,
            User: undefined
        }))
        stream.write(Object.keys(parsed[0]))
        parsed.forEach(e => stream.write(Object.values(e)))
    }
    stream.end()
})

export default scoreRouter