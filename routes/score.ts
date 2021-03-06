import express from 'express'
import * as csv from 'fast-csv'
import Task from '../models/task'
import User from '../models/user'
import Click from '../models/click'

const scoreRouter = express.Router()
// Get data as csv from database.
scoreRouter.get('/csv', async (req: express.Request, res: express.Response) => {
    const tasks = await Task.findAll({ include: [User, Click] })
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
            User: e.dataValues.User.dataValues.id,
            Clicks: e.dataValues.Clicks.length
        }))
        stream.write(Object.keys(parsed[0]))
        parsed.forEach(e => stream.write(Object.values(e)))
    }
    stream.end()
})

export default scoreRouter