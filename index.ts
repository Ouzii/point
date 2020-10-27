import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import scoreRouter from './routes/score'
import userRouter from './routes/users'
import clickRouter from './routes/clicks'
import taskRouter from './routes/tasks'
import { database } from './config/database'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/point_api', scoreRouter)
app.use('/point_api', userRouter)
app.use('/point_api', clickRouter)
app.use('/point_api', taskRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

database.authenticate().then(() => console.log('Connected to DB')).catch(error => console.log(error))
//database.sync({force: true})
//database.sync({alter: true})