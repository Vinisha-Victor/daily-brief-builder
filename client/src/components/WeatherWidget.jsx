// // const icons = { Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️' }

// // export default function WeatherWidget({ weather, loading }) {
// //   if (loading) return <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 h-24 animate-pulse" />
// //   if (!weather) return null

// //   return (
// //     <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
// //       <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Weather · {weather.city}</p>
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-3">
// //           <span style={{ fontSize: 32 }}>{icons[weather.current.condition] || '🌤️'}</span>
// //           <div>
// //             <p className="text-2xl font-medium text-gray-900">{weather.current.temp}°C</p>
// //             <p className="text-sm text-gray-400 capitalize">{weather.current.description}</p>
// //           </div>
// //         </div>
// //         <div className="text-right text-sm text-gray-400">
// //           <p>Feels {weather.current.feels_like}°C</p>
// //           <p>Humidity {weather.current.humidity}%</p>
// //         </div>
// //       </div>
// //       <div className="flex gap-2 mt-4">
// //         {weather.forecast.map((d, i) => (
// //           <div key={i} className="flex-1 bg-gray-50 rounded-xl p-2 text-center">
// //             <p className="text-xs text-gray-400">{i === 0 ? 'Today' : d.time?.slice(5)}</p>
// //             <p style={{ fontSize: 16 }}>{icons[d.condition] || '🌤️'}</p>
// //             <p className="text-sm font-medium text-gray-700">{d.temp}°</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }


// const icons = { Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️' }

// export default function WeatherWidget({ weather, loading }) {
//   if (loading) return <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 h-24 animate-pulse" />
//   if (!weather) return null

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
//       <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Weather · {weather.city}, {weather.country}</p>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <span style={{ fontSize: 32 }}>{icons[weather.current.condition] || '🌤️'}</span>
//           <div>
//             <p className="text-2xl font-medium text-gray-900">{weather.current.temp}°C</p>
//             <p className="text-sm text-gray-400 capitalize">{weather.current.description}</p>
//           </div>
//         </div>
//         <div className="text-right text-sm text-gray-400">
//           <p>Feels {weather.current.feels_like}°C</p>
//           <p>Humidity {weather.current.humidity}%</p>
//           <p>Wind {weather.current.wind_speed} m/s</p>
//         </div>
//       </div>
//       <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50 text-sm text-gray-400">
//         <p>↑ {weather.current.temp_max}°  ↓ {weather.current.temp_min}°</p>
//         <p>Visibility {weather.current.visibility} km</p>
//         <p className="ml-auto">{weather.localTime}</p>
//       </div>
//     </div>
//   )
// }

const icons = { Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️' }

const weatherVideos = {
  Clear: 'https://cdn.coverr.co/videos/coverr-sunny-beach-1503/1080p.mp4',
  Clouds: 'https://cdn.coverr.co/videos/coverr-cloudy-sky-3310/1080p.mp4',
  Rain: 'https://cdn.coverr.co/videos/coverr-rain-on-window-4248/1080p.mp4',
  Thunderstorm: 'https://cdn.coverr.co/videos/coverr-stormy-sky-7289/1080p.mp4',
  Snow: 'https://cdn.coverr.co/videos/coverr-snow-falling-6173/1080p.mp4',
  default: 'https://cdn.coverr.co/videos/coverr-clouds-moving-1511/1080p.mp4'
}

export default function WeatherWidget({ weather, loading }) {
  if (loading && !weather) return (
    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', minHeight: 380, background: 'rgba(255,255,255,0.03)', animation: 'pulse 1.5s ease-in-out infinite' }} />
  )
  if (!weather) return null

  const videoSrc = weatherVideos[weather.current.condition] || weatherVideos.default

  return (
    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', minHeight: 380, display: 'flex', flexDirection: 'column' }}>
      {/* weather-matched video */}
      <video
        autoPlay muted loop playsInline key={videoSrc}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        src={videoSrc}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,18,35,0.92) 0%, rgba(15,25,45,0.8) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 32, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(180,210,255,0.5)', display: 'block', marginBottom: 8 }}>Weather</span>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{weather.city}, {weather.country}</p>
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 64 }}>{icons[weather.current.condition] || '🌤️'}</div>
          <div style={{ fontSize: 72, fontWeight: 200, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {weather.current.temp}°
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize', marginTop: 8 }}>
            {weather.current.description}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Feels like', val: `${weather.current.feels_like}°C` },
            { label: 'Humidity', val: `${weather.current.humidity}%` },
            { label: 'Wind', val: `${weather.current.wind_speed} m/s` },
            { label: 'High', val: `${weather.current.temp_max}°` },
            { label: 'Low', val: `${weather.current.temp_min}°` },
            { label: 'Visibility', val: `${weather.current.visibility} km` },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>{label}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}