'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUsers, deleteUser, updateUserRole, UserProfile } from '@/lib/api'

export default function UsersAdmin() {
  const router = useRouter()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    loadUsers()
  }, [roleFilter])

  async function loadUsers() {
    try {
      setLoading(true)
      const filters: { role?: string; search?: string } = {}
      if (roleFilter) filters.role = roleFilter
      if (searchQuery) filters.search = searchQuery

      const data = await getUsers(filters)
      setUsers(data)
    } catch (err) {
      setError('Failed to load users: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    loadUsers()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return

    try {
      setDeleting(id)
      await deleteUser(id)
      setUsers(users.filter(u => u.id !== id))
    } catch (err) {
      alert('Failed to delete: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setDeleting(null)
    }
  }

  async function handleRoleChange(id: string, newRole: UserProfile['role']) {
    try {
      setUpdatingRole(id)
      await updateUserRole(id, newRole)
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    } catch (err) {
      alert('Failed to update role: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setUpdatingRole(null)
    }
  }

  function getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'institution_admin': return 'bg-blue-100 text-blue-800'
      case 'sponsor': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-lg text-gray-600">Loading users...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-lg text-red-600">{error}</div>
          <button
            onClick={loadUsers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <div className="text-sm text-gray-500">
            Total: {users.length} users
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="institution_admin">Institution Admin</option>
            <option value="sponsor">Sponsor</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar_url ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                            {(user.full_name || user.email || '?').charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || 'No name'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.phone || 'No phone'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserProfile['role'])}
                      disabled={updatingRole === user.id}
                      className={'text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-blue-500 ' + getRoleColor(user.role)}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                      <option value="institution_admin">Institution Admin</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.country || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(user.created_at)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => router.push('/admin/users/' + user.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deleting === user.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleting === user.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No users found. Users will appear here when they register.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
