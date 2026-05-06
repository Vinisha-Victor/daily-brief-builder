// // src/components/ProfileSelector.jsx
// import { THEMES } from "../data/themes";
// import { MEME_AVATARS } from "../data/memeAvatars";

// export default function ProfileSelector({ profiles, onSelect, onCreateNew }) {
//   const profileList = Object.values(profiles);

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#080a0f",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "40px 24px",
//       fontFamily: "'DM Sans', sans-serif",
//     }}>
//       <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
//         Daily Brief
//       </div>
//       <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: "#fff", marginBottom: 8, textAlign: "center" }}>
//         Who's briefing today?
//       </h1>
//       <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 48 }}>
//         Pick your profile or create a new one
//       </p>

//       <div style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 16,
//         justifyContent: "center",
//         maxWidth: 720,
//         marginBottom: 40,
//       }}>
//         {profileList.map((profile) => {
//           const theme = THEMES[profile.theme] || THEMES["doge"];
//           const avatar = MEME_AVATARS.find((a) => a.id === profile.avatarId) || MEME_AVATARS[0];

//           return (
//             <button
//               key={profile.id}
//               onClick={() => onSelect(profile.id)}
//               style={{
//                 width: 160,
//                 padding: "24px 16px",
//                 borderRadius: 20,
//                 border: `1px solid ${theme.border}`,
//                 background: theme.accentSoft,
//                 cursor: "pointer",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 12,
//                 transition: "transform 0.15s, box-shadow 0.15s",
//               }}
//               onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
//               onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//             >
//               {/* Avatar */}
//               <div style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: "50%",
//                 background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent}33)`,
//                 border: `2px solid ${theme.accent}`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 28,
//               }}>
//                 {avatar.emoji}
//               </div>

//               {/* Name */}
//               <div style={{ color: theme.text, fontWeight: 600, fontSize: 15 }}>
//                 {profile.name}
//               </div>

//               {/* Theme + location */}
//               <div style={{ color: theme.subtext, fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
//                 {theme.emoji} {theme.name}<br />
//                 📍 {profile.state}, {profile.country}
//               </div>
//             </button>
//           );
//         })}

//         {/* Create new profile button */}
//         <button
//           onClick={onCreateNew}
//           style={{
//             width: 160,
//             padding: "24px 16px",
//             borderRadius: 20,
//             border: "1px dashed rgba(255,255,255,0.2)",
//             background: "rgba(255,255,255,0.04)",
//             cursor: "pointer",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 12,
//             transition: "all 0.15s",
//           }}
//           onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
//           onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
//         >
//           <div style={{
//             width: 64, height: 64, borderRadius: "50%",
//             border: "2px dashed rgba(255,255,255,0.2)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: 28, color: "rgba(255,255,255,0.3)",
//           }}>+</div>
//           <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>New Profile</div>
//         </button>
//       </div>
//     </div>
//   );
// }

import { THEMES } from "../data/themes"
import { MEME_AVATARS } from "../data/memeAvatars"

export default function ProfileSelector({ profiles, onSelect, onCreateNew }) {
  const profileList = Object.values(profiles)

  if (profileList.length === 0) {
    return null // safety — App will redirect to create
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#080a0f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ marginBottom: 8, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
        Daily Brief
      </div>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: "#fff", marginBottom: 8, textAlign: "center" }}>
        Who's briefing today?
      </h1>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 48 }}>
        Pick your profile or create a new one
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 720, marginBottom: 40 }}>
        {profileList.map((profile) => {
          const theme = THEMES[profile.theme] || THEMES["doge"]
          const avatar = MEME_AVATARS.find((a) => a.id === profile.avatarId) || MEME_AVATARS[0]

          return (
            <button
              key={profile.id}
              onClick={() => onSelect(profile.id)}
              style={{
                width: 160, padding: "24px 16px", borderRadius: 20,
                border: `1px solid ${theme.border}`, background: theme.accentSoft,
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 12, transition: "transform 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent}33)`,
                border: `2px solid ${theme.accent}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
              }}>
                {avatar.emoji}
              </div>
              <div style={{ color: theme.text, fontWeight: 600, fontSize: 15 }}>{profile.name}</div>
              <div style={{ color: theme.subtext, fontSize: 11, textAlign: "center", lineHeight: 1.5 }}>
                {theme.emoji} {theme.name}<br />
                📍 {profile.state}, {profile.country}
              </div>
            </button>
          )
        })}

        <button
          onClick={onCreateNew}
          style={{
            width: 160, padding: "24px 16px", borderRadius: 20,
            border: "1px dashed rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)",
            cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12, transition: "all 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
        >
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            border: "2px dashed rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, color: "rgba(255,255,255,0.3)",
          }}>+</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>New Profile</div>
        </button>
      </div>
    </div>
  )
}