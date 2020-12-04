import * as bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import mysql from 'mysql'

const app = express()

require('dotenv').config()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ ok: true })
})
type EventType = 'message.new' | 'channel.updated' | 'channel.created'

const getRole = (user: any) =>
  user?.company?.id === 1
    ? 'operation'
    : user?.id?.includes('employer')
    ? 'employer'
    : 'freelancer'
const handleChatEvent = (request: Request, response: Response) => {
  const data = request.body
  const type = data?.type as EventType

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  if (type === 'channel.created' || type === 'channel.updated') {
    // Add data to channel_event table
    const channel = data?.channel
    const saveData = {
      type,
      channel_id: data?.channel_id,
      company_id: channel?.companyId,
      region_id: channel?.region,
      created_at: new Date(channel?.created_at),
    }
    connection.query(
      'INSERT INTO channel_events SET ?',
      saveData,
      (error: any, results: any, fields: any) => {
        if (error) throw error
        console.log(results.insertId)
      },
    )
    return response.json({ ok: true })
  }
  if (type === 'message.new') {
    // Add data to message_event table
    const user = data?.user
    const message = data?.message
    const saveData = {
      id: message?.id,
      user_id: user?.id,
      channel_id: data?.channel_id,
      company_id: user?.company?.id,
      user_role: getRole(user),
      created_at: new Date(),
    }

    connection.query(
      'INSERT INTO message_events SET ?',
      saveData,
      (error: any, results: any, fields: any) => {
        if (error) throw error
        console.log(results.insertId)
      },
    )
  }

  response.json({ ok: true })
}
app.post('/hooks/chat', handleChatEvent)

export default app
