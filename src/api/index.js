const express = require('express');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.json({ status: 'ok' }))
app.get('/health', (req, res) => res.json({ status: 'ok', data: { datetime: new Date().toISOString() } }))

app.post('/reports', (req, res) => {
  const { name, image_url, latitude, longitude, details } = req.body;
  if (!details) {
    return res.status(400).json({ error: 'Details are required' });
  }
  
  // In a real app, we would insert into the database here.
  console.log('Received report:', { name, image_url, latitude, longitude, details });
  
  res.status(201).json({ status: 'created', message: 'Report submitted successfully' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
