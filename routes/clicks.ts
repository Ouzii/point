import express from 'express'
import Click from '../models/click'

const clickRouter = express.Router()

clickRouter.get('/clicks', async (req: express.Request, res: express.Response) => {
  const clicks = await Click.findAll();
  res.json(clicks)
})

clickRouter.post('/clicks', async (req: express.Request, res: express.Response) => {
  try {
    const { taskId, time, x, y, ball } = req.body
    const newClick = await Click.create({ taskId, time, x, y, ball })
    res.json({ newClick })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default clickRouter
