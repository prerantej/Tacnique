import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import { LOCAL_STORAGE_KEYS } from './utils/constants'

function App() {
  // Theme state: dark by default (since we want a modern startup premium look)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Fallback to media query
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply dark mode styling to document root
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  // Placeholder actions
  const handleAddClick = () => {
    console.log('Add user clicked')
  }

  const handleFilterClick = () => {
    console.log('Filter drawer toggled')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass text-slate-900 dark:text-white rounded-xl text-sm border dark:border-slate-800',
          duration: 3000,
        }}
      />

      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onAddClick={handleAddClick}
        onFilterClick={handleFilterClick}
        activeFiltersCount={0}
      >
        {/* Placeholder for SearchBar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            disabled
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-650 cursor-not-allowed"
          />
        </div>
      </Header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass rounded-2xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-sm animate-fade-in">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold text-slate-850 dark:text-white mb-2">
              Dashboard Content Placeholder
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              We have successfully initialized the layout and theme engine. The data table, custom hooks, search, and drawer components will be integrated in subsequent tasks.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
