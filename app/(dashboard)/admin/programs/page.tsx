'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminPrograms, deleteProgram, Program, getInstitutions, Institution } from '@/lib/api'

export default function ProgramsAdmin() {
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [pagination, setPagination] = useState<{ page: number; limit: number; total: number; totalPages: number } | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [filterInstitution, setFilterInstitution] = useState<string>('')

  useEffect(() => {
    loadData(page)
  }, [page])

  async function loadData(p: number) {
    try {
      setLoading(true)
      setError(null)
      const [programsRes, institutionsData] = await Promise.all([
        getAdminPrograms(p, 20),
        getInstitutions()
      ])
      setPrograms(programsRes.data)
      setPagination(programsRes.pagination)
      setInstitutions(institutionsData)
    } catch (err) {
      setError('Failed to load data: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this program? This cannot be undone.')) return

    try {
      setDeleting(id)
      await deleteProgram(id)
      loadData(page)
    } catch (err) {
      alert('Failed to delete: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setDeleting(null)
    }
  }

  function getInstitutionName(id: string): string {
    const inst = institutions.find(i => i.id === id)
    return inst?.name || 'Unknown'
  }

  const filteredPrograms = filterInstitution
    ? programs.filter(p => p.institution_id === filterInstitution)
    : programs

  if (loading && programs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-lg text-gray-600">Loading programs...</div>
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
            onClick={() => loadData(page)}
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
          <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
          <button
            onClick={() => router.push('/admin/programs/new')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Program
          </button>
        </div>

        <div className="mb-6">
          <select
            value={filterInstitution}
            onChange={(e) => setFilterInstitution(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Institutions</option>
            {institutions.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuition</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{program.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{getInstitutionName(program.institution_id)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {program.degree_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{program.duration_months} months</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {program.tuition_fees ? program.currency + ' ' + program.tuition_fees.toLocaleString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => router.push('/admin/programs/' + program.id + '/edit')}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program.id)}
                      disabled={deleting === program.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleting === program.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPrograms.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No programs found. Add your first program above.
            </div>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
