import { useState } from 'react'

const AVAILABLE_TOPICS = ['technology', 'science', 'business', 'health', 'sports', 'entertainment', 'politics']

export default function SettingsPage({ settings, onSave, onBack }) {
  const [city, setCity] = useState(settings.city)
  const [topics, setTopics] = useState(settings.topics)

  function toggleTopic(t) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-sm text-slate-300 hover:text-slate-100">← Back</button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Settings</h1>
          <p className="text-sm text-slate-400">Fine-tune your brief with city and topic preferences.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-5 shadow-[0_20px_80px_rgba(15,23,42,0.25)]">
        <label className="text-xs uppercase tracking-wide text-slate-500 font-medium block mb-3">Your city</label>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="e.g. Kolkata"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-[0_20px_80px_rgba(15,23,42,0.25)]">
        <label className="text-xs uppercase tracking-wide text-slate-500 font-medium block mb-4">News topics</label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TOPICS.map(t => (
            <button
              key={t}
              onClick={() => toggleTopic(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                topics.includes(t)
                  ? 'bg-slate-700 border-slate-700 text-slate-100'
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSave({ city, topics })}
        disabled={!city || !topics.length}
        className="w-full rounded-3xl bg-slate-700 py-3 text-sm font-semibold text-slate-100 shadow-sm transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save & refresh brief
      </button>
    </div>
  )
}
