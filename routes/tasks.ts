import express from 'express'
import Task from '../models/task'
import Click from '../models/click'

const taskRouter = express.Router()

taskRouter.get('/tasks', async (req: express.Request, res: express.Response) => {
  const tasks = await Task.findAll()
  res.json(tasks)
})

taskRouter.post('/tasks', async (req: express.Request, res: express.Response) => {
  try {
    const { userId, iod, compare, time, userTime, compareTime, compareIod, userValue, clicks } = req.body
    console.log(userId)
    const newTask = await Task.create({ userId, iod, compare, time, userTime, compareTime, compareIod, userValue })
    const newClicks = await Click.bulkCreate(clicks.map((c: typeof Click) => ({ ...c, taskId: newTask.id })))
    res.json({ ...newTask.dataValues, clicks: newClicks })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default taskRouter
