import { useState, useEffect, useCallback } from 'react'

export default function useBrief(settings) {
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState([])
  const [brief, setBrief] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBrief = useCallback(async () => {
    setLoading(true)
    setBrief('')
    setError(null)

    try {
      const [weatherRes, newsRes] = await Promise.all([
        fetch(`/api/weather?city=${settings.city}`).then(r => r.json()),
        fetch(`/api/news?topics=${settings.topics.join(',')}`).then(r => r.json())
      ])

      setWeather(weatherRes)
      setNews(newsRes)

      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weather: weatherRes, news: newsRes })
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setBrief(prev => prev + decoder.decode(value))
      }
    } catch (err) {
      setError('Could not load your brief. Check your API keys and server.')
    } finally {
      setLoading(false)
    }
  }, [settings])

  useEffect(() => { fetchBrief() }, [fetchBrief])

  return { brief, weather, news, loading, error, refresh: fetchBrief }
}
