import { DataTypes } from 'sequelize'
import { database } from '../config/database'
import Task from './task'

export interface UserAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  age: number
  gender: string
  inputDevice: string
}

const User = database.define<any, UserAttributes>('User', {
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING
  },
  inputDevice: {
    type: DataTypes.STRING
  }
})

User.hasMany(Task, { foreignKey: 'userId' })

export default User