// src/components/ProfileCreator.jsx
import { useState } from "react";
import { MEME_AVATARS } from "../data/memeAvatars";
import { THEMES } from "../data/themes";

const TOPICS = ["Technology", "Science", "Business", "Health", "Sports", "World", "Entertainment", "Politics"];

export default function ProfileCreator({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    state: "",
    country: "",
    topics: [],
    avatarId: "",
    theme: "",
  });

  const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));
  const next = () => setStep((s) => s + 1);
  const back = () => (step === 1 ? onBack() : setStep((s) => s - 1));

  const toggleTopic = (t) =>
    setForm((p) => ({
      ...p,
      topics: p.topics.includes(t) ? p.topics.filter((x) => x !== t) : [...p.topics, t],
    }));

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)", color: "#fff",
    fontSize: 15, outline: "none", boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
  };

  const btnPrimary = (disabled) => ({
    padding: "12px 28px", borderRadius: 100,
    border: "none", background: disabled ? "rgba(255,255,255,0.1)" : "#fff",
    color: disabled ? "rgba(255,255,255,0.3)" : "#000",
    fontWeight: 600, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
  });

  const btnSecondary = {
    padding: "12px 28px", borderRadius: 100,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent", color: "rgba(255,255,255,0.5)",
    fontSize: 14, cursor: "pointer",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#080a0f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'DM Sans', sans-serif", color: "#fff",
    }}>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
        {[1,2,3,4].map((s) => (
          <div key={s} style={{
            width: s === step ? 24 : 8, height: 8, borderRadius: 100,
            background: s === step ? "#fff" : s < step ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* STEP 1 — Name */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300, margin: 0 }}>What's your name?</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: 14 }}>
              This is how your brief will greet you every morning.
            </p>
            <input
              style={inputStyle}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoFocus
            />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={btnSecondary} onClick={back}>← Back</button>
              <button style={btnPrimary(!form.name.trim())} onClick={next} disabled={!form.name.trim()}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Location */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300, margin: 0 }}>Where are you based?</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: 14 }}>
              Used for weather and region-relevant news.
            </p>
            <input
              style={inputStyle}
              placeholder="State / Region (e.g. West Bengal)"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              autoFocus
            />
            <input
              style={inputStyle}
              placeholder="Country (e.g. India)"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={btnSecondary} onClick={back}>← Back</button>
              <button
                style={btnPrimary(!form.state.trim() || !form.country.trim())}
                onClick={next}
                disabled={!form.state.trim() || !form.country.trim()}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Topics */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300, margin: 0 }}>What do you care about?</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: 14 }}>
              Pick at least one topic for your news brief.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTopic(t)}
                  style={{
                    padding: "10px 18px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                    border: form.topics.includes(t) ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                    background: form.topics.includes(t) ? "#fff" : "rgba(255,255,255,0.06)",
                    color: form.topics.includes(t) ? "#000" : "#fff",
                    fontWeight: form.topics.includes(t) ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={btnSecondary} onClick={back}>← Back</button>
              <button
                style={btnPrimary(form.topics.length === 0)}
                onClick={next}
                disabled={form.topics.length === 0}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Avatar + Theme */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300, margin: 0 }}>Pick your vibe</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: 14 }}>
              Choose your avatar and theme. This is serious business.
            </p>

            {/* Avatar picker */}
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
                Your Avatar
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {MEME_AVATARS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => update("avatarId", a.id)}
                    style={{
                      padding: "10px 14px", borderRadius: 14, cursor: "pointer",
                      border: form.avatarId === a.id ? "1px solid #fff" : "1px solid rgba(255,255,255,0.12)",
                      background: form.avatarId === a.id ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                      color: "#fff", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{a.emoji}</span>
                    <span>{a.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme picker */}
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
                Your Theme
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {Object.values(THEMES).map((th) => (
                  <button
                    key={th.id}
                    onClick={() => update("theme", th.id)}
                    style={{
                      padding: "10px 18px", borderRadius: 14, cursor: "pointer",
                      border: form.theme === th.id ? `1px solid ${th.accent}` : "1px solid rgba(255,255,255,0.12)",
                      background: form.theme === th.id ? th.accentSoft : "rgba(255,255,255,0.04)",
                      color: form.theme === th.id ? th.text : "rgba(255,255,255,0.6)",
                      fontSize: 13, transition: "all 0.15s",
                    }}
                  >
                    {th.emoji} {th.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={btnSecondary} onClick={back}>← Back</button>
              <button
                style={btnPrimary(!form.avatarId || !form.theme)}
                onClick={() => onComplete(form)}
                disabled={!form.avatarId || !form.theme}
              >
                Let's go ✓
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}