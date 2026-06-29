import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import Button from './Button'

/**
 * Custom Confirmation Modal for safe deletion of user records.
 * Prompts user with custom confirmation details and provides cancel/confirm actions.
 */
export const ConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  userName = '',
}) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/65 backdrop-blur-[3px]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="w-full max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/45 dark:text-red-400 shrink-0">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Delete User Account
                    </h2>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={X}
                  onClick={onClose}
                  className="w-8 h-8 p-0 rounded-lg text-slate-400 hover:text-slate-655 dark:hover:text-slate-350"
                  aria-label="Close modal"
                />
              </div>

              {/* Body Content */}
              <div className="px-6 py-2 select-none">
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Are you sure you want to delete <span className="font-bold text-slate-800 dark:text-white">{userName || 'this user'}</span>? This operation will remove their record from the dashboard directory.
                </p>
                <p className="text-xs font-semibold text-red-500 dark:text-red-400/90 bg-red-50/50 dark:bg-red-950/10 border border-red-100/50 dark:border-red-900/10 px-3 py-2.5 rounded-xl mt-4">
                  Warning: This action is permanent and cannot be undone.
                </p>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-end gap-3 mt-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="rounded-xl px-5"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={onConfirm}
                  className="rounded-xl px-5 font-bold"
                >
                  Delete User
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConfirmDelete
