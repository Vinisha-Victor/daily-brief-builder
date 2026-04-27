# Daily Brief — Preferences API

Base URL: `http://localhost:3001`

---

## Endpoints

### `POST /api/preferences`
Create a new user. Returns a `user_id` — **save this to localStorage** as `daily_brief_user_id`.

**Body** (all optional, defaults shown):
```json
{
  "name":       "",
  "city":       "",
  "categories": ["general", "technology"],
  "theme":      "midnight",
  "language":   "en",
  "brief_time": "morning",
  "units":      "metric"
}
```

**Response 201:**
```json
{
  "success": true,
  "preferences": {
    "user_id":    "uuid-here",
    "name":       "Vini",
    "city":       "Kolkata",
    "categories": ["technology", "science"],
    "theme":      "aurora",
    "language":   "en",
    "brief_time": "morning",
    "units":      "metric",
    "created_at": "2026-04-20 10:00:00",
    "updated_at": "2026-04-20 10:00:00"
  }
}
```

---

### `GET /api/preferences/:userId`
Fetch saved preferences for a user.

**Response 200:** Same structure as above.  
**Response 404:** `{ "success": false, "error": "User not found" }`

---

### `PATCH /api/preferences/:userId`
Partially update preferences. Send **only the fields you want to change**.

```json
{ "theme": "ember" }
```
or
```json
{ "city": "Berlin", "language": "de", "units": "metric" }
```

**Response 200:** Full updated preferences object.

---

### `DELETE /api/preferences/:userId`
Remove a user's preferences (triggers re-onboarding on frontend).

**Response 200:** `{ "success": true, "message": "Preferences deleted" }`

---

### `GET /api/preferences/meta/options`
Returns all valid values for dropdowns — fetch this on app init.

```json
{
  "success": true,
  "options": {
    "themes":      ["midnight", "aurora", "ember", "arctic", "noir", "forest"],
    "languages":   ["en", "de"],
    "brief_times": ["morning", "afternoon", "night"],
    "units":       ["metric", "imperial"],
    "categories":  ["general", "technology", "science", "business", "health", "sports", "entertainment", "politics", "world"]
  }
}
```

---

## Valid Values

| Field        | Valid values                                                        | Default     |
|--------------|---------------------------------------------------------------------|-------------|
| `theme`      | `midnight`, `aurora`, `ember`, `arctic`, `noir`, `forest`          | `midnight`  |
| `language`   | `en`, `de`                                                          | `en`        |
| `brief_time` | `morning`, `afternoon`, `night`                                     | `morning`   |
| `units`      | `metric`, `imperial`                                                | `metric`    |
| `categories` | `general`, `technology`, `science`, `business`, `health`, `sports`, `entertainment`, `politics`, `world` | `["general","technology"]` |

---

## Frontend Integration

```js
// 1. On app load — check if user exists
const userId = localStorage.getItem("daily_brief_user_id");

// 2. If no userId → show onboarding, then:
const res = await fetch("/api/preferences", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, city, categories, theme, units, language })
});
const { preferences } = await res.json();
localStorage.setItem("daily_brief_user_id", preferences.user_id);

// 3. If userId exists → fetch preferences
const res = await fetch(`/api/preferences/${userId}`);
const { preferences } = await res.json();

// 4. Theme change (instant, no page reload needed)
await fetch(`/api/preferences/${userId}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ theme: "ember" })
});
```

---

## Data Storage

Preferences are stored in `data/preferences.db` (SQLite via sql.js).  
The file is auto-created on first run. Add it to `.gitignore`.

```
data/
```