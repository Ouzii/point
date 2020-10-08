import { DataTypes } from 'sequelize'
import { database } from '../config/database'

export interface ClickAttributes {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  time: number
  x: number
  y: number
  ball: boolean
  ballX: number
  ballY: number
}

const Click = database.define<any, ClickAttributes>('Click', {
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  x: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  y: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ball: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ballX: {
    type: DataTypes.INTEGER
  },
  ballY: {
    type: DataTypes.INTEGER
  }
})

export default Click