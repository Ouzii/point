import express from 'express'
import User from '../models/user'

const userRouter = express.Router()
// Get all users from DB
userRouter.get('/users', async (req: express.Request, res: express.Response) => {
  const users = await User.findAll();
  res.json(users)
})
// Create new skeleton for user
userRouter.post('/users', async (req: express.Request, res: express.Response) => {
  try {
    const newUser = await User.create()
    res.json({ id: newUser.id, age: null, inputDevice: null, gender: null })
  } catch (error) {
    res.status(500).json({ error })
  }
})
// Add Quiz info to user
userRouter.post('/user_details', async (req: express.Request, res: express.Response) => {
  try {
    const { id, age, gender, inputDevice } = req.body
    const updatedUser = await User.update({ id, age, gender, inputDevice }, {
      where: { id },
      returning: true
    })
    res.json(updatedUser[1][0])
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default userRouter
