import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { getInitials, getAvatarColor, getAvatarTextColor } from '../utils/helpers'
import Button from './Button'

/**
 * UserRow represents a single user row in the desktop/tablet grid layout.
 * Returns only <tr> element to avoid browser validation and hydration errors.
 */
export const UserRow = ({ user, onEdit, onDelete }) => {
  const initials = getInitials(user.firstName, user.lastName)
  const avatarBg = getAvatarColor(`${user.firstName} ${user.lastName}`)
  const avatarText = getAvatarTextColor(`${user.firstName} ${user.lastName}`)

  return (
    <tr className="group hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-400 dark:text-slate-500">
        #{user.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {/* Avatar Initials Circle */}
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
            <div className="text-xs text-slate-400 dark:text-slate-550">
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
            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-650 hover:bg-brand-50 dark:text-slate-400 dark:hover:text-brand-400 dark:hover:bg-brand-950/20"
            aria-label={`Edit ${user.firstName}`}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(user.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-655 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-950/20"
            aria-label={`Delete ${user.firstName}`}
          />
        </div>
      </td>
    </tr>
  )
}

export default UserRow
