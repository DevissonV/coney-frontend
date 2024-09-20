import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/users/useUserStore'
import { fetchUsers } from '../../services/users/UserService'
import UsersPage from '../../pages/users/UsersPage'

const UsersContainer = () => {
  const [loading, setLoading] = useState(true)
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers()
        setUsers(usersData)
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [setUsers])

  return <UsersPage users={users} loading={loading} />
}

export default UsersContainer
