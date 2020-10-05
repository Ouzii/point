import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
import score from './routes/score'
import { database } from './config/database'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', score)

app.listen(4000, () => {
    console.log('Server listening port 4000')
})

database.authenticate().then(() => console.log('Connected to DB')).catch(error => console.log(error))