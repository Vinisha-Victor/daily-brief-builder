// export default function NewsWidget({ news, loading }) {
//   if (loading) return <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-6 h-48 animate-pulse" />
//   if (!news?.length) return null

//   return (
//     <div className="space-y-4">
//       {news.map(({ topic, articles }) => (
//         <div key={topic} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
//           <p className="text-xs uppercase tracking-wide text-slate-400 mb-4">{topic}</p>
//           <div className="space-y-4">
//             {articles.map((a, i) => (
//               <a
//                 key={i}
//                 href={a.url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
//               >
//                 <p className="text-sm font-medium text-slate-900 leading-6">{a.title}</p>
//                 <p className="text-xs text-slate-500 mt-2">{a.source}</p>
//               </a>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


import { useState } from 'react'

const topicVideos = {
  technology: 'https://cdn.coverr.co/videos/coverr-typing-on-keyboard-6332/1080p.mp4',
  science: 'https://cdn.coverr.co/videos/coverr-microscope-lab-7291/1080p.mp4',
  business: 'https://cdn.coverr.co/videos/coverr-new-york-stock-exchange-5765/1080p.mp4',
  world: 'https://cdn.coverr.co/videos/coverr-earth-from-space-1511/1080p.mp4',
  sports: 'https://cdn.coverr.co/videos/coverr-running-track-1578/1080p.mp4',
  health: 'https://cdn.coverr.co/videos/coverr-heart-rate-monitor-3248/1080p.mp4',
  default: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-city-at-night-4760/1080p.mp4'
}

function NewsCategory({ topic, articles }) {
  const [open, setOpen] = useState(false)
  const videoSrc = topicVideos[topic.toLowerCase()] || topicVideos.default

  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s' }}>
      {/* Category header — clickable */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', overflow: 'hidden', minHeight: 80 }}
      >
        {/* video bg in header */}
        <video
          autoPlay muted loop playsInline key={videoSrc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: open ? 0.22 : 0.12, transition: 'opacity 0.4s' }}
          src={videoSrc}
        />
        <div style={{ position: 'absolute', inset: 0, background: open ? 'rgba(10,14,24,0.85)' : 'rgba(10,14,24,0.92)', transition: 'background 0.4s' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            {topic === 'technology' ? '⚡' : topic === 'science' ? '🔬' : topic === 'business' ? '📈' : topic === 'world' ? '🌍' : topic === 'sports' ? '🏃' : topic === 'health' ? '🩺' : '📰'}
          </div>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 3px' }}>Category</p>
            <p style={{ fontSize: 16, fontWeight: 500, color: '#fff', margin: 0, textTransform: 'capitalize' }}>{topic}</p>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{articles.length} stories</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: 14, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            ↓
          </div>
        </div>
      </button>

      {/* Dropdown articles */}
      <div style={{ maxHeight: open ? 2000 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(8,10,15,0.8)' }}>
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 450, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.55, flex: 1 }}>{a.title}</p>
                <span style={{ fontSize: 18, opacity: 0.3, flexShrink: 0, marginTop: 2 }}>↗</span>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>{a.source}</span>
                {a.publishedAt && (
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
                    {new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NewsWidget({ news, loading }) {
  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: 80, borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
      ))}
    </div>
  )
  if (!news?.length) return null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Top Headlines</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {news.map(({ topic, articles }) => (
          <NewsCategory key={topic} topic={topic} articles={articles} />
        ))}
      </div>
    </div>
  )
}