import { useState, useEffect, useCallback } from 'react'

// Theme types
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
}

// Local storage key
const THEME_STORAGE_KEY = 'counter-app-theme'

// Check system preference for dark mode
const getSystemThemePreference = () => {
  if (typeof window === 'undefined') return THEMES.DARK

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT
}

// Get saved theme from localStorage or system preference
const getSavedTheme = () => {
  if (typeof window === 'undefined') return THEMES.DARK

  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error)
  }

  return getSystemThemePreference()
}

// Apply theme to document
const applyTheme = (theme) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  if (theme === THEMES.LIGHT) {
    root.setAttribute('data-theme', THEMES.LIGHT)
    root.classList.remove('dark-theme')
    root.classList.add('light-theme')
  } else {
    root.removeAttribute('data-theme')
    root.classList.remove('light-theme')
    root.classList.add('dark-theme')
  }
}

// Custom hook for theme management
export const useTheme = () => {
  const [theme, setThemeState] = useState(THEMES.DARK)
  const [isInitialized, setIsInitialized] = useState(false)
  const [systemPreference, setSystemPreference] = useState(getSystemThemePreference())

  // Set theme and save to localStorage
  const setTheme = useCallback((newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}`)
      return
    }

    setThemeState(newTheme)
    applyTheme(newTheme)

    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme)
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
      }
    }
  }, [])

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
  }, [theme, setTheme])

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemPreferenceChange = (e) => {
      const newSystemPreference = e.matches ? THEMES.DARK : THEMES.LIGHT
      setSystemPreference(newSystemPreference)

      // Only update if no user preference is saved
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (!savedTheme) {
        setTheme(newSystemPreference)
      }
    }

    mediaQuery.addEventListener('change', handleSystemPreferenceChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemPreferenceChange)
    }
  }, [])

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getSavedTheme()
    setThemeState(initialTheme)
    applyTheme(initialTheme)
    setIsInitialized(true)
  }, [])

  return {
    theme,
    setTheme,
    toggleTheme,
    isInitialized,
    systemPreference,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    THEMES
  }
}

export default useTheme