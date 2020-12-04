import 'reflect-metadata'
import { createConnection } from 'typeorm'
import mysql from 'mysql'
import logger from './config/logger'
import app from './config/express'
const PORT = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

connection.connect()

app
  .listen(PORT, () => {
    logger.info(`Server running at ${PORT}`)
  })
  .on('close', () => {
    connection.end()
  })
