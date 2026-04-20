import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import weatherRouter from './routes/weather.js'
import newsRouter from './routes/news.js'
import briefRouter from './routes/brief.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/weather', weatherRouter)
app.use('/api/news', newsRouter)
app.use('/api/brief', briefRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
