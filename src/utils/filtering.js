/**
 * Filter users based on search query matching multiple fields and optional department filters.
 * Matches: First Name, Last Name, Email, Department.
 * 
 * @param {Array<Object>} users
 * @param {string} query
 * @param {Array<string>} selectedDepartments
 * @returns {Array<Object>}
 */
export const filterUsers = (users = [], query = '', selectedDepartments = []) => {
  let result = [...users]

  // 1. Apply multi-field text search query
  if (query && query.trim() !== '') {
    const lowerQuery = query.trim().toLowerCase()
    result = result.filter((user) => {
      const fName = user.firstName ? user.firstName.toLowerCase() : ''
      const lName = user.lastName ? user.lastName.toLowerCase() : ''
      const email = user.email ? user.email.toLowerCase() : ''
      const dept = user.department ? user.department.toLowerCase() : ''

      return (
        fName.includes(lowerQuery) ||
        lName.includes(lowerQuery) ||
        email.includes(lowerQuery) ||
        dept.includes(lowerQuery)
      )
    })
  }

  // 2. Apply department list filter
  if (selectedDepartments && selectedDepartments.length > 0) {
    result = result.filter((user) =>
      selectedDepartments.includes(user.department)
    )
  }

  return result
}

export default filterUsers
