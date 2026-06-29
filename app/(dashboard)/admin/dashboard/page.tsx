'use client'

import React, { useState, useEffect } from 'react'
import { getAdminStats, AdminStats } from '@/lib/api'
import { StatCard } from '@/components/admin/StatCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getAdminStats()
        setStats(data)
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Institutions"
            value={stats.totalInstitutions}
            icon="🏫"
            color="bg-blue-100"
          />
          <StatCard
            title="Programs"
            value={stats.totalPrograms}
            icon="📚"
            color="bg-green-100"
          />
          <StatCard
            title="Users"
            value={stats.totalUsers}
            icon="👥"
            color="bg-purple-100"
          />
          <StatCard
            title="Applications"
            value={stats.totalApplications}
            icon="📝"
            color="bg-orange-100"
          />
        </div>
      </div>
    </div>
  )
}
