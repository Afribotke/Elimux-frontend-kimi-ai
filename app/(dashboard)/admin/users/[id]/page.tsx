'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getUserById, updateUserRole, UserProfile } from '@/lib/api'

export default function UserDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUser()
  }, [id])

  async function loadUser() {
    try {
      setLoading(true)
      const data = await getUserById(id)
      if (!data) {
        setError('User not found')
        return
      }
      setUser(data)
    } catch (err) {
      setError('Failed to load user: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  async function handleRoleChange(newRole: UserProfile['role']) {
    if (!user) return

    try {
      setSaving(true)
      await updateUserRole(id, newRole)
      setUser({ ...user, role: newRole })
    } catch (err) {
      setError('Failed to update role: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setSaving(false)
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-lg text-gray-600">Loading user...</div>
        </div>
      </div>
    )
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-lg text-red-600">{error}</div>
          <button
            onClick={() => router.push('/admin/users')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Users
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-lg text-gray-600">User not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push('/admin/users')}
            className="mr-4 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-20 w-20">
              {user.avatar_url ? (
                <img className="h-20 w-20 rounded-full" src={user.avatar_url} alt="" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-medium">
                  {(user.full_name || user.email || '?').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{user.full_name || 'No name'}</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className={'inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ' + getRoleColor(user.role)}>
                {user.role}
              </span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Country</label>
                <p className="mt-1 text-sm text-gray-900">{user.country || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Joined</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(user.updated_at)}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Role</h3>
            <div className="flex gap-2">
              {(['student', 'admin', 'institution_admin', 'sponsor'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  disabled={user.role === role || saving}
                  className={
                    'px-4 py-2 rounded text-sm font-medium ' +
                    (user.role === role
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    ) + ' disabled:opacity-50'
                  }
                >
                  {role === 'institution_admin' ? 'Institution Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
            {saving && <p className="mt-2 text-sm text-gray-500">Saving...</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
