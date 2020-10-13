import { DataTypes, Sequelize, Deferrable } from 'sequelize'
import { database } from '../config/database'
import Click, { ClickAttributes } from './click'
import Task, { TaskAttributes } from './task'
import User, { UserAttributes } from './user'

export interface SessionAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  user: UserAttributes
  tasks: TaskAttributes[]
  clicks: ClickAttributes[]
}

export default database.define<any, SessionAttributes>('Session', {
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: new Deferrable.INITIALLY_IMMEDIATE
    },
    allowNull: false
  },
  tasks: {
    type: DataTypes.ARRAY,
    references: {
      model: Task,
      key: 'id',
      deferrable: new Deferrable.INITIALLY_IMMEDIATE
    },
    allowNull: false
  },
  clicks: {
    type: DataTypes.ARRAY,
    references: {
      model: Click,
      key: 'id',
      deferrable: new Deferrable.INITIALLY_IMMEDIATE
    },
    allowNull: false
  }
})
