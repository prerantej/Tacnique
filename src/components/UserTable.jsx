import React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import UserRow from './UserRow'

/**
 * UserTable component renders a list of users inside a responsive layout.
 * Supports sticky table header sorting triggers with visual indicator icons.
 */
export const UserTable = ({
  users,
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  onSort,
}) => {
  // Config for sortable columns
  const columns = [
    { key: 'id', label: 'ID', sortable: false },
    { key: 'name', label: 'User', sortable: false },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false, align: 'right' },
  ]

  const renderSortIcon = (columnKey) => {
    if (sortField !== columnKey) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-650 transition-colors" />
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
    )
  }

  return (
    <div className="w-full">
      {/* Desktop/Tablet Table Layout */}
      <div className="hidden md:block w-full overflow-hidden border border-slate-200/60 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse align-middle">
            <thead className="sticky top-0 bg-slate-50/90 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-10 transition-colors">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => col.sortable && onSort(col.key)}
                    className={`px-6 py-4.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none ${
                      col.sortable ? 'cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-850/50 transition-colors' : ''
                    } ${col.align === 'right' ? 'text-right' : ''}`}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${
                        col.align === 'right' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{col.label}</span>
                      {col.sortable && renderSortIcon(col.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 transition-colors">
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Grid Layout */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default UserTable
