import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal } from 'lucide-react'
import { DEPARTMENTS } from '../utils/constants'
import Button from './Button'

/**
 * Slide-over Filter Drawer component using Framer Motion for smooth transitions.
 */
export const FilterDrawer = ({
  isOpen,
  onClose,
  onApply,
  initialSelectedDepartments = [],
}) => {
  const [selectedDepts, setSelectedDepts] = useState(initialSelectedDepartments)

  // Sync state with props when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedDepts(initialSelectedDepartments)
    }
  }, [isOpen, initialSelectedDepartments])

  // Escape key handler to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleToggleDepartment = (dept) => {
    setSelectedDepts((current) =>
      current.includes(dept)
        ? current.filter((d) => d !== dept)
        : [...current, dept]
    )
  }

  const handleApply = () => {
    onApply(selectedDepts)
    onClose()
  }

  const handleReset = () => {
    setSelectedDepts([])
    onApply([])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-[3px]"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-850 shadow-2xl flex flex-col transition-colors"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50 text-brand-650 dark:bg-brand-950/40 dark:text-brand-350">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Filters
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={X}
                onClick={onClose}
                className="w-8 h-8 p-0 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-350"
                aria-label="Close filters"
              />
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 select-none">
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Department
                </h3>
                <div className="flex flex-col gap-2">
                  {DEPARTMENTS.map((dept) => {
                    const isChecked = selectedDepts.includes(dept)
                    return (
                      <label
                        key={dept}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-150 ${
                          isChecked
                            ? 'border-brand-500 bg-brand-50/20 text-brand-700 dark:bg-brand-950/20 dark:text-brand-300 dark:border-brand-500/50 shadow-sm shadow-brand-500/5'
                            : 'border-slate-200 hover:border-slate-300 dark:border-slate-850 dark:hover:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleDepartment(dept)}
                          className="w-4.5 h-4.5 rounded border-slate-350 text-brand-655 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 dark:checked:bg-brand-600 shrink-0"
                        />
                        <span>{dept}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/50 dark:bg-slate-900/10 flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="flex-1 rounded-xl py-2.5 font-bold"
              >
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                className="flex-1 rounded-xl py-2.5 font-bold"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FilterDrawer
