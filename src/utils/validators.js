/**
 * Validate user form data.
 * Checks for:
 * - Empty fields or whitespace-only inputs
 * - Proper email format (regex)
 * - Duplicate emails within the current dataset (excluding the current user if editing)
 * 
 * @param {Object} formData - { firstName, lastName, email, department }
 * @param {Array<Object>} existingUsers - List of all users in the dataset
 * @param {number|string|null} editingUserId - ID of the user being edited, if any
 * @returns {Object} Errors object (keys match fields, values are error messages)
 */
export const validateUserForm = (formData, existingUsers = [], editingUserId = null) => {
  const errors = {}

  // 1. Validate First Name
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = 'First Name is required'
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First Name must be at least 2 characters'
  }

  // 2. Validate Last Name
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = 'Last Name is required'
  } else if (formData.lastName.trim().length < 1) {
    errors.lastName = 'Last Name is required'
  }

  // 3. Validate Email
  const emailVal = formData.email ? formData.email.trim() : ''
  if (!emailVal) {
    errors.email = 'Email is required'
  } else {
    // Robust Email regex format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(emailVal)) {
      errors.email = 'Invalid Email format (e.g. name@domain.com)'
    } else {
      // Check for duplicate email within the active dataset
      const isDuplicate = existingUsers.some(
        (user) =>
          user.email.toLowerCase() === emailVal.toLowerCase() &&
          user.id !== editingUserId
      )
      if (isDuplicate) {
        errors.email = 'This email address is already registered'
      }
    }
  }

  // 4. Validate Department
  if (!formData.department || !formData.department.trim()) {
    errors.department = 'Department is required'
  }

  return errors
}

export default validateUserForm
