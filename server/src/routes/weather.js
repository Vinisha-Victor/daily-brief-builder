// import express from 'express'
// import axios from 'axios'
// import { getCache, setCache } from '../cache.js'

// const router = express.Router()

// router.get('/', async (req, res) => {
//   const city = req.query.city || 'Kolkata'
//   const cacheKey = `weather_${city}`
//   const cached = getCache(cacheKey)
//   if (cached) return res.json(cached)

//   try {
//     const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
//       params: {
//         q: city,
//         appid: process.env.WEATHER_API_KEY,
//         units: 'metric',
//         cnt: 24
//       }
//     })

//     const result = {
//       city: data.city.name,
//       current: {
//         temp: Math.round(data.list[0].main.temp),
//         feels_like: Math.round(data.list[0].main.feels_like),
//         condition: data.list[0].weather[0].main,
//         description: data.list[0].weather[0].description,
//         humidity: data.list[0].main.humidity,
//       },
//       forecast: [0, 8, 16].map(i => ({
//         time: data.list[i]?.dt_txt?.slice(0, 10),
//         temp: Math.round(data.list[i]?.main.temp),
//         condition: data.list[i]?.weather[0].main
//       }))
//     }

//     setCache(cacheKey, result)
//     res.json(result)
//   } catch (err) {
//     res.status(500).json({ error: 'Weather fetch failed', detail: err.message })
//   }
// })

// export default router


import express from 'express'
import axios from 'axios'
import { getCache, setCache } from '../cache.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const city = req.query.city || 'Kolkata'
  const cacheKey = `weather_${city}`
  const cached = getCache(cacheKey)
  if (cached) return res.json(cached)

  try {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric'
      }
    })

    const result = {
      city: data.name,
      country: data.sys.country,
      localTime: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
      current: {
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        visibility: data.visibility / 1000
      }
    }

    setCache(cacheKey, result, 10) // cache for 10 min only
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Weather fetch failed', detail: err.message })
  }
})

export default router