import React, { useState, useEffect, useMemo } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterDrawer from './components/FilterDrawer'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'
import UserFormModal from './components/UserFormModal'
import LoadingSkeleton from './components/LoadingSkeleton'
import ConfirmDelete from './components/ConfirmDelete'
import useUsers from './hooks/useUsers'
import { filterUsers } from './utils/filtering'
import { sortUsers } from './utils/sorting'
import { LOCAL_STORAGE_KEYS, DEFAULT_PAGE_SIZE } from './utils/constants'

function App() {
  // --- STATE ---
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Table parameters states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepts, setSelectedDepts] = useState([])
  const [sortField, setSortField] = useState('firstName')
  const [sortOrder, setSortOrder] = useState('asc')
  
  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(() => {
    const savedSize = localStorage.getItem(LOCAL_STORAGE_KEYS.PAGE_SIZE)
    if (savedSize) {
      return savedSize === 'All' ? 'All' : Number(savedSize)
    }
    return DEFAULT_PAGE_SIZE
  })

  // Modals visibility states
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null) // null = Add Mode, object = Edit Mode
  const [deletingUser, setDeletingUser] = useState(null)

  // Hook operations integration
  const {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    resetCache,
  } = useUsers()

  // --- ACTIONS ---
  // Theme coordination
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  // Page size change coordinator
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize)
    localStorage.setItem(LOCAL_STORAGE_KEYS.PAGE_SIZE, String(newSize))
    setCurrentPage(1) // Reset to first page
  }

  // Column header sort click handler
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // --- COMPUTATIONS (MEMOIZED) ---
  const filteredUsersList = useMemo(() => {
    return filterUsers(users, searchQuery, selectedDepts)
  }, [users, searchQuery, selectedDepts])

  const sortedUsersList = useMemo(() => {
    return sortUsers(filteredUsersList, sortField, sortOrder)
  }, [filteredUsersList, sortField, sortOrder])

  const paginatedUsersList = useMemo(() => {
    if (pageSize === 'All') return sortedUsersList
    const startIndex = (currentPage - 1) * pageSize
    return sortedUsersList.slice(startIndex, startIndex + pageSize)
  }, [sortedUsersList, currentPage, pageSize])

  // Total pages count
  const totalPages = useMemo(() => {
    if (pageSize === 'All') return 1
    return Math.max(1, Math.ceil(sortedUsersList.length / pageSize))
  }, [sortedUsersList.length, pageSize])

  // Auto-clamp current page if active user counts shrink (e.g. from filtering)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  // --- FORM SUBMIT COORDINATION ---
  const handleFormSubmit = async (formData) => {
    setIsFormOpen(false)
    const toastId = toast.loading(selectedUser ? 'Updating user details...' : 'Creating new user...')
    
    try {
      if (selectedUser) {
        // Edit Mode
        await editUser(selectedUser.id, formData)
        toast.success('User updated successfully!', { id: toastId })
      } else {
        // Add Mode
        await addUser(formData)
        toast.success('User created successfully!', { id: toastId })
      }
    } catch (err) {
      toast.error(selectedUser ? 'Failed to update user.' : 'Failed to create user.', { id: toastId })
    }
  }

  const handleEditTrigger = (user) => {
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  const handleAddTrigger = () => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }

  const handleDeleteTrigger = (id) => {
    const targetUser = users.find((u) => u.id === id)
    if (targetUser) {
      setDeletingUser(targetUser)
      setIsDeleteOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return
    setIsDeleteOpen(false)
    const toastId = toast.loading(`Deleting ${deletingUser.firstName} ${deletingUser.lastName}...`)
    
    try {
      await removeUser(deletingUser.id)
      toast.success('User deleted successfully!', { id: toastId })
    } catch (err) {
      toast.error('Failed to delete user.', { id: toastId })
    } finally {
      setDeletingUser(null)
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Toast notifications provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass text-slate-900 dark:text-white rounded-xl text-sm border dark:border-slate-800 shadow-lg',
          duration: 3000,
        }}
      />

      {/* Top Header bar with search slot */}
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onAddClick={handleAddTrigger}
        onFilterClick={() => setIsFilterOpen(true)}
        activeFiltersCount={selectedDepts.length}
      >
        <SearchBar onSearch={setSearchQuery} />
      </Header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Main User Listing */}
          {loading ? (
            <LoadingSkeleton rowsCount={5} />
          ) : error ? (
            <div className="glass rounded-2xl p-8 border border-red-200/50 dark:border-red-950/20 bg-red-50/10 dark:bg-red-950/5 text-center">
              <p className="text-red-600 dark:text-red-400 font-bold mb-4">{error}</p>
              <Button variant="secondary" onClick={() => resetCache()}>
                Try Reloading Cache
              </Button>
            </div>
          ) : sortedUsersList.length === 0 ? (
            <div className="glass rounded-2xl p-12 border border-slate-200/50 dark:border-slate-800/50 text-center flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                No users found
              </h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
                Try changing your search query or filters.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedDepts([])
                }}
              >
                Clear Search & Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Users table */}
              <UserTable
                users={paginatedUsersList}
                onEdit={handleEditTrigger}
                onDelete={handleDeleteTrigger}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />

              {/* Pagination block */}
              <Pagination
                currentPage={currentPage}
                totalItems={sortedUsersList.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </main>

      {/* Filter drawer slide-over overlay */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={setSelectedDepts}
        initialSelectedDepartments={selectedDepts}
      />

      {/* Add / Edit Form Modal Dialog */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        users={users}
      />

      {/* Confirm Delete Safety Modal Overlay */}
      <ConfirmDelete
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        userName={deletingUser ? `${deletingUser.firstName} ${deletingUser.lastName}` : ''}
      />
    </div>
  )
}

export default App
