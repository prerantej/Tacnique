import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { DEBOUNCE_DELAY } from '../utils/constants'

/**
 * SearchBar component with embedded 300ms input debouncing and quick-clear controls.
 */
export const SearchBar = ({ onSearch, placeholder = 'Search users...' }) => {
  const [inputValue, setInputValue] = useState('')
  const onSearchRef = useRef(onSearch)

  // Keep search callback reference fresh
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Coordinate debounced search changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchRef.current(inputValue)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceTimer)
  }, [inputValue])

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-600">
        <Search className="w-4 h-4" />
      </div>

      {/* Input Element */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm bg-slate-100/50 hover:bg-slate-100/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 focus:bg-white dark:focus:bg-slate-950 border border-transparent focus:border-brand-500 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition-all duration-200"
      />

      {/* Clear Button */}
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
