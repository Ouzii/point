import { DataTypes } from 'sequelize'
import { database } from '../config/database'
import Click from './click'

export interface TaskAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  orderNumber: number
  iod: number
  modifier: string
  compare: boolean
  width: number
  distance: number
  time: number
  userTime: number
  compareTime: number
  compareIod: number
  compareWidth: number
  compareDistance: number
  userValue: number
}

const Task = database.define<any, TaskAttributes>('Task', {
  orderNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  iod: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  modifier: {
    type: DataTypes.STRING,
    allowNull: false
  },
  compare: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  width: {
    type: DataTypes.DECIMAL(10,3),
  },
  distance: {
    type: DataTypes.DECIMAL(10,3),
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
    type: DataTypes.DECIMAL(10,2),
  },
  compareWidth: {
    type: DataTypes.DECIMAL(10,3),
  },
  compareDistance: {
    type: DataTypes.DECIMAL(10,3),
  },
  userValue: {
    type: DataTypes.INTEGER,
  },
})

Task.hasMany(Click, {foreignKey: 'taskId'})
Click.belongsTo(Task, {foreignKey: 'taskId'})

export default Task