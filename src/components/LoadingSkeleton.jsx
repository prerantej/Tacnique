import React from 'react'

/**
 * LoadingSkeleton component provides a pulsing mockup state during user fetches.
 */
export const LoadingSkeleton = ({ rowsCount = 5 }) => {
  return (
    <div className="w-full animate-pulse border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
      {/* Table Header skeleton */}
      <div className="hidden md:flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-4 px-6 gap-4">
        <div className="w-12 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
        <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
        <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
        <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
        <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
      </div>

      {/* Row skeletons */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {Array.from({ length: rowsCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row py-4 px-6 gap-4 items-start md:items-center justify-between"
          >
            {/* ID & Avatar skeleton */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <div className="w-8 h-4 bg-slate-200 dark:bg-slate-850 rounded hidden md:block"></div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-850 shrink-0"></div>
              <div className="flex flex-col gap-1.5 md:hidden w-full">
                <div className="w-24 h-4 bg-slate-200 dark:bg-slate-850 rounded"></div>
                <div className="w-40 h-3 bg-slate-200 dark:bg-slate-850 rounded"></div>
              </div>
            </div>

            {/* Desktop Columns skeletons */}
            <div className="hidden md:block flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded max-w-[150px]"></div>
            <div className="hidden md:block flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded max-w-[150px]"></div>
            <div className="hidden md:block flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded max-w-[220px]"></div>
            <div className="hidden md:block flex-1 h-4 bg-slate-200 dark:bg-slate-850 rounded max-w-[150px]"></div>

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-2 w-full md:w-auto md:justify-end shrink-0 pt-2 md:pt-0">
              <div className="w-16 h-8 bg-slate-200 dark:bg-slate-850 rounded-lg"></div>
              <div className="w-16 h-8 bg-slate-200 dark:bg-slate-850 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton
