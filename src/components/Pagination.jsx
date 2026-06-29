import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

/**
 * Pagination component with page number list, bounds indicator, and page size selector.
 */
export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / totalPageSize(pageSize, totalItems)))
  
  function totalPageSize(size, total) {
    return size === 'All' ? total : Number(size)
  }

  const activePageSize = totalPageSize(pageSize, totalItems)
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * activePageSize + 1
  const endIndex = Math.min(totalItems, currentPage * activePageSize)

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Generate page numbers array with simple ellipsis logic if total pages is large
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show page 1
      pageNumbers.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      if (start > 2) {
        pageNumbers.push('...')
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i)
      }

      if (end < totalPages - 1) {
        pageNumbers.push('...')
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-sm transition-colors text-slate-700 dark:text-slate-355 select-none">
      {/* Items count indicator */}
      <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-850 dark:text-white">{startIndex}</span>
        {startIndex !== endIndex && (
          <>
            {' '}to <span className="font-semibold text-slate-850 dark:text-white">{endIndex}</span>
          </>
        )} of <span className="font-semibold text-slate-850 dark:text-white">{totalItems}</span> users
      </div>

      {/* Center Controls: Page size & buttons */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="pageSizeSelect"
            className="text-xs font-semibold text-slate-400 dark:text-slate-550"
          >
            Show
          </label>
          <select
            id="pageSizeSelect"
            value={pageSize}
            onChange={(e) => {
              const val = e.target.value
              onPageSizeChange(val === 'All' ? 'All' : Number(val))
            }}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
          >
            {[5, 10, 20, 50, 'All'].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons List */}
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1 || pageSize === 'All'}
            icon={ChevronLeft}
            className="w-8 h-8 p-0 rounded-lg hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
            aria-label="Previous Page"
          />

          {/* Page numbers */}
          {pageSize !== 'All' &&
            getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-400"
                  >
                    &bull;&bull;&bull;
                  </span>
                )
              }

              const isCurrent = pageNum === currentPage
              return (
                <Button
                  key={pageNum}
                  variant={isCurrent ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 p-0 rounded-lg text-xs font-bold ${
                    isCurrent
                      ? 'shadow-none'
                      : 'hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-850'
                  }`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {pageNum}
                </Button>
              )
            })}

          {/* Next Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages || pageSize === 'All'}
            icon={ChevronRight}
            iconPosition="right"
            className="w-8 h-8 p-0 rounded-lg hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
            aria-label="Next Page"
          />
        </div>
      </div>
    </div>
  )
}

export default Pagination
