import express from 'express'
import { isColString } from 'sequelize/types/lib/utils';
import Task from '../models/task'

const taskRouter = express.Router()

taskRouter.get('/tasks', async (req: express.Request, res: express.Response) => {
  const clicks = await Task.findAll();
  res.json(clicks)
})

taskRouter.post('/tasks', async (req: express.Request, res: express.Response) => {
  try {
    const { userId, iod, compare, time, userTime, compareTime, compareIod, userValue } = req.body
    console.log(userId)
    const newTask = await Task.create({ userId, iod, compare, time, userTime, compareTime, compareIod, userValue })
    res.json({ newTask })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default taskRouter
