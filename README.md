<div align="center">



```

██████╗  █████╗ ██╗██╗  ██╗   ██╗    ██████╗ ██████╗ ██╗███████╗███████╗

██╔══██╗██╔══██╗██║██║  ╚██╗ ██╔╝    ██╔══██╗██╔══██╗██║██╔════╝██╔════╝

██║  ██║███████║██║██║   ╚████╔╝     ██████╔╝██████╔╝██║█████╗  █████╗  

██║  ██║██╔══██║██║██║    ╚██╔╝      ██╔══██╗██╔══██╗██║██╔══╝  ██╔══╝  

██████╔╝██║  ██║██║███████╗██║       ██████╔╝██║  ██║██║███████╗██║     

╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝       ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚═╝     

&#x20;                                                           BUILDER

```



\### \*Your world. Summarized. Cinematically.\*



!\[React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)

!\[Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

!\[Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)

!\[Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)

!\[Groq](https://img.shields.io/badge/Groq\_AI-FF6B35?style=for-the-badge)



</div>



\---



\## ✦ What is Daily Brief Builder?



\*\*Daily Brief Builder\*\* is a cinematic, AI-powered personal briefing app that greets you every morning with:



\- 🌤️ \*\*Live weather\*\* matched to your city — with ambient video backgrounds that change with conditions

\- 🗞️ \*\*Top news\*\* across categories you care about — fetched fresh, summarized by AI

\- 🤖 \*\*AI-generated brief\*\* — a clean, readable summary of your day, written by `llama-3.3-70b` via Groq

\- 🎬 \*\*Cinematic UI\*\* — full-viewport hero, live clock, looping Coverr video backgrounds, dark editorial aesthetic



No clutter. No ads. Just your world, distilled.



\---



\## 🖼️ Preview



> \*(Add a screenshot or screen recording GIF here)\*



\---



\## ⚙️ Tech Stack



| Layer | Technology |

|---|---|

| Frontend | React + Vite |

| Backend | Node.js + Express |

| AI Summarization | Groq API (`llama-3.3-70b`) |

| News | Currents API |

| Weather | OpenWeatherMap |

| Video Backgrounds | Coverr (free) |

| Styling | Custom CSS, cinematic dark theme |



\---



\## 🚀 Getting Started



\### 1. Clone the repo



```bash

git clone https://github.com/yourusername/daily-brief-builder.git

cd daily-brief-builder

```



\### 2. Install dependencies



```bash

npm install

```



This project uses \*\*npm workspaces\*\* — running install at the root installs both client and server dependencies.



\### 3. Set up environment variables



Copy the example env file:



```bash

cp server/.env.example server/.env

```



Fill in your keys in `server/.env`:



```env

GROQ\_API\_KEY=your\_groq\_key\_here

CURRENTS\_API\_KEY=your\_currents\_key\_here

OPENWEATHER\_API\_KEY=your\_openweather\_key\_here

```



> 🔑 Get free API keys at:

> - \[console.groq.com](https://console.groq.com)

> - \[currentsapi.services](https://currentsapi.services)

> - \[openweathermap.org](https://openweathermap.org/api)



\### 4. Run the app



```bash

npm run dev

```



\- Client runs at `http://localhost:5173`

\- Server runs at `http://localhost:3001`



\---



\## 📁 Project Structure



```

daily-brief-builder/

├── client/               # React + Vite frontend

│   ├── src/

│   │   ├── components/

│   │   │   ├── BriefCard.jsx

│   │   │   ├── WeatherWidget.jsx

│   │   │   └── NewsWidget.jsx

│   │   └── App.jsx

│   └── package.json

├── server/               # Node + Express backend

│   ├── index.js

│   ├── .env              # ← never committed

│   ├── .env.example      # ← committed (no real keys)

│   └── package.json

└── package.json          # root workspace config

```



\---



\## 🌐 Roadmap



\- \[ ] User onboarding \& city personalization

\- \[ ] Voice readout via Web Speech API

\- \[ ] Mood-based dynamic themes (morning/night)

\- \[ ] Bookmark / Read Later for news cards

\- \[ ] Language toggle (EN / DE)

\- \[ ] "Share My Brief" feature



\---



\## 👩‍💻 Author



Made with 🎬 by \*\*Vini\*\*  

B.Tech CS · Asansol Engineering College  

\[GitHub](https://github.com/yourusername) · \[LinkedIn](https://linkedin.com/in/yourprofile)



\---



<div align="center">

<sub>Built as a portfolio project. All API keys are private — never committed to this repo.</sub>

</div>

