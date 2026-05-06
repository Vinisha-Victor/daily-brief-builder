// import { useState } from 'react'

// const AVAILABLE_TOPICS = ['technology', 'science', 'business', 'health', 'sports', 'entertainment', 'politics']

// export default function SettingsPage({ settings, onSave, onBack }) {
//   const [city, setCity] = useState(settings.city)
//   const [topics, setTopics] = useState(settings.topics)

//   function toggleTopic(t) {
//     setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 p-4 max-w-4xl mx-auto">
//       <div className="flex items-center gap-3 mb-6">
//         <button onClick={onBack} className="text-sm text-slate-300 hover:text-slate-100">← Back</button>
//         <div>
//           <h1 className="text-2xl font-semibold text-slate-100">Settings</h1>
//           <p className="text-sm text-slate-400">Fine-tune your brief with city and topic preferences.</p>
//         </div>
//       </div>

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-5 shadow-[0_20px_80px_rgba(15,23,42,0.25)]">
//         <label className="text-xs uppercase tracking-wide text-slate-500 font-medium block mb-3">Your city</label>
//         <input
//           value={city}
//           onChange={e => setCity(e.target.value)}
//           placeholder="e.g. Kolkata"
//           className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
//         />
//       </div>

//       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-[0_20px_80px_rgba(15,23,42,0.25)]">
//         <label className="text-xs uppercase tracking-wide text-slate-500 font-medium block mb-4">News topics</label>
//         <div className="flex flex-wrap gap-2">
//           {AVAILABLE_TOPICS.map(t => (
//             <button
//               key={t}
//               onClick={() => toggleTopic(t)}
//               className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
//                 topics.includes(t)
//                   ? 'bg-slate-700 border-slate-700 text-slate-100'
//                   : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={() => onSave({ city, topics })}
//         disabled={!city || !topics.length}
//         className="w-full rounded-3xl bg-slate-700 py-3 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         Save & refresh brief
//       </button>
//     </div>
//   )
// }

import { useState } from 'react'
import { THEMES } from '../data/themes'
import { MEME_AVATARS } from '../data/memeAvatars'

const AVAILABLE_TOPICS = ['technology', 'science', 'business', 'health', 'sports', 'entertainment', 'politics', 'world']

export default function SettingsPage({ settings, onSave, onBack, onDelete }) {
  const [form, setForm] = useState({
    name:    settings?.name    || '',
    state:   settings?.state   || '',
    country: settings?.country || '',
    topics:  settings?.topics  || [],
    avatarId: settings?.avatarId || '',
    theme:   settings?.theme   || 'doge',
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const toggleTopic = (t) =>
    setForm(p => ({
      ...p,
      topics: p.topics.includes(t) ? p.topics.filter(x => x !== t) : [...p.topics, t]
    }))

  const canSave = form.name.trim() && form.state.trim() && form.country.trim() && form.topics.length > 0

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.05)', color: '#fff',
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif",
  }

  const labelStyle = {
    fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 10,
  }

  const sectionStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: 24, marginBottom: 16,
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080a0f', color: '#fff',
      fontFamily: "'DM Sans', sans-serif", padding: '0 0 60px',
    }}>
      {/* Header */}
      <div style={{ padding: '28px 32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={onBack}
          style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer' }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Settings</h1>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Edit your profile preferences</p>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Name */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Your Name</label>
          <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
        </div>

        {/* Location */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Location</label>
          <input style={{ ...inputStyle, marginBottom: 10 }} value={form.state} onChange={e => update('state', e.target.value)} placeholder="State / Region (e.g. West Bengal)" />
          <input style={inputStyle} value={form.country} onChange={e => update('country', e.target.value)} placeholder="Country (e.g. India)" />
        </div>

        {/* Topics */}
        <div style={sectionStyle}>
          <label style={labelStyle}>News Topics</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AVAILABLE_TOPICS.map(t => (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
                style={{
                  padding: '8px 16px', borderRadius: 100, fontSize: 13, cursor: 'pointer',
                  border: form.topics.includes(t) ? '1px solid #fff' : '1px solid rgba(255,255,255,0.15)',
                  background: form.topics.includes(t) ? '#fff' : 'rgba(255,255,255,0.05)',
                  color: form.topics.includes(t) ? '#000' : 'rgba(255,255,255,0.7)',
                  fontWeight: form.topics.includes(t) ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Avatar</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {MEME_AVATARS.map(a => (
              <button
                key={a.id}
                onClick={() => update('avatarId', a.id)}
                style={{
                  padding: '8px 14px', borderRadius: 12, fontSize: 13, cursor: 'pointer',
                  border: form.avatarId === a.id ? '1px solid #fff' : '1px solid rgba(255,255,255,0.12)',
                  background: form.avatarId === a.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                  color: '#fff', display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 18 }}>{a.emoji}</span> {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Theme</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.values(THEMES).map(th => (
              <button
                key={th.id}
                onClick={() => update('theme', th.id)}
                style={{
                  padding: '8px 16px', borderRadius: 12, fontSize: 13, cursor: 'pointer',
                  border: form.theme === th.id ? `1px solid ${th.accent}` : '1px solid rgba(255,255,255,0.12)',
                  background: form.theme === th.id ? th.accentSoft : 'rgba(255,255,255,0.04)',
                  color: form.theme === th.id ? th.text : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.15s',
                }}
              >
                {th.emoji} {th.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={() => canSave && onSave(form)}
          disabled={!canSave}
          style={{
            width: '100%', padding: '14px', borderRadius: 100, border: 'none',
            background: canSave ? '#fff' : 'rgba(255,255,255,0.1)',
            color: canSave ? '#000' : 'rgba(255,255,255,0.3)',
            fontSize: 14, fontWeight: 600, cursor: canSave ? 'pointer' : 'not-allowed',
            marginBottom: 12, transition: 'all 0.2s',
          }}
        >
          Save & Refresh Brief ✓
        </button>

        {/* Delete profile */}
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{
              width: '100%', padding: '14px', borderRadius: 100,
              border: '1px solid rgba(255,80,80,0.3)', background: 'rgba(255,80,80,0.06)',
              color: 'rgba(255,120,120,0.8)', fontSize: 14, cursor: 'pointer',
            }}
          >
            🗑 Delete This Profile
          </button>
        ) : (
          <div style={{ background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 20, padding: 20, textAlign: 'center' }}>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,200,200,0.9)' }}>
              Are you sure? This can't be undone.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{ padding: '10px 24px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', fontSize: 13, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
