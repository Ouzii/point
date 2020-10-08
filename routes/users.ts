import express from 'express'
import User from '../models/user'

const userRouter = express.Router()

userRouter.get('/users', async (req: express.Request, res: express.Response) => {
  const users = await User.findAll();
  res.json(users)
})

userRouter.post('/users', async (req: express.Request, res: express.Response) => {
  try {
    const { age } = req.body
    const newUser = await User.create({ age });
    res.json({ id: newUser.id })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default userRouter
