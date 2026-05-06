// import { useState, useEffect } from 'react'
// import SettingsPage from './components/SettingsPage'
// // import Onboarding from './components/Onboarding'
// import BriefCard from './components/BriefCard'
// import WeatherWidget from './components/WeatherWidget'
// import NewsWidget from './components/NewsWidget'
// import useBrief from './hooks/useBrief'
// import { usePreferences } from './hooks/usePreferences'

// export default function App() {
//   const { prefs: preferences, isLoading: prefsLoading, savePrefs: savePreferences } = usePreferences()
//   const [showSettings, setShowSettings] = useState(false)
//   const [onboardingDone, setOnboardingDone] = useState(false)
//   const [time, setTime] = useState(new Date())

//   // Derive settings from preferences for useBrief
//   const settings = preferences
//     ? { city: preferences.city, topics: preferences.topics }
//     : { city: 'Kolkata', topics: ['technology', 'science'] }

//   const { brief, weather, news, loading, error, refresh } = useBrief(settings)

//   useEffect(() => {
//     const t = setInterval(() => setTime(new Date()), 1000)
//     return () => clearInterval(t)
//   }, [])

//   // While preferences are loading from backend
//   if (prefsLoading) {
//     return (
//       <div style={{
//         background: '#080a0f', minHeight: '100vh', color: '#fff',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.15em',
//         fontSize: 13, textTransform: 'uppercase', color: 'rgba(240,230,200,0.5)'
//       }}>
//         Preparing your brief...
//       </div>
//     )
//   }

//   // Show onboarding if no preferences saved yet
//   if (!preferences || !onboardingDone) {
//     return (
//       <Onboarding
//         onComplete={(prefs) => {
//           savePreferences(prefs)
//           setOnboardingDone(true)
//         }}
//       />
//     )
//   }

//   // Show settings page
//   if (showSettings) {
//     return (
//       <SettingsPage
//         settings={preferences}
//         onSave={(newPrefs) => {
//           savePreferences(newPrefs)
//           setShowSettings(false)
//         }}
//         onBack={() => setShowSettings(false)}
//       />
//     )
//   }

//   const hour = time.getHours()
//   const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
//   const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
//   const dateStr = time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

//   return (
//     <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: '#080a0f', minHeight: '100vh', color: '#fff' }}>

//       {/* HERO HEADER */}
//       <header style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         {/* video background */}
//         <video
//           autoPlay muted loop playsInline
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
//           src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4760/1080p.mp4"
//         />
//         {/* gradient overlay */}
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,10,15,0.3) 0%, rgba(8,10,15,0.1) 40%, rgba(8,10,15,0.9) 85%, #080a0f 100%)' }} />

//         {/* top nav */}
//         <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 40px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f0e6c8', boxShadow: '0 0 12px #f0e6c8' }} />
//             <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f0e6c8' }}>Daily Brief</span>
//           </div>
//           <div style={{ display: 'flex', gap: 12 }}>
//             <button onClick={refresh} style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', letterSpacing: '0.05em', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}>
//               ↻ Refresh
//             </button>
//             <button onClick={() => setShowSettings(true)} style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(240,230,200,0.4)', background: 'rgba(240,230,200,0.1)', color: '#f0e6c8', cursor: 'pointer', letterSpacing: '0.05em', backdropFilter: 'blur(10px)' }}>
//               Settings
//             </button>
//           </div>
//         </nav>

//         {/* hero content */}
//         <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 56px' }}>
//           <p style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,200,0.6)', marginBottom: 16 }}>{dateStr}</p>
//           <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
//             {greeting}{preferences?.name ? `, ${preferences.name}` : ''}.
//           </h1>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, flexWrap: 'wrap', gap: 16 }}>
//             <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 500, lineHeight: 1.6, margin: 0 }}>
//               Your curated intelligence briefing — {settings.topics.join(', ')}, and the world as it unfolds.
//             </p>
//             <div style={{ fontFamily: 'monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
//               {timeStr}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
//         {error && (
//           <div style={{ margin: '32px 0', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,80,80,0.3)', background: 'rgba(255,80,80,0.08)', color: '#ff8080', fontSize: 13 }}>
//             {error}
//           </div>
//         )}

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 40 }}>
//           <BriefCard brief={brief} loading={loading} topics={settings.topics} />
//           <WeatherWidget weather={weather} loading={loading} />
//         </div>

//         <div style={{ marginTop: 20 }}>
//           <NewsWidget news={news} loading={loading} />
//         </div>
//       </main>
//     </div>
//   )
// }


//*************************** */

// import { useState, useEffect } from 'react'
// import { useProfiles } from './hooks/useProfiles'
// import { THEMES } from './data/themes'
// import ProfileSelector from './components/ProfileSelector'
// import ProfileCreator from './components/ProfileCreator'
// import SettingsPage from './components/SettingsPage'
// import BriefCard from './components/BriefCard'
// import WeatherWidget from './components/WeatherWidget'
// import NewsWidget from './components/NewsWidget'
// import useBrief from './hooks/useBrief'

// export default function App() {
//   const { profiles, activeProfile, activeId, createProfile, switchProfile, updateProfile } = useProfiles()
//   const [view, setView] = useState('loading') // loading | select | create | main | settings
//   const [time, setTime] = useState(new Date())

//   // Decide which screen to show on mount
//   useEffect(() => {
//     const hasProfiles = Object.keys(profiles).length > 0
//     if (!hasProfiles) {
//       setView('create')
//     } else if (!activeId) {
//       setView('select')
//     } else {
//       setView('main')
//     }
//   }, [])

//   useEffect(() => {
//     const t = setInterval(() => setTime(new Date()), 1000)
//     return () => clearInterval(t)
//   }, [])

//   // Build settings for useBrief from active profile
//   const briefSettings = activeProfile
//     ? { state: activeProfile.state, country: activeProfile.country, topics: activeProfile.topics }
//     : { state: 'West Bengal', country: 'India', topics: ['technology', 'science'] }

//   const { brief, weather, news, loading, error, refresh } = useBrief(briefSettings)

//   const theme = THEMES[activeProfile?.theme] || THEMES['doge']

//   // ── PROFILE SELECT SCREEN ──
//   if (view === 'select') {
//     return (
//       <ProfileSelector
//         profiles={profiles}
//         onSelect={(id) => { switchProfile(id); setView('main') }}
//         onCreateNew={() => setView('create')}
//       />
//     )
//   }

//   // ── PROFILE CREATE SCREEN ──
//   if (view === 'create') {
//     return (
//       <ProfileCreator
//         onComplete={(formData) => {
//           createProfile(formData)
//           setView('main')
//         }}
//         onBack={() => {
//           const hasProfiles = Object.keys(profiles).length > 0
//           setView(hasProfiles ? 'select' : 'create')
//         }}
//       />
//     )
//   }

//   // ── SETTINGS SCREEN ──
//   if (view === 'settings') {
//     return (
//       <SettingsPage
//         settings={activeProfile}
//         onSave={(updated) => { updateProfile(activeId, updated); setView('main') }}
//         onBack={() => setView('main')}
//       />
//     )
//   }

//   // ── MAIN APP ──
//   const hour = time.getHours()
//   const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
//   const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
//   const dateStr = time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

//   return (
//     <div style={{
//       fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
//       background: theme.bg,
//       minHeight: '100vh',
//       color: theme.text,
//       position: 'relative',
//     }}>

//       {/* Meme bg image overlay */}
//       {theme.bgImage && (
//         <div style={{
//           position: 'fixed', inset: 0, zIndex: 0,
//           backgroundImage: `url(${theme.bgImage})`,
//           backgroundSize: 'cover', backgroundPosition: 'center',
//           opacity: 0.04, pointerEvents: 'none',
//         }} />
//       )}

//       {/* HERO HEADER */}
//       <header style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1 }}>
//         <video
//           autoPlay muted loop playsInline
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
//           src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4760/1080p.mp4"
//         />
//         <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${theme.bg}55 0%, ${theme.bg}22 40%, ${theme.bg}dd 85%, ${theme.bg} 100%)` }} />

//         {/* NAV */}
//         <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 40px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.accent, boxShadow: `0 0 12px ${theme.accent}` }} />
//             <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: theme.accent }}>Daily Brief</span>
//           </div>
//           <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
//             {/* Profile switcher */}
//             <button
//               onClick={() => setView('select')}
//               style={{ fontSize: 12, padding: '8px 16px', borderRadius: 100, border: `1px solid ${theme.border}`, background: theme.accentSoft, color: theme.text, cursor: 'pointer', letterSpacing: '0.05em' }}
//             >
//               👤 {activeProfile?.name}
//             </button>
//             <button
//               onClick={refresh}
//               style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: theme.text, cursor: 'pointer', letterSpacing: '0.05em' }}
//             >
//               ↻ {theme.phrases.refresh}
//             </button>
//             <button
//               onClick={() => setView('settings')}
//               style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: `1px solid ${theme.border}`, background: theme.accentSoft, color: theme.accent, cursor: 'pointer', letterSpacing: '0.05em' }}
//             >
//               {theme.phrases.settings}
//             </button>
//           </div>
//         </nav>

//         {/* HERO CONTENT */}
//         <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 56px' }}>
//           <p style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.subtext, marginBottom: 16 }}>{dateStr}</p>
//           <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, color: theme.text }}>
//             {greeting}, {activeProfile?.name}.<br />
//             <span style={{ color: theme.accent, fontSize: '0.55em', fontWeight: 400, letterSpacing: '0.01em' }}>
//               {theme.phrases.greeting_suffix}
//             </span>
//           </h1>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, flexWrap: 'wrap', gap: 16 }}>
//             <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: theme.subtext, maxWidth: 500, lineHeight: 1.6, margin: 0 }}>
//               📍 {activeProfile?.state}, {activeProfile?.country} · {activeProfile?.topics?.join(', ')}
//             </p>
//             <div style={{ fontFamily: 'monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200, color: theme.subtext, letterSpacing: '0.05em' }}>
//               {timeStr}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
//         {error && (
//           <div style={{ margin: '32px 0', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,80,80,0.3)', background: 'rgba(255,80,80,0.08)', color: '#ff8080', fontSize: 13 }}>
//             {error}
//           </div>
//         )}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 40 }}>
//           <BriefCard brief={brief} loading={loading} topics={briefSettings.topics} theme={theme} />
//           <WeatherWidget weather={weather} loading={loading} theme={theme} />
//         </div>
//         <div style={{ marginTop: 20 }}>
//           <NewsWidget news={news} loading={loading} theme={theme} />
//         </div>
//       </main>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { useProfiles } from './hooks/useProfiles'
import { THEMES } from './data/themes'
import ProfileSelector from './components/ProfileSelector'
import ProfileCreator from './components/ProfileCreator'
import SettingsPage from './components/SettingsPage'
import BriefCard from './components/BriefCard'
import WeatherWidget from './components/WeatherWidget'
import NewsWidget from './components/NewsWidget'
import useBrief from './hooks/useBrief'


export default function App() {
  //const { profiles, activeProfile, activeId, createProfile, switchProfile, updateProfile } = useProfiles()
  const [view, setView] = useState('loading')
  const [time, setTime] = useState(new Date())
  const { profiles, activeProfile, activeId, createProfile, switchProfile, updateProfile, deleteProfile } = useProfiles()

  // Re-evaluate view whenever activeId or profiles changes
  useEffect(() => {
    const hasProfiles = Object.keys(profiles).length > 0
    if (!hasProfiles) {
      setView('create')
    } else if (!activeId) {
      setView('select')
    } else {
      setView('main')
    }
  }, [activeId, JSON.stringify(profiles)])

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const briefSettings = activeProfile
    ? { state: activeProfile.state, country: activeProfile.country, topics: activeProfile.topics }
    : { state: 'West Bengal', country: 'India', topics: ['technology', 'science'] }

  const { brief, weather, news, loading, error, refresh } = useBrief(briefSettings)
  const theme = THEMES[activeProfile?.theme] || THEMES['doge']

  // ── LOADING ──
  if (view === 'loading') {
    return (
      <div style={{
        background: '#080a0f', minHeight: '100vh', color: 'rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        letterSpacing: '0.2em', textTransform: 'uppercase',
      }}>
        loading...
      </div>
    )
  }

  // ── SELECT ──
  if (view === 'select') {
    return (
      <ProfileSelector
        profiles={profiles}
        onSelect={(id) => switchProfile(id)}
        onCreateNew={() => setView('create')}
      />
    )
  }

  // ── CREATE ──
  if (view === 'create') {
    return (
      <ProfileCreator
        onComplete={(formData) => createProfile(formData)}
        onBack={() => {
          const hasProfiles = Object.keys(profiles).length > 0
          setView(hasProfiles ? 'select' : 'create')
        }}
      />
    )
  }

  // ── SETTINGS ──
  // if (view === 'settings') {
  //   return (
  //     <SettingsPage
  //       settings={activeProfile}
  //       onSave={(updated) => { updateProfile(activeId, updated); setView('main') }}
  //       onBack={() => setView('main')}
  //     />
  //   )
  // }

  if (view === 'settings') {
  return (
    <SettingsPage
      settings={activeProfile}
      onSave={(updated) => { updateProfile(activeId, updated); setView('main') }}
      onBack={() => setView('main')}
      onDelete={() => { deleteProfile(activeId) }} // useEffect handles redirect
    />
  )
}

  // ── MAIN APP ──
  const hour = time.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  const dateStr = time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: theme.bg, minHeight: '100vh',
      color: theme.text, position: 'relative',
    }}>
      {theme.bgImage && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          backgroundImage: `url(${theme.bgImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.04, pointerEvents: 'none',
        }} />
      )}

      <header style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1 }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          src="https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4760/1080p.mp4"
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${theme.bg}55 0%, ${theme.bg}22 40%, ${theme.bg}dd 85%, ${theme.bg} 100%)` }} />

        <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.accent, boxShadow: `0 0 12px ${theme.accent}` }} />
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: theme.accent }}>Daily Brief</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setView('select')}
              style={{ fontSize: 12, padding: '8px 16px', borderRadius: 100, border: `1px solid ${theme.border}`, background: theme.accentSoft, color: theme.text, cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              👤 {activeProfile?.name}
            </button>
            <button
              onClick={refresh}
              style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: theme.text, cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              ↻ {theme.phrases.refresh}
            </button>
            <button
              onClick={() => setView('settings')}
              style={{ fontSize: 12, padding: '8px 20px', borderRadius: 100, border: `1px solid ${theme.border}`, background: theme.accentSoft, color: theme.accent, cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              {theme.phrases.settings}
            </button>
          </div>
        </nav>

        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 56px' }}>
          <p style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.subtext, marginBottom: 16 }}>{dateStr}</p>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, color: theme.text }}>
            {greeting}, {activeProfile?.name}.<br />
            <span style={{ color: theme.accent, fontSize: '0.55em', fontWeight: 400, letterSpacing: '0.01em' }}>
              {theme.phrases.greeting_suffix}
            </span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: theme.subtext, maxWidth: 500, lineHeight: 1.6, margin: 0 }}>
              📍 {activeProfile?.state}, {activeProfile?.country} · {activeProfile?.topics?.join(', ')}
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200, color: theme.subtext, letterSpacing: '0.05em' }}>
              {timeStr}
            </div>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        {error && (
          <div style={{ margin: '32px 0', padding: '16px 24px', borderRadius: 16, border: '1px solid rgba(255,80,80,0.3)', background: 'rgba(255,80,80,0.08)', color: '#ff8080', fontSize: 13 }}>
            {error}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 40 }}>
          <BriefCard brief={brief} loading={loading} topics={briefSettings.topics} theme={theme} />
          <WeatherWidget weather={weather} loading={loading} theme={theme} />
        </div>
        <div style={{ marginTop: 20 }}>
          <NewsWidget news={news} loading={loading} theme={theme} />
        </div>
      </main>
    </div>
  )
}