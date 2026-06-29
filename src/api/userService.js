import axios from 'axios'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

/**
 * Fetch all users from the JSONPlaceholder mock API.
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const getUsers = () => {
  return apiClient.get('')
}

/**
 * Simulate user creation on the server.
 * Note: JSONPlaceholder does not persist new records, but returns 201 Created and the new object.
 * @param {Object} userData
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const createUser = (userData) => {
  return apiClient.post('', userData)
}

/**
 * Simulate updating user details.
 * Note: JSONPlaceholder does not persist edits, but returns 200 OK and the updated object.
 * @param {number|string} id
 * @param {Object} userData
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const updateUser = (id, userData) => {
  // If the user was added locally, JSONPlaceholder won't find it (id > 10 returns 404).
  // We'll catch and simulate success in our useUsers hook, but we still make the call for mock verification.
  const apiId = id > 10 ? 1 : id
  return apiClient.put(`/${apiId}`, userData)
}

/**
 * Simulate user deletion.
 * @param {number|string} id
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export const deleteUser = (id) => {
  const apiId = id > 10 ? 1 : id
  return apiClient.delete(`/${apiId}`)
}

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
