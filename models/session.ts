import { database } from '../config/database'
import Click from './click'
import Task from './task'
import User from './user'

export interface SessionAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

const Session = database.define<any, SessionAttributes>('Session', {})

Session.hasOne(User, { foreignKey: 'userId' })
Session.hasMany(Task, { foreignKey: 'tasks' })
Session.hasMany(Click, { foreignKey: 'clicks' })

export default Session