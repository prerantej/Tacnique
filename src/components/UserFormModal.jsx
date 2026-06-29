import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserPlus, Edit3 } from 'lucide-react'
import { DEPARTMENTS } from '../utils/constants'
import Button from './Button'
import Input from './Input'

/**
 * Reusable Form Modal for creating or editing user accounts.
 * Integrates Escape shortcuts, backdrop click boundaries, and input fields.
 */
export const UserFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  user = null, // null for Add mode, user object for Edit mode
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: DEPARTMENTS[0],
  })
  
  const [errors, setErrors] = useState({})

  // Sync form inputs when modal toggles or active user changes
  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          department: user.department || DEPARTMENTS[0],
        })
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          department: DEPARTMENTS[0],
        })
      }
      setErrors({})
    }
  }, [isOpen, user])

  // Escape key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clean specific error upon typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Temporary basic validation stub (will be replaced by full validators in next step)
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid Email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
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

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-50 text-brand-655 dark:bg-brand-950/40 dark:text-brand-350">
                    {user ? <Edit3 className="w-4.5 h-4.5" /> : <UserPlus className="w-4.5 h-4.5" />}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {user ? 'Edit User Details' : 'Add New User'}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={X}
                  onClick={onClose}
                  className="w-8 h-8 p-0 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-slate-350"
                  aria-label="Close modal"
                />
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="px-6 py-5 flex flex-col gap-4">
                  {/* First Name & Last Name (Inline Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="e.g. Jane"
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="e.g. Doe"
                      error={errors.lastName}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="e.g. jane.doe@example.com"
                    error={errors.email}
                    required
                  />

                  {/* Department Select */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label
                      htmlFor="department"
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-colors cursor-pointer"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Form Footer */}
                <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/50 dark:bg-slate-900/10 flex items-center justify-end gap-3">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="rounded-xl px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-xl px-5 font-bold"
                  >
                    {user ? 'Save Changes' : 'Create User'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UserFormModal
