// import express from 'express'
// import axios from 'axios'
// import { getCache, setCache } from '../cache.js'

// const router = express.Router()

// router.get('/', async (req, res) => {
//   const topics = req.query.topics ? req.query.topics.split(',') : ['technology']
//   const cacheKey = `news_${topics.join('_')}`
//   const cached = getCache(cacheKey)
//   if (cached) return res.json(cached)

//   try {
//     const results = await Promise.all(
//       topics.map(topic =>
//         axios.get('https://newsapi.org/v2/top-headlines', {
//           params: {
//             q: topic,
//             apiKey: process.env.NEWS_API_KEY,
//             pageSize: 5,
//             language: 'en'
//           }
//         }).then(r => ({
//           topic,
//           articles: r.data.articles.map(a => ({
//             title: a.title,
//             source: a.source.name,
//             url: a.url,
//             publishedAt: a.publishedAt
//           }))
//         }))
//       )
//     )

//     setCache(cacheKey, results)
//     res.json(results)
//   } catch (err) {
//     res.status(500).json({ error: 'News fetch failed', detail: err.message })
//   }
// })

// export default router


//*********************** */

// import express from 'express'
// import axios from 'axios'
// import { getCache, setCache } from '../cache.js'

// const router = express.Router()

// router.get('/', async (req, res) => {
//   const topics = req.query.topics ? req.query.topics.split(',') : ['world']
//   const cacheKey = `news_${topics.join('_')}`
//   const cached = getCache(cacheKey)
//   if (cached) return res.json(cached)

//   try {
//     const results = await Promise.all(
//       topics.map(topic =>
//         axios.get('https://gnews.io/api/v4/search', {
//           params: {
//             q: topic,
//             token: process.env.GNEWS_API_KEY,
//             lang: 'en',
//             max: 5,
//             sortby: 'publishedAt'
//           }
//         }).then(r => ({
//           topic,
//           articles: r.data.articles.map(a => ({
//             title: a.title,
//             source: a.source.name,
//             url: a.url,
//             publishedAt: a.publishedAt,
//             description: a.description
//           }))
//         }))
//       )
//     )

//     setCache(cacheKey, results, 15)
//     res.json(results)
//   } catch (err) {
//     res.status(500).json({ error: 'News fetch failed', detail: err.message })
//   }
// })

// export default router

import express from 'express'
import axios from 'axios'
import { getCache, setCache } from '../cache.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const topics = req.query.topics ? req.query.topics.split(',') : ['world']
  const cacheKey = `news_${topics.join('_')}`
  const cached = getCache(cacheKey)
  if (cached) return res.json(cached)

  try {
    const results = await Promise.all(
      topics.map(topic =>
        axios.get('https://api.currentsapi.services/v1/search', {
          params: {
            keywords: topic,
            apiKey: process.env.CURRENTS_API_KEY,
            language: 'en',
            limit: 5
          }
        }).then(r => ({
          topic,
          articles: r.data.news.map(a => ({
            title: a.title,
            source: a.author || 'Unknown',
            url: a.url,
            publishedAt: a.published,
            description: a.description
          }))
        }))
      )
    )

    setCache(cacheKey, results, 15)
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'News fetch failed', detail: err.message })
  }
})

export default router