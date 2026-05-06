// src/hooks/useProfiles.js
import { useState } from "react";

const STORAGE_KEY = "dailybrief_profiles";
const ACTIVE_KEY  = "dailybrief_active_profile";

function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function useProfiles() {
  const [profiles, setProfiles]       = useState(loadProfiles);
  const [activeId, setActiveId]       = useState(
    () => localStorage.getItem(ACTIVE_KEY) || null
  );

  const activeProfile = activeId ? profiles[activeId] : null;

  function createProfile({ name, avatarId, state, country, topics, theme }) {
    const id = `user_${Date.now()}`;
    const newProfile = { id, name, avatarId, state, country, topics, theme };
    const updated = { ...profiles, [id]: newProfile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(ACTIVE_KEY, id);
    setProfiles(updated);
    setActiveId(id);
    return newProfile;
  }

  function switchProfile(id) {
    localStorage.setItem(ACTIVE_KEY, id);
    setActiveId(id);
  }

  function updateProfile(id, changes) {
    const updated = { ...profiles, [id]: { ...profiles[id], ...changes } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProfiles(updated);
  }

  function deleteProfile(id) {
    const updated = { ...profiles };
    delete updated[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const nextId = Object.keys(updated)[0] || null;
    localStorage.setItem(ACTIVE_KEY, nextId || "");
    setProfiles(updated);
    setActiveId(nextId);
  }

  return {
    profiles,
    activeProfile,
    activeId,
    createProfile,
    switchProfile,
    updateProfile,
    deleteProfile,
  };
}