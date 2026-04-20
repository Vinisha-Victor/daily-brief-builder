// const store = {}

// export function getCache(key) {
//   const entry = store[key]
//   if (!entry) return null
//   // if (Date.now() - entry.ts > 5 * 60 * 1000) {
//   if (Date.now() - entry.ts > 10 * 60 * 1000) {  // 10 min for weather
//     delete store[key]
//     return null
//   }
//   return entry.data
// }

// export function setCache(key, data) {
//   store[key] = { data, ts: Date.now() }
// }

const store = {}

export function getCache(key) {
  const entry = store[key]
  if (!entry) return null
  if (Date.now() - entry.ts > entry.ttl) {
    delete store[key]
    return null
  }
  return entry.data
}

export function setCache(key, data, ttlMinutes = 5) {
  store[key] = { data, ts: Date.now(), ttl: ttlMinutes * 60 * 1000 }
}