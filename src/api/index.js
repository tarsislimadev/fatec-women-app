const { db } = require('./database.js')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (_, res) => res.json({ status: 'ok', data: null, message: null }))

app.get('/health', async (_, res) => {
  const results = await db.query('SELECT NOW() as now')
  res.json({ status: 'ok', data: { datetime: new Date().toISOString(), now: results.rows[0].now }, message: null })
})

app.post('/reports', async (req, res) => {
  const { name, image_url, latitude, longitude, details } = req.body
  if (!details) return res.status(400).json({ status: 'error', data: null, message: 'Details are required' })

  await db.query(
    'INSERT INTO reports (name, image_url, latitude, longitude, details) VALUES ($1, $2, $3, $4, $5)',
    [name, image_url, latitude, longitude, details],
  )

  res.status(201).json({ status: 'created', data: null, message: null })
})

app.get('/reports', async (req, res) => {
  const result = await db.query('SELECT * FROM reports ORDER BY created_at DESC')
  res.json({ status: 'ok', data: result.rows, message: null })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))
