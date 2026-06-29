import React from 'react'

/**
 * Reusable Input Component with inline validation styling.
 */
export const Input = ({
  label,
  id,
  type = 'text',
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500/50'
            : 'border-slate-200 dark:border-slate-850 focus:border-brand-500 focus:ring-brand-500/10'
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 dark:text-red-400 mt-0.5">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
