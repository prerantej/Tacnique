import { describe, it, expect } from 'vitest'
import { sortUsers } from './sorting'

describe('sortUsers utility tests', () => {
  const dummyUsers = [
    { id: 3, firstName: 'Clementine', lastName: 'Bauch', email: 'nathan@yesenia.net', department: 'Engineering' },
    { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'sincere@april.biz', department: 'IT' },
    { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'shanna@melissa.tv', department: 'Sales' },
  ]

  it('should sort list by id numerically in ascending order', () => {
    const sorted = sortUsers(dummyUsers, 'id', 'asc')
    expect(sorted.map(u => u.id)).toEqual([1, 2, 3])
  })

  it('should sort list by id numerically in descending order', () => {
    const sorted = sortUsers(dummyUsers, 'id', 'desc')
    expect(sorted.map(u => u.id)).toEqual([3, 2, 1])
  })

  it('should sort list alphabetically by first name in ascending order', () => {
    const sorted = sortUsers(dummyUsers, 'firstName', 'asc')
    expect(sorted[0].firstName).toBe('Clementine')
    expect(sorted[1].firstName).toBe('Ervin')
    expect(sorted[2].firstName).toBe('Leanne')
  })

  it('should sort list alphabetically by first name in descending order', () => {
    const sorted = sortUsers(dummyUsers, 'firstName', 'desc')
    expect(sorted[0].firstName).toBe('Leanne')
    expect(sorted[1].firstName).toBe('Ervin')
    expect(sorted[2].firstName).toBe('Clementine')
  })

  it('should handle undefined or null fields safely placing them at bounds', () => {
    const partialUsers = [
      { id: 1, firstName: 'John' },
      { id: 2, firstName: null },
      { id: 3, firstName: 'Alice' },
    ]
    const sorted = sortUsers(partialUsers, 'firstName', 'asc')
    // Alice, John, then null (placed at the end)
    expect(sorted[0].id).toBe(3) // Alice
    expect(sorted[1].id).toBe(1) // John
    expect(sorted[2].id).toBe(2) // null
  })
})
