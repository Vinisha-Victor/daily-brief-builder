// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const { getDb, persist } = require("./db");
// const { validatePreferences } = require("./validate");

// const router = express.Router();

// // ─────────────────────────────────────────────
// // Helper: serialize a DB row to a clean object
// // ─────────────────────────────────────────────
// function rowToPrefs(row) {
//   return {
//     user_id:    row[0],
//     name:       row[1],
//     city:       row[2],
//     categories: JSON.parse(row[3] || "[]"),
//     theme:      row[4],
//     language:   row[5],
//     brief_time: row[6],
//     units:      row[7],
//     created_at: row[8],
//     updated_at: row[9],
//   };
// }

// // ─────────────────────────────────────────────
// // POST /api/preferences
// // Creates a new user preferences record.
// // Returns the full preferences object + new user_id.
// // ─────────────────────────────────────────────
// router.post("/", async (req, res) => {
//   try {
//     const errors = validatePreferences(req.body);
//     if (errors.length > 0) {
//       return res.status(400).json({ success: false, errors });
//     }

//     const db = await getDb();
//     const userId = uuidv4();

//     const {
//       name       = "",
//       city       = "",
//       categories = [],
//       theme      = "midnight",
//       language   = "en",
//       brief_time = "morning",
//       units      = "metric",
//     } = req.body;

//     db.run(
//       `INSERT INTO preferences (user_id, name, city, categories, theme, language, brief_time, units)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [userId, name, city, JSON.stringify(categories), theme, language, brief_time, units]
//     );

//     persist();

//     // Fetch and return the newly created row
//     const result = db.exec(
//       `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
//        FROM preferences WHERE user_id = ?`,
//       [userId]
//     );

//     const prefs = rowToPrefs(result[0].values[0]);
//     return res.status(201).json({ success: true, preferences: prefs });
//   } catch (err) {
//     console.error("[POST /preferences]", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });

// // ─────────────────────────────────────────────
// // GET /api/preferences/:userId
// // Returns saved preferences for a given user.
// // ─────────────────────────────────────────────
// router.get("/:userId", async (req, res) => {
//   try {
//     const db = await getDb();
//     const result = db.exec(
//       `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
//        FROM preferences WHERE user_id = ?`,
//       [req.params.userId]
//     );

//     if (!result.length || !result[0].values.length) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     const prefs = rowToPrefs(result[0].values[0]);
//     return res.json({ success: true, preferences: prefs });
//   } catch (err) {
//     console.error("[GET /preferences/:userId]", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });

// // ─────────────────────────────────────────────
// // PATCH /api/preferences/:userId
// // Partially updates preferences (any subset of fields).
// // ─────────────────────────────────────────────
// router.patch("/:userId", async (req, res) => {
//   try {
//     const errors = validatePreferences(req.body);
//     if (errors.length > 0) {
//       return res.status(400).json({ success: false, errors });
//     }

//     const db = await getDb();

//     // Check user exists
//     const exists = db.exec(
//       `SELECT user_id FROM preferences WHERE user_id = ?`,
//       [req.params.userId]
//     );
//     if (!exists.length || !exists[0].values.length) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     // Build dynamic SET clause from provided fields only
//     const allowedFields = ["name", "city", "theme", "language", "brief_time", "units"];
//     const setClauses = [];
//     const values = [];

//     for (const field of allowedFields) {
//       if (req.body[field] !== undefined) {
//         setClauses.push(`${field} = ?`);
//         values.push(req.body[field]);
//       }
//     }

//     // Handle categories separately (needs JSON serialization)
//     if (req.body.categories !== undefined) {
//       setClauses.push(`categories = ?`);
//       values.push(JSON.stringify(req.body.categories));
//     }

//     if (setClauses.length === 0) {
//       return res.status(400).json({ success: false, error: "No valid fields to update" });
//     }

//     setClauses.push(`updated_at = datetime('now')`);
//     values.push(req.params.userId);

//     db.run(
//       `UPDATE preferences SET ${setClauses.join(", ")} WHERE user_id = ?`,
//       values
//     );

//     persist();

//     // Return updated record
//     const result = db.exec(
//       `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
//        FROM preferences WHERE user_id = ?`,
//       [req.params.userId]
//     );

//     const prefs = rowToPrefs(result[0].values[0]);
//     return res.json({ success: true, preferences: prefs });
//   } catch (err) {
//     console.error("[PATCH /preferences/:userId]", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });

// // ─────────────────────────────────────────────
// // DELETE /api/preferences/:userId
// // Removes a user's preferences (e.g. reset onboarding).
// // ─────────────────────────────────────────────
// router.delete("/:userId", async (req, res) => {
//   try {
//     const db = await getDb();

//     const exists = db.exec(
//       `SELECT user_id FROM preferences WHERE user_id = ?`,
//       [req.params.userId]
//     );
//     if (!exists.length || !exists[0].values.length) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     db.run(`DELETE FROM preferences WHERE user_id = ?`, [req.params.userId]);
//     persist();

//     return res.json({ success: true, message: "Preferences deleted" });
//   } catch (err) {
//     console.error("[DELETE /preferences/:userId]", err);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });

// // ─────────────────────────────────────────────
// // GET /api/preferences/meta/options
// // Returns all valid options for frontend dropdowns.
// // ─────────────────────────────────────────────
// router.get("/meta/options", async (_req, res) => {
//   const {
//     VALID_THEMES,
//     VALID_LANGUAGES,
//     VALID_BRIEF_TIMES,
//     VALID_UNITS,
//     VALID_CATEGORIES,
//   } = require("./validate");

//   return res.json({
//     success: true,
//     options: {
//       themes: VALID_THEMES,
//       languages: VALID_LANGUAGES,
//       brief_times: VALID_BRIEF_TIMES,
//       units: VALID_UNITS,
//       categories: VALID_CATEGORIES,
//     },
//   });
// });

// module.exports = router;

import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { getDb, persist } from './db.js'
import {
  validatePreferences,
  VALID_THEMES,
  VALID_LANGUAGES,
  VALID_BRIEF_TIMES,
  VALID_UNITS,
  VALID_CATEGORIES,
} from './validate.js'

const router = express.Router()

function rowToPrefs(row) {
  return {
    user_id:    row[0],
    name:       row[1],
    city:       row[2],
    categories: JSON.parse(row[3] || '[]'),
    theme:      row[4],
    language:   row[5],
    brief_time: row[6],
    units:      row[7],
    created_at: row[8],
    updated_at: row[9],
  }
}

// POST /api/preferences — create new user
router.post('/', async (req, res) => {
  try {
    const errors = validatePreferences(req.body)
    if (errors.length > 0) return res.status(400).json({ success: false, errors })

    const db = await getDb()
    const userId = uuidv4()

    const {
      name       = '',
      city       = '',
      categories = [],
      theme      = 'midnight',
      language   = 'en',
      brief_time = 'morning',
      units      = 'metric',
    } = req.body

    db.run(
      `INSERT INTO preferences (user_id, name, city, categories, theme, language, brief_time, units)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, city, JSON.stringify(categories), theme, language, brief_time, units]
    )
    persist()

    const result = db.exec(
      `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
       FROM preferences WHERE user_id = ?`,
      [userId]
    )

    return res.status(201).json({ success: true, preferences: rowToPrefs(result[0].values[0]) })
  } catch (err) {
    console.error('[POST /preferences]', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// GET /api/preferences/meta/options — valid dropdown values
// NOTE: this route must come BEFORE /:userId to avoid being swallowed
router.get('/meta/options', (_req, res) => {
  return res.json({
    success: true,
    options: {
      themes:      VALID_THEMES,
      languages:   VALID_LANGUAGES,
      brief_times: VALID_BRIEF_TIMES,
      units:       VALID_UNITS,
      categories:  VALID_CATEGORIES,
    },
  })
})

// GET /api/preferences/:userId
router.get('/:userId', async (req, res) => {
  try {
    const db = await getDb()
    const result = db.exec(
      `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
       FROM preferences WHERE user_id = ?`,
      [req.params.userId]
    )

    if (!result.length || !result[0].values.length)
      return res.status(404).json({ success: false, error: 'User not found' })

    return res.json({ success: true, preferences: rowToPrefs(result[0].values[0]) })
  } catch (err) {
    console.error('[GET /preferences/:userId]', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// PATCH /api/preferences/:userId — partial update
router.patch('/:userId', async (req, res) => {
  try {
    const errors = validatePreferences(req.body)
    if (errors.length > 0) return res.status(400).json({ success: false, errors })

    const db = await getDb()
    const exists = db.exec(`SELECT user_id FROM preferences WHERE user_id = ?`, [req.params.userId])
    if (!exists.length || !exists[0].values.length)
      return res.status(404).json({ success: false, error: 'User not found' })

    const allowedFields = ['name', 'city', 'theme', 'language', 'brief_time', 'units']
    const setClauses = []
    const values = []

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        setClauses.push(`${field} = ?`)
        values.push(req.body[field])
      }
    }

    if (req.body.categories !== undefined) {
      setClauses.push(`categories = ?`)
      values.push(JSON.stringify(req.body.categories))
    }

    if (setClauses.length === 0)
      return res.status(400).json({ success: false, error: 'No valid fields to update' })

    setClauses.push(`updated_at = datetime('now')`)
    values.push(req.params.userId)

    db.run(`UPDATE preferences SET ${setClauses.join(', ')} WHERE user_id = ?`, values)
    persist()

    const result = db.exec(
      `SELECT user_id, name, city, categories, theme, language, brief_time, units, created_at, updated_at
       FROM preferences WHERE user_id = ?`,
      [req.params.userId]
    )

    return res.json({ success: true, preferences: rowToPrefs(result[0].values[0]) })
  } catch (err) {
    console.error('[PATCH /preferences/:userId]', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// DELETE /api/preferences/:userId
router.delete('/:userId', async (req, res) => {
  try {
    const db = await getDb()
    const exists = db.exec(`SELECT user_id FROM preferences WHERE user_id = ?`, [req.params.userId])
    if (!exists.length || !exists[0].values.length)
      return res.status(404).json({ success: false, error: 'User not found' })

    db.run(`DELETE FROM preferences WHERE user_id = ?`, [req.params.userId])
    persist()

    return res.json({ success: true, message: 'Preferences deleted' })
  } catch (err) {
    console.error('[DELETE /preferences/:userId]', err)
    return res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router