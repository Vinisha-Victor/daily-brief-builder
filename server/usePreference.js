import { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const USER_ID_KEY = "daily_brief_user_id";

const DEFAULT_PREFS = {
  name: "",
  city: "",
  categories: ["general", "technology"],
  theme: "midnight",
  language: "en",
  brief_time: "morning",
  units: "metric",
};

/**
 * usePreferences — manages user preferences across localStorage + backend.
 *
 * Returns:
 *  - prefs        : current preferences object
 *  - userId       : UUID stored in localStorage
 *  - isOnboarded  : false if no user_id in localStorage (triggers onboarding)
 *  - isLoading    : true while fetching from backend
 *  - savePrefs    : (data) => Promise — creates or updates preferences
 *  - updatePref   : (key, value) => Promise — patches a single field
 *  - resetPrefs   : () => Promise — deletes from backend + clears localStorage
 *  - options      : valid options for dropdowns (themes, categories, etc.)
 */
export function usePreferences() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState(null);

  // ── On mount: check localStorage for existing user_id ──
  useEffect(() => {
    const storedId = localStorage.getItem(USER_ID_KEY);
    if (storedId) {
      setUserId(storedId);
      fetchPrefs(storedId);
    } else {
      setIsLoading(false); // No user yet — show onboarding
    }
    fetchOptions();
  }, []);

  // ── Fetch saved preferences from backend ──
  async function fetchPrefs(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/preferences/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPrefs(data.preferences);
      } else if (res.status === 404) {
        // User ID in localStorage but not on backend — clear and re-onboard
        localStorage.removeItem(USER_ID_KEY);
        setUserId(null);
      }
    } catch (err) {
      console.error("[usePreferences] fetchPrefs error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // ── Fetch valid options for dropdowns ──
  async function fetchOptions() {
    try {
      const res = await fetch(`${API_BASE}/api/preferences/meta/options`);
      if (res.ok) {
        const data = await res.json();
        setOptions(data.options);
      }
    } catch (err) {
      console.error("[usePreferences] fetchOptions error:", err);
    }
  }

  /**
   * savePrefs — called on onboarding form submit.
   * Creates a new user if none exists, otherwise full update.
   */
  const savePrefs = useCallback(async (data) => {
    try {
      const existingId = localStorage.getItem(USER_ID_KEY);

      let res, json;

      if (existingId) {
        // Update existing user (PATCH)
        res = await fetch(`${API_BASE}/api/preferences/${existingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // New user (POST)
        res = await fetch(`${API_BASE}/api/preferences`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      json = await res.json();

      if (!res.ok) {
        throw new Error(json.errors?.join(", ") || json.error || "Save failed");
      }

      const savedPrefs = json.preferences;
      setPrefs(savedPrefs);

      if (!existingId) {
        localStorage.setItem(USER_ID_KEY, savedPrefs.user_id);
        setUserId(savedPrefs.user_id);
      }

      return { success: true, preferences: savedPrefs };
    } catch (err) {
      console.error("[usePreferences] savePrefs error:", err);
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * updatePref — patch a single preference field (e.g. theme change).
   * Usage: updatePref("theme", "aurora")
   */
  const updatePref = useCallback(async (key, value) => {
    const id = localStorage.getItem(USER_ID_KEY);
    if (!id) return { success: false, error: "No user ID" };

    try {
      const res = await fetch(`${API_BASE}/api/preferences/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.errors?.join(", ") || json.error);

      setPrefs(json.preferences);
      return { success: true, preferences: json.preferences };
    } catch (err) {
      console.error("[usePreferences] updatePref error:", err);
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * resetPrefs — deletes backend record + clears localStorage.
   * Triggers onboarding on next render.
   */
  const resetPrefs = useCallback(async () => {
    const id = localStorage.getItem(USER_ID_KEY);
    if (id) {
      try {
        await fetch(`${API_BASE}/api/preferences/${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("[usePreferences] resetPrefs error:", err);
      }
    }
    localStorage.removeItem(USER_ID_KEY);
    setUserId(null);
    setPrefs(DEFAULT_PREFS);
  }, []);

  return {
    prefs,
    userId,
    isOnboarded: !!userId,
    isLoading,
    savePrefs,
    updatePref,
    resetPrefs,
    options,
  };
}