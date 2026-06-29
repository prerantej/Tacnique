import { describe, it, expect } from 'vitest'
import { validateUserForm } from './validators'

describe('validateUserForm utility tests', () => {
  const dummyUsers = [
    { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'leanne@example.com', department: 'IT' },
    { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'ervin@example.com', department: 'Sales' },
  ]

  it('should return no errors for correct input details', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
    }
    const errors = validateUserForm(validData, dummyUsers)
    expect(errors).toEqual({})
  })

  it('should flag empty name parameters', () => {
    const invalidData = {
      firstName: ' ',
      lastName: '',
      email: 'john@example.com',
      department: 'Engineering',
    }
    const errors = validateUserForm(invalidData, dummyUsers)
    expect(errors.firstName).toBe('First Name is required')
    expect(errors.lastName).toBe('Last Name is required')
  })

  it('should flag invalid email addresses format details', () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe.com', // missing @ and format
      department: 'Engineering',
    }
    const errors = validateUserForm(invalidData, dummyUsers)
    expect(errors.email).toBe('Invalid Email format (e.g. name@domain.com)')
  })

  it('should detect duplicate email address registrations', () => {
    const invalidData = {
      firstName: 'Ervin',
      lastName: 'Smith',
      email: 'leanne@example.com', // Duplicate with Leanne (ID 1)
      department: 'Sales',
    }
    const errors = validateUserForm(invalidData, dummyUsers)
    expect(errors.email).toBe('This email address is already registered')
  })

  it('should bypass duplicate email rule when editing same user profile ID', () => {
    const validEditData = {
      firstName: 'Leanne',
      lastName: 'NewLastName',
      email: 'leanne@example.com', // Same email, but user ID is 1 (matches Leanne ID)
      department: 'IT',
    }
    const errors = validateUserForm(validEditData, dummyUsers, 1)
    expect(errors.email).toBeUndefined() // No error because editingUserId === 1
  })
})
