import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { getInitials, getAvatarColor, getAvatarTextColor } from '../utils/helpers'
import Button from './Button'

/**
 * UserRow represents a single user row in the table or a card in mobile view.
 */
export const UserRow = ({ user, onEdit, onDelete }) => {
  const initials = getInitials(user.firstName, user.lastName)
  const avatarBg = getAvatarColor(`${user.firstName} ${user.lastName}`)
  const avatarText = getAvatarTextColor(`${user.firstName} ${user.lastName}`)
  
  return (
    <>
      {/* Desktop & Tablet Row (Table) */}
      <tr className="hidden md:table-row group hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors duration-150">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-400 dark:text-slate-500">
          #{user.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            {/* Avatar Initials */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm shrink-0"
              style={{ backgroundColor: avatarBg, color: avatarText }}
            >
              {initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                user_{user.id}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-650 dark:text-slate-300">
          {user.firstName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-650 dark:text-slate-300">
          {user.lastName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400 font-medium">
          {user.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-350 border border-brand-100/50 dark:border-brand-900/30">
            {user.department}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              icon={Edit2}
              onClick={() => onEdit(user)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:text-slate-400 dark:hover:text-brand-400 dark:hover:bg-brand-950/20"
              aria-label={`Edit ${user.firstName}`}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => onDelete(user.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-650 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-950/20"
              aria-label={`Delete ${user.firstName}`}
            />
          </div>
        </td>
      </tr>

      {/* Mobile Card Layout (Grid child on small screens) */}
      <div className="md:hidden flex flex-col p-5 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold shadow-sm shrink-0"
              style={{ backgroundColor: avatarBg, color: avatarText }}
            >
              {initials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-550 mt-0.5">
                ID: #{user.id} &bull; {user.email}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-350 border border-brand-100/50 dark:border-brand-900/30">
            {user.department}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-850/60 pt-3">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(user)}
            className="flex-1 rounded-xl text-xs py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(user.id)}
            className="flex-1 rounded-xl text-xs py-2 border border-transparent hover:bg-red-50 text-red-500 dark:hover:bg-red-950/20 dark:hover:text-red-400"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserRow
