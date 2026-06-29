import React from 'react'
import { Sun, Moon, Users, SlidersHorizontal, Plus } from 'lucide-react'
import Button from './Button'

/**
 * Header component displaying dashboard branding, theme toggle, and toolbar controls.
 */
export const Header = ({
  isDarkMode,
  toggleTheme,
  onAddClick,
  onFilterClick,
  activeFiltersCount = 0,
  children, // SearchBar will be passed here as a child or slots
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                  Tacnique
                </h1>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">
                  User Management
                </p>
              </div>
            </div>

            {/* Dark Mode toggle for mobile screens */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                icon={isDarkMode ? Sun : Moon}
                aria-label="Toggle Theme"
                className="rounded-xl w-9 h-9 p-0"
              />
            </div>
          </div>

          {/* Search, Filter, and Action Buttons */}
          <div className="flex flex-1 items-center justify-end gap-3 w-full md:w-auto">
            {/* Search Bar Slot */}
            <div className="flex-1 max-w-md w-full">{children}</div>

            {/* Filter Toggle Button */}
            <Button
              variant="secondary"
              onClick={onFilterClick}
              icon={SlidersHorizontal}
              className="relative shrink-0"
            >
              <span className="hidden sm:inline">Filter</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-scale-in">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {/* Theme Toggle Button for desktop */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              icon={isDarkMode ? Sun : Moon}
              aria-label="Toggle Theme"
              className="hidden md:inline-flex shrink-0 w-10 h-10 p-0 rounded-xl"
            />

            {/* Add User Action Button */}
            <Button
              variant="primary"
              onClick={onAddClick}
              icon={Plus}
              className="shrink-0"
            >
              <span className="hidden sm:inline">Add User</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
