const express = require('express');

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.json({ status: 'ok' }))
app.get('/health', (req, res) => res.json({ status: 'ok', data: { datetime: new Date().toISOString() } }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
