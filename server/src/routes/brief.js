import express from 'express'
import axios from 'axios'

const router = express.Router()

router.post('/', async (req, res) => {
  const { weather, news } = req.body

  const newsLines = news.map(n =>
    `${n.topic.toUpperCase()}: ${n.articles.slice(0, 3).map(a => a.title).join(' | ')}`
  ).join('\n')

  try {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Transfer-Encoding', 'chunked')

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        stream: true,
        max_tokens: 300,
        messages: [
          {
            role: 'system',
           // content: 'You are a sharp morning briefer. Write exactly 4 sentences: one about the weather and what to wear/expect, two synthesizing the key news themes (not individual stories), one on what to keep an eye on today. Be specific, warm, and direct. No bullet points, no headers.'
           content: `You are a sharp morning news editor. Structure your response exactly like this:

**Weather** — one sentence on conditions and what to wear/carry.

**Top Stories**
- [Topic]: one crisp sentence on the key development
- [Topic]: one crisp sentence on the key development
- [Topic]: one crisp sentence on the key development

**Watch Today** — one sentence on the most important ongoing story to follow.

Be specific with facts, names, and numbers. No filler phrases. Journalist tone.`
          },
          {
            role: 'user',
            content: `Weather in ${weather.city}: ${weather.current.temp}°C, ${weather.current.description}, humidity ${weather.current.humidity}%.\n\nToday's headlines:\n${newsLines}`
          }
        ]
      },
      {
        responseType: 'stream',
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` }
      }
    )

    response.data.on('data', chunk => {
      const lines = chunk.toString().split('\n').filter(l => l.startsWith('data: ') && !l.includes('[DONE]'))
      for (const line of lines) {
        try {
          const json = JSON.parse(line.slice(6))
          const text = json.choices?.[0]?.delta?.content
          if (text) res.write(text)
        } catch {}
      }
    })

    response.data.on('end', () => res.end())
    response.data.on('error', () => res.status(500).end())

  } catch (err) {
    res.status(500).json({ error: 'Brief generation failed', detail: err.message })
  }
})

export default router
