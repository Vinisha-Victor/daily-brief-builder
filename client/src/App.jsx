// import { useState } from 'react'
// import SettingsPage from './components/SettingsPage'
// import BriefCard from './components/BriefCard'
// import WeatherWidget from './components/WeatherWidget'
// import NewsWidget from './components/NewsWidget'
// import useBrief from './hooks/useBrief'

// const DEFAULT_SETTINGS = {
//   city: 'Kolkata',
//   topics: ['technology', 'science']
// }

// export default function App() {
//   const [settings, setSettings] = useState(
//     () => JSON.parse(localStorage.getItem('brief_settings') || JSON.stringify(DEFAULT_SETTINGS))
//   )
//   const [showSettings, setShowSettings] = useState(false)
//   const { brief, weather, news, loading, error, refresh } = useBrief(settings)

//   function saveSettings(newSettings) {
//     localStorage.setItem('brief_settings', JSON.stringify(newSettings))
//     setSettings(newSettings)
//     setShowSettings(false)
//   }

//   if (showSettings) return <SettingsPage settings={settings} onSave={saveSettings} onBack={() => setShowSettings(false)} />

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 max-w-4xl mx-auto">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-slate-900">Daily Brief</h1>
//           <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <button onClick={refresh} className="text-sm px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100">
//             Refresh
//           </button>
//           <button onClick={() => setShowSettings(true)} className="text-sm px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100">
//             Settings
//           </button>
//         </div>
//       </div>

//       {error && <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

//       <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr] mb-6">
//         <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//           <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">Snapshot</p>
//           <h2 className="text-lg font-semibold text-slate-900">A polished start to your day</h2>
//           <p className="mt-3 text-sm leading-6 text-slate-600">
//             This brief gives you the most relevant headlines, the weather outlook, and the topics you care about—without the noise.
//           </p>
//         </div>
//         <div className="space-y-4">
//           <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//             <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">Top categories</p>
//             <div className="flex flex-wrap gap-2">
//               {settings.topics.map(topic => (
//                 <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
//                   {topic}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//             <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">Location</p>
//             <p className="text-base font-semibold text-slate-900">{settings.city}</p>
//             <p className="mt-2 text-sm text-slate-600">Adjust your preferences in Settings for a more refined brief.</p>
//           </div>
//         </div>
//       </div>

//       <BriefCard brief={brief} loading={loading} topics={settings.topics} />
//       <WeatherWidget weather={weather} loading={loading} />
//       <NewsWidget news={news} loading={loading} />
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import SettingsPage from './components/SettingsPage'
import BriefCard from './components/BriefCard'
import WeatherWidget from './components/WeatherWidget'
import NewsWidget from './components/NewsWidget'
import useBrief from './hooks/useBrief'

const DEFAULT_SETTINGS = {
  city: 'Kolkata',
  topics: ['technology', 'science']
}

export default function App() {
  const [settings, setSettings] = useState(
    () => JSON.parse(localStorage.getItem('brief_settings') || JSON.stringify(DEFAULT_SETTINGS))
  )
  const [showSettings, setShowSettings] = useState(false)
  const [time, setTime] = useState(new Date())
  const { brief, weather, news, loading, error, refresh } = useBrief(settings)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function saveSettings(newSettings) {
    localStorage.setItem('brief_settings', JSON.stringify(newSettings))
    setSettings(newSettings)
    setShowSettings(false)
  }

  if (showSettings) return <SettingsPage settings={settings} onSave={saveSettings} onBack={() => setShowSettings(false)} />

  const hour = time.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  const dateStr = time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: '#080a0f', minHeight: '100vh', color: '#fff' }}>

      {/* HERO HEADER — full viewport with video bg */}
      <header style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* video background */}
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4760/1080p.mp4"
        />
        {/* gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,10,15,0.3) 0%, rgba(8,10,15,0.1) 40%, rgba(8,10,15,0.9) 85%, #080a0f 100%)' }} />

        {/* top nav */}
        <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f0e6c8', boxShadow: '0 0 12px #f0e6c8' }} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f0e6c8' }}>Daily Brief</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={refresh} style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', letterSpacing: '0.05em', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}>
              ↻ Refresh
            </button>
            <button onClick={() => setShowSettings(true)} style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(240,230,200,0.4)', background: 'rgba(240,230,200,0.1)', color: '#f0e6c8', cursor: 'pointer', letterSpacing: '0.05em', backdropFilter: 'blur(10px)' }}>
              Settings
            </button>
          </div>
        </nav>

        {/* hero content */}
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 56px' }}>
          <p style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,200,0.6)', marginBottom: 16 }}>{dateStr}</p>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
            {greeting}.
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 500, lineHeight: 1.6, margin: 0 }}>
              Your curated intelligence briefing — {settings.topics.join(', ')}, and the world as it unfolds.
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
              {timeStr}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {error && (
          <div style={{ margin: '32px 0', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,80,80,0.3)', background: 'rgba(255,80,80,0.08)', color: '#ff8080', fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Brief + Weather side by side on large screens */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 40 }}>
          <BriefCard brief={brief} loading={loading} topics={settings.topics} />
          <WeatherWidget weather={weather} loading={loading} />
        </div>

        {/* News section */}
        <div style={{ marginTop: 20 }}>
          <NewsWidget news={news} loading={loading} />
        </div>
      </main>
    </div>
  )
}