/**
 * Hook for advanced work-regulation settings.
 * Persists to localStorage (will migrate to IndexedDB later).
 */

import { useState, useCallback, useEffect } from 'react';
import { AdvancedSettings, defaultAdvancedSettings } from '@/types/advancedSettings';

const STORAGE_KEY = 'wplanner-advanced-settings';

function loadSettings(): AdvancedSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultAdvancedSettings, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...defaultAdvancedSettings };
}

export function useAdvancedSettings() {
  const [settings, setSettings] = useState<AdvancedSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateAdvancedSettings = useCallback((patch: Partial<AdvancedSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetAdvancedSettings = useCallback(() => {
    setSettings({ ...defaultAdvancedSettings });
  }, []);

  return {
    advancedSettings: settings,
    updateAdvancedSettings,
    resetAdvancedSettings,
  };
}
