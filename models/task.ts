import { DataTypes } from 'sequelize'
import { database } from '../config/database'
import Click from './click'
import User from './user'

export interface TaskAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  iod: number
  compare: boolean
  time: number
  userTime: number
  compareTime: number
  compareIod: number
  userValue: number
}

const Task = database.define<any, TaskAttributes>('Task', {
  iod: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  compare: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userTime: {
    type: DataTypes.INTEGER,
  },
  compareTime: {
    type: DataTypes.INTEGER,
  },
  compareIod: {
    type: DataTypes.INTEGER,
  },
  userValue: {
    type: DataTypes.INTEGER,
  },
})

Task.hasMany(Click)
//Task.belongsTo(User)

export default Task