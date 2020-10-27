import { DataTypes } from 'sequelize'
import { database } from '../config/database'
import Click from './click'

export interface TaskAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  iod: number
  phase: string
  compare: boolean
  time: number
  userTime: number
  compareTime: number
  compareIod: number
  userValue: number
}

const Task = database.define<any, TaskAttributes>('Task', {
  iod: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  phase: {
    type: DataTypes.STRING,
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

Task.hasMany(Click, {foreignKey: 'taskId'})
Click.belongsTo(Task, {foreignKey: 'taskId'})

export default Task