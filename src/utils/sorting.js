/**
 * Sorts an array of user objects by a specific field and direction.
 * Handles strings (localeCompare with natural numeric ordering) and numbers.
 * 
 * @param {Array<Object>} users
 * @param {string} field
 * @param {string} order - 'asc' | 'desc'
 * @returns {Array<Object>}
 */
export const sortUsers = (users = [], field = '', order = 'asc') => {
  if (!field) return users

  return [...users].sort((a, b) => {
    let valA = a[field]
    let valB = b[field]

    // Handle null or undefined values
    if (valA === undefined || valA === null) return order === 'asc' ? 1 : -1
    if (valB === undefined || valB === null) return order === 'asc' ? -1 : 1

    // If both are numbers, direct subtraction
    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'asc' ? valA - valB : valB - valA
    }

    // String comparison (case-insensitive and naturally ordered)
    const strA = String(valA).trim().toLowerCase()
    const strB = String(valB).trim().toLowerCase()

    return order === 'asc'
      ? strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' })
      : strB.localeCompare(strA, undefined, { numeric: true, sensitivity: 'base' })
  })
}

export default sortUsers
