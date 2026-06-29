import { useState, useEffect, useCallback } from 'react'
import userService from '../api/userService'
import { LOCAL_STORAGE_KEYS, DEPARTMENTS } from '../utils/constants'

/**
 * Custom Hook useUsers coordinates users state, mock API CRUD, and localStorage persistence.
 */
export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch initial users from API or load from localStorage
  const fetchUsers = useCallback(async (forceRefresh = false) => {
    setLoading(true)
    setError(null)

    try {
      // 1. Check cache first unless forceRefresh is triggered
      const cachedUsers = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS)
      if (cachedUsers && !forceRefresh) {
        setUsers(JSON.parse(cachedUsers))
        setLoading(false)
        return
      }

      // 2. Fetch from JSONPlaceholder mock API
      const response = await userService.getUsers()
      
      // 3. Map mock API data to support required first/last name and department columns
      const mappedUsers = response.data.map((user, index) => {
        // Split full name on the first space to extract first & last name
        const nameParts = user.name ? user.name.trim().split(/\s+/) : ['']
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        // Round-robin department assignment from constants list
        const department = DEPARTMENTS[index % DEPARTMENTS.length]

        return {
          id: user.id,
          firstName,
          lastName,
          email: user.email ? user.email.toLowerCase() : '',
          department,
        }
      })

      // 4. Save to localStorage and update state
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(mappedUsers))
      setUsers(mappedUsers)
    } catch (err) {
      console.error('Error fetching users:', err)
      setError('Unable to load users. Please check your network connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load users on mount
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  /**
   * Add a new user (Create)
   * Sends POST request, generates local unique ID, syncs with cache
   */
  const addUser = useCallback(async (userData) => {
    setError(null)
    try {
      // Dispatch mock post request to JSONPlaceholder
      const response = await userService.createUser(userData)
      
      // Generate a unique ID (JSONPlaceholder returns ID 11 for all new POST requests)
      // We look at our current set and increment the maximum ID value
      setUsers((currentUsers) => {
        const ids = currentUsers.map((u) => Number(u.id) || 0)
        const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1
        
        const createdUser = {
          ...userData,
          id: nextId,
        }

        const updatedUsers = [createdUser, ...currentUsers]
        localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(updatedUsers))
        return updatedUsers
      })

      return true
    } catch (err) {
      console.error('Error adding user:', err)
      setError('Failed to create user. Please try again.')
      throw err
    }
  }, [])

  /**
   * Update an existing user (Update)
   * Sends PUT request, replaces record in local cache
   */
  const editUser = useCallback(async (id, updatedFields) => {
    setError(null)
    try {
      // Dispatch mock PUT request.
      // We ignore minor network errors or 404s from custom IDs (>10) as JSONPlaceholder doesn't hold custom IDs on the server
      try {
        await userService.updateUser(id, updatedFields)
      } catch (apiErr) {
        console.warn('API PUT failed (expected for custom local IDs):', apiErr.message)
      }

      setUsers((currentUsers) => {
        const updatedUsers = currentUsers.map((user) =>
          user.id === id ? { ...user, ...updatedFields } : user
        )
        localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(updatedUsers))
        return updatedUsers
      })

      return true
    } catch (err) {
      console.error('Error editing user:', err)
      setError('Failed to update user. Please try again.')
      throw err
    }
  }, [])

  /**
   * Delete a user (Delete)
   * Sends DELETE request, removes record from local cache
   */
  const removeUser = useCallback(async (id) => {
    setError(null)
    try {
      // Dispatch mock DELETE request
      try {
        await userService.deleteUser(id)
      } catch (apiErr) {
        console.warn('API DELETE failed (expected for custom local IDs):', apiErr.message)
      }

      setUsers((currentUsers) => {
        const updatedUsers = currentUsers.filter((user) => user.id !== id)
        localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(updatedUsers))
        return updatedUsers
      })

      return true
    } catch (err) {
      console.error('Error deleting user:', err)
      setError('Failed to delete user. Please try again.')
      throw err
    }
  }, [])

  /**
   * Reset local storage cache and reload pristine data from API
   */
  const resetCache = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USERS)
    return fetchUsers(true)
  }, [fetchUsers])

  return {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    resetCache,
    refetch: fetchUsers,
  }
}

export default useUsers
