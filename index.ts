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

app.use('/', scoreRouter)
app.use('/', userRouter)
app.use('/', clickRouter)
app.use('/', taskRouter)

app.listen(4000, () => {
    console.log('Server listening port 4000')
})

database.authenticate().then(() => console.log('Connected to DB')).catch(error => console.log(error))
//database.sync({force: true})