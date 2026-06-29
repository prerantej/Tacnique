import { describe, it, expect } from 'vitest'
import { filterUsers } from './filtering'

describe('filterUsers utility tests', () => {
  const dummyUsers = [
    { id: 1, firstName: 'Leanne', lastName: 'Graham', email: 'sincere@april.biz', department: 'Engineering' },
    { id: 2, firstName: 'Ervin', lastName: 'Howell', email: 'shanna@melissa.tv', department: 'Sales' },
    { id: 3, firstName: 'Clementine', lastName: 'Bauch', email: 'nathan@yesenia.net', department: 'Engineering' },
  ]

  it('should return all users if query is empty and no departments are selected', () => {
    const result = filterUsers(dummyUsers, '', [])
    expect(result).toHaveLength(3)
  })

  it('should search user list by first name (case insensitive)', () => {
    const result = filterUsers(dummyUsers, 'leanne')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('should search user list by last name (case insensitive)', () => {
    const result = filterUsers(dummyUsers, 'howell')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('should search user list by email patterns', () => {
    const result = filterUsers(dummyUsers, 'melissa.tv')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('should filter user cohorts by active department list', () => {
    const result = filterUsers(dummyUsers, '', ['Engineering'])
    expect(result).toHaveLength(2)
    expect(result.map(u => u.id)).toEqual([1, 3])
  })

  it('should intersect text search and department filters together', () => {
    const result = filterUsers(dummyUsers, 'clem', ['Engineering'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(3)

    const noResult = filterUsers(dummyUsers, 'clem', ['Sales'])
    expect(noResult).toHaveLength(0)
  })
})
