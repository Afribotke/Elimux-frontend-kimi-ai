'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminStats } from '@/lib/api'
import { StatCard } from '@/components/admin/StatCard'

interface DashboardStats {
  totalInstitutions: number
  totalPrograms: number
  totalUsers: number
  totalReviews: number
  totalApplications: number
  recentInstitutions: { id: string; name: string; created_at: string }[]
  recentPrograms: { id: string; name: string; institution_id: string; created_at: string }[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await getAdminStats()
        setStats(res.stats)
      } catch (err) {
        setError('Failed to load stats: ' + (err instanceof Error ? err.message : 'Unknown error'))
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading dashboard stats...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">No stats available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div
            onClick={() => router.push('/admin/institutions')}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <StatCard title="Institutions" value={stats.totalInstitutions} icon="🏫" color="bg-blue-100" />
          </div>
          <div
            onClick={() => router.push('/admin/programs')}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <StatCard title="Programs" value={stats.totalPrograms} icon="📚" color="bg-green-100" />
          </div>
          <div
            onClick={() => router.push('/admin/users')}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <StatCard title="Users" value={stats.totalUsers} icon="👥" color="bg-purple-100" />
          </div>
          <div className="cursor-default">
            <StatCard title="Reviews" value={stats.totalReviews} icon="⭐" color="bg-yellow-100" />
          </div>
          <div className="cursor-default">
            <StatCard title="Applications" value={stats.totalApplications} icon="📝" color="bg-orange-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Institutions</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm text-gray-500">Name</th>
                  <th className="text-left py-2 text-sm text-gray-500">Created</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentInstitutions.map((inst) => (
                  <tr key={inst.id} className="border-b">
                    <td className="py-2">{inst.name}</td>
                    <td className="py-2 text-gray-500">{new Date(inst.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Programs</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm text-gray-500">Name</th>
                  <th className="text-left py-2 text-sm text-gray-500">Created</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentPrograms.map((prog) => (
                  <tr key={prog.id} className="border-b">
                    <td className="py-2">{prog.name}</td>
                    <td className="py-2 text-gray-500">{new Date(prog.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/admin/institutions/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Institution
          </button>
          <button
            onClick={() => router.push('/admin/programs/new')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Program
          </button>
        </div>
      </div>
    </div>
  )
}
