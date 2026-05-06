// src/data/themes.js

export const THEMES = {
  "this-is-fine": {
    id: "this-is-fine",
    name: "This Is Fine",
    emoji: "🔥",
    bg: "#1a0a00",
    accent: "#ff6b2b",
    accentSoft: "rgba(255,107,43,0.15)",
    text: "#fff5ee",
    subtext: "rgba(255,245,238,0.5)",
    border: "rgba(255,107,43,0.25)",
    // meme bg image (subtle overlay)
    bgImage: "https://i.imgflip.com/1otk96.jpg",
    // catchphrase UI text
    phrases: {
      refresh: "it's fine, refresh",
      settings: "lemme cook ⚙️",
      greeting_suffix: "everything is fine.",
      loading: "this is fine... loading...",
      noNews: "no news is good news (it's not)",
    },
  },

  "doge": {
    id: "doge",
    name: "Doge",
    emoji: "🐕",
    bg: "#0f0e00",
    accent: "#f5c518",
    accentSoft: "rgba(245,197,24,0.12)",
    text: "#fffde7",
    subtext: "rgba(255,253,231,0.5)",
    border: "rgba(245,197,24,0.25)",
    bgImage: "https://i.imgflip.com/4t0m5.jpg",
    phrases: {
      refresh: "much refresh. very news.",
      settings: "so settings. wow.",
      greeting_suffix: "such morning. very awake.",
      loading: "many load. much wait.",
      noNews: "wow. no news. very empty.",
    },
  },

//   "drake": {
//     id: "drake",
//     name: "Drake",
//     emoji: "🕺",
//     bg: "#0a0a0a",
//     accent: "#c9a84c",
//     accentSoft: "rgba(201,168,76,0.12)",
//     text: "#f5f0e8",
//     subtext: "rgba(245,240,232,0.5)",
//     border: "rgba(201,168,76,0.25)",
//     bgImage: "https://i.imgflip.com/30b1gx.jpg",
//     phrases: {
//       refresh: "👎 old news  👍 refresh",
//       settings: "👍 these settings",
//       greeting_suffix: "you up?",
//       loading: "👎 waiting  👍 almost there",
//       noNews: "👎 no news  👍 check back later",
//     },
//   },

"brain-rot": {
    id: "brain-rot",
    name: "Brain Rot",
    emoji: "🧟",
    bg: "#001a00",
    accent: "#39ff14",
    accentSoft: "rgba(57,255,20,0.12)",
    text: "#f0fff0",
    subtext: "rgba(240,255,240,0.5)",
    border: "rgba(57,255,20,0.3)",
    bgImage: "https://i.imgflip.com/8yv4wd.jpg",
    phrases: {
      refresh: "rizz up the feed 🗿",
      settings: "no cap settings ⚙️",
      greeting_suffix: "you are so sigma rn.",
      loading: "no cap, loading...",
      noNews: "bro fell off. no news found.",
    },
  },

  "nyan": {
    id: "nyan",
    name: "Nyan Cat",
    emoji: "🌈",
    bg: "#03001e",
    accent: "#ff6bff",
    accentSoft: "rgba(255,107,255,0.12)",
    text: "#ffffff",
    subtext: "rgba(255,255,255,0.5)",
    border: "rgba(255,107,255,0.3)",
    bgImage: "https://i.imgflip.com/2fm6x.jpg",
    phrases: {
      refresh: "pew pew refresh 🌈",
      settings: "~settings~ ✨",
      greeting_suffix: "nyaaaaa~",
      loading: "zooming through the internet...",
      noNews: "no news found in the rainbow void",
    },
  },

  "galaxy-brain": {
    id: "galaxy-brain",
    name: "Galaxy Brain",
    emoji: "🧠",
    bg: "#050010",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.12)",
    text: "#ede9fe",
    subtext: "rgba(237,233,254,0.5)",
    border: "rgba(167,139,250,0.25)",
    bgImage: "https://i.imgflip.com/27ca1t.jpg",
    phrases: {
      refresh: "expand mind. refresh. 🧠",
      settings: "configure the multiverse",
      greeting_suffix: "you have achieved consciousness.",
      loading: "processing infinite wisdom...",
      noNews: "the news exists beyond your perception",
    },
  },
};

// export const DEFAULT_THEME = "drake";
export const DEFAULT_THEME = "doge";