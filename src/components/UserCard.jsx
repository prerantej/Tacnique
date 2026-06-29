import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { getInitials, getAvatarColor, getAvatarTextColor } from '../utils/helpers'
import Button from './Button'

/**
 * UserCard component renders a single user card for responsive mobile viewports.
 * Satisfies the requirement that mobile card controls have tap targets >= 44x44px.
 */
export const UserCard = ({ user, onEdit, onDelete }) => {
  const initials = getInitials(user.firstName, user.lastName)
  const avatarBg = getAvatarColor(`${user.firstName} ${user.lastName}`)
  const avatarText = getAvatarTextColor(`${user.firstName} ${user.lastName}`)

  return (
    <div className="flex flex-col p-5 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-2xl shadow-sm hover:shadow-md transition-all duration-205 gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar Initial Circle */}
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
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              ID: #{user.id} &bull; {user.email}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-350 border border-brand-100/50 dark:border-brand-900/30">
          {user.department}
        </span>
      </div>

      {/* Mobile action button controls (expanded tap sizing) */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-850/60 pt-3">
        <Button
          variant="secondary"
          size="sm"
          icon={Edit2}
          onClick={() => onEdit(user)}
          className="flex-1 rounded-xl text-xs py-2.5 min-h-[44px] bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={Trash2}
          onClick={() => onDelete(user.id)}
          className="flex-1 rounded-xl text-xs py-2.5 min-h-[44px] border border-transparent hover:bg-red-50 text-red-500 dark:hover:bg-red-950/20 dark:hover:text-red-400"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default UserCard
