import { DataTypes } from 'sequelize'
import { database } from '../config/database'
import Task from './task'

export interface UserAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  age: number
}

const User = database.define<any, UserAttributes>('User', {
  age: {
    type: DataTypes.INTEGER,
  }
})

User.hasMany(Task)

export default User