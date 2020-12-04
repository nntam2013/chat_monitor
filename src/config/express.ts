import * as bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

const app = express()

require('dotenv').config()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ ok: true })
})

const handleChatEvent = (request: Request, response: Response) => {
  console.log('------------POST-------')
  console.log(request.body)
  const data = request.body
  response.json({ ok: true })
}
app.post('/hooks/chat', handleChatEvent)

export default app
