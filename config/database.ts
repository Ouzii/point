import { Sequelize } from 'sequelize';
const DB_URL = process.env.DB_URL
console.log(DB_URL)

export const database = new Sequelize(DB_URL)
