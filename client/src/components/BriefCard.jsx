// import { useEffect, useRef } from 'react'

// export default function BriefCard({ brief, loading, topics = [] }) {
//   const videoRef = useRef(null)

//   // Restart video when brief loads
//   useEffect(() => {
//     if (!loading && videoRef.current) {
//       videoRef.current.currentTime = 0
//     }
//   }, [loading])

//   function parseBrief(raw) {
//   const sections = {}
//   const weatherMatch = raw.match(/##WEATHER##\n([\s\S]*?)(?=##|$)/)
//   const headlinesMatch = raw.match(/##HEADLINES##\n([\s\S]*?)(?=##|$)/)
//   const watchMatch = raw.match(/##WATCH##\n([\s\S]*?)(?=##|$)/)

//   if (weatherMatch) sections.weather = weatherMatch[1].trim()
//   if (headlinesMatch) sections.headlines = headlinesMatch[1].trim()
//   if (watchMatch) sections.watch = watchMatch[1].trim()

//   return sections
// }

//   return (
//     <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', minHeight: 380, display: 'flex', flexDirection: 'column' }}>
//       {/* video bg */}
//       <video
//         ref={videoRef}
//         autoPlay muted loop playsInline
//         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
//         src="https://cdn.coverr.co/videos/coverr-morning-newspaper-and-coffee-5765/1080p.mp4"
//       />
//       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,18,28,0.95) 0%, rgba(20,24,35,0.85) 100%)' }} />

//       <div style={{ position: 'relative', zIndex: 2, padding: 32, display: 'flex', flexDirection: 'column', flex: 1 }}>
//         {/* header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
//           <div>
//             <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,200,0.5)', display: 'block', marginBottom: 8 }}>AI Summary</span>
//             <h2 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>Today's Brief</h2>
//           </div>
//           <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '55%' }}>
//             {topics.map(t => (
//               <span key={t} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(240,230,200,0.2)', color: 'rgba(240,230,200,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* content */}
//         <div style={{ flex: 1 }}>
//           {loading && !brief ? (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {[1, 0.8, 0.9, 0.6].map((w, i) => (
//                 <div key={i} style={{ height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.07)', width: `${w * 100}%', animation: 'pulse 1.5s ease-in-out infinite` }} />
//               ))}
//             </div>
//           ) : (
//             <div style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)' }}>
//               {brief || <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Loading your brief…</span>}
//             </div>
//           )}
//         </div>

//         {/* footer */}
//         {!loading && brief && (
//           <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
//             <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
//             <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Generated just now</span>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

import { useEffect, useRef } from 'react'

function parseBrief(raw) {
  const sections = {}
  const weatherMatch = raw.match(/##WEATHER##\n([\s\S]*?)(?=##|$)/)
  const headlinesMatch = raw.match(/##HEADLINES##\n([\s\S]*?)(?=##|$)/)
  const watchMatch = raw.match(/##WATCH##\n([\s\S]*?)(?=##|$)/)

  if (weatherMatch) sections.weather = weatherMatch[1].trim()
  if (headlinesMatch) sections.headlines = headlinesMatch[1].trim()
  if (watchMatch) sections.watch = watchMatch[1].trim()

  return sections
}

export default function BriefCard({ brief, loading, topics = [] }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!loading && videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [loading])

  const sections = brief ? parseBrief(brief) : {}
  const hasSections = sections.weather || sections.headlines || sections.watch

  return (
    <div style={{
      position: 'relative', borderRadius: 24, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)', minHeight: 380,
      display: 'flex', flexDirection: 'column'
    }}>
      {/* video bg */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        src="https://cdn.coverr.co/videos/coverr-morning-newspaper-and-coffee-5765/1080p.mp4"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,18,28,0.95) 0%, rgba(20,24,35,0.85) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: 32, display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,200,0.5)', display: 'block', marginBottom: 8 }}>AI Summary</span>
            <h2 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>Today's Brief</h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '55%' }}>
            {topics.map(t => (
              <span key={t} style={{ fontSize: 10, padding: '4px 10px', borderRadius: 100, border: '1px solid rgba(240,230,200,0.2)', color: 'rgba(240,230,200,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* content */}
        <div style={{ flex: 1 }}>
          {loading && !brief ? (
            // skeleton loader
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 0.8, 0.9, 0.6].map((w, i) => (
                <div key={i} style={{ height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.07)', width: `${w * 100}%` }} />
              ))}
            </div>
          ) : hasSections ? (
            // structured sections
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {sections.weather && (
                <div>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#7dd3fc', fontWeight: 600, display: 'block', marginBottom: 6
                  }}>
                    ☁ Weather
                  </span>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)' }}>
                    {sections.weather}
                  </p>
                </div>
              )}

              {sections.headlines && (
                <div>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#f9a8d4', fontWeight: 600, display: 'block', marginBottom: 8
                  }}>
                    ◈ Headlines
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sections.headlines.split('\n').filter(l => l.trim()).map((line, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: '#f9a8d4', marginTop: 2, flexShrink: 0, fontSize: 12 }}>•</span>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                          {line.replace(/^•\s*/, '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sections.watch && (
                <div style={{
                  borderLeft: '2px solid rgba(251,191,36,0.5)',
                  paddingLeft: 14,
                }}>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#fbbf24', fontWeight: 600, display: 'block', marginBottom: 6
                  }}>
                    ⚑ Watch Today
                  </span>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)' }}>
                    {sections.watch}
                  </p>
                </div>
              )}

            </div>
          ) : (
            // fallback: plain text if sections not parsed yet (still streaming)
            <div style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap' }}>
              {brief || <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Loading your brief…</span>}
            </div>
          )}
        </div>

        {/* footer */}
        {!loading && brief && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Generated just now</span>
          </div>
        )}
      </div>
    </div>
  )
}