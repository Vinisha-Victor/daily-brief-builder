// export default function BriefCard({ brief, loading, topics = [] }) {
//   const summaryPoints = !loading && brief
//     ? brief
//         .split('. ')
//         .filter(Boolean)
//         .slice(0, 3)
//         .map(line => line.replace(/\.$/, '').trim())
//     : []

//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mb-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
//         <div>
//           <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Daily Brief</p>
//           <h2 className="text-xl font-semibold text-slate-900">Today’s overview</h2>
//         </div>
//         <div className="text-sm text-slate-500">
//           <p>Curated summary across the latest headlines.</p>
//         </div>
//       </div>

//       {loading && !brief ? (
//         <div className="space-y-4">
//           <div className="h-4 rounded-full bg-slate-100 w-5/6 animate-pulse" />
//           <div className="h-4 rounded-full bg-slate-100 w-full animate-pulse" />
//           <div className="h-4 rounded-full bg-slate-100 w-4/6 animate-pulse" />
//           <div className="flex flex-wrap gap-2 mt-4">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <span key={index} className="h-8 w-20 rounded-full bg-slate-100 animate-pulse" />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4 text-sm leading-7 text-slate-700">
//             <p>{brief}</p>
//             {summaryPoints.length > 1 && (
//               <ul className="list-disc pl-5 space-y-2 text-slate-600">
//                 {summaryPoints.map((point, index) => (
//                   <li key={index}>{point}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="mt-6">
//             <p className="text-xs uppercase tracking-wide text-slate-400 mb-3">Categories</p>
//             <div className="flex flex-wrap gap-2">
//               {topics.length ? (
//                 topics.map(topic => (
//                   <span
//                     key={topic}
//                     className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
//                   >
//                     {topic}
//                   </span>
//                 ))
//               ) : (
//                 <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
//                   No categories selected
//                 </span>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }


import { useEffect, useRef } from 'react'

export default function BriefCard({ brief, loading, topics = [] }) {
  const videoRef = useRef(null)

  // Restart video when brief loads
  useEffect(() => {
    if (!loading && videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [loading])

  return (
    <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', minHeight: 380, display: 'flex', flexDirection: 'column' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 0.8, 0.9, 0.6].map((w, i) => (
                <div key={i} style={{ height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.07)', width: `${w * 100}%', animation: 'pulse 1.5s ease-in-out infinite` }} />
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)' }}>
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