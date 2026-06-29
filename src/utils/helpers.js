/**
 * Extract initials from first and last name.
 * e.g., John Doe -> JD
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
export const getInitials = (firstName = '', lastName = '') => {
  const firstChar = firstName ? firstName.trim().charAt(0) : ''
  const lastChar = lastName ? lastName.trim().charAt(0) : ''
  const initials = `${firstChar}${lastChar}`.toUpperCase()
  return initials || 'U'
}

/**
 * Generate a deterministic pastel HSL background color based on name string.
 * This guarantees the user's avatar color is consistent across views and refreshes.
 * @param {string} name
 * @returns {string} HSL string
 */
export const getAvatarColor = (name = '') => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // Use HSL for soft startup pastel look: 
  // Hue 0-360, Saturation 65-75%, Lightness 80-85% for light mode, or slightly darker for dark mode compatibility.
  // We can let CSS variables or simple HSL work.
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 65%, 82%)`
}

/**
 * Deterministic text color to ensure readable contrast on pastel backgrounds.
 * @param {string} name
 * @returns {string} HSL string
 */
export const getAvatarTextColor = (name = '') => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 80%, 25%)`
}

/**
 * Export visible user records to CSV format.
 * @param {Array<Object>} users
 */
export const exportToCSV = (users) => {
  if (!users || users.length === 0) return

  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Department']
  const rows = users.map((u) => [u.id, u.firstName, u.lastName, u.email, u.department])
  
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `user_directory_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
