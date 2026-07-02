'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createProgram, ProgramInput, getInstitutions, Institution } from '@/lib/api'

function toLines(value: string): string[] | null {
  const lines = value.split('\n').map(s => s.trim()).filter(Boolean)
  return lines.length > 0 ? lines : null
}

export default function NewProgram() {
  const router = useRouter()
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [instLoading, setInstLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInstitutions() {
      try {
        const data = await getInstitutions()
        setInstitutions(data)
      } catch (err) {
        console.error('Failed to load institutions:', err)
      } finally {
        setInstLoading(false)
      }
    }
    loadInstitutions()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: ProgramInput = {
      institution_id: formData.get('institution_id') as string,
      name: formData.get('name') as string,
      degree_type: formData.get('degree_type') as string,
      duration_months: parseInt(formData.get('duration_months') as string) || 0,
      tuition_fees: parseFloat(formData.get('tuition_fees') as string) || null,
      currency: (formData.get('currency') as string) || 'USD',
      description: (formData.get('description') as string) || null,
      requirements: toLines(formData.get('requirements') as string || ''),
      career_paths: toLines(formData.get('career_paths') as string || '')
    }

    if (!data.institution_id || !data.name || !data.degree_type) {
      setError('Institution, name, and degree type are required')
      setSaving(false)
      return
    }

    try {
      await createProgram(data)
      router.push('/admin/programs')
    } catch (err) {
      setError('Failed to create program: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  if (instLoading) {
    return <div className="p-8 max-w-2xl mx-auto">Loading institutions...</div>
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Program</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Institution *</label>
          <select name="institution_id" required className="w-full border rounded px-3 py-2">
            <option value="">Select an institution</option>
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>{inst.name} ({inst.country})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Program Name *</label>
          <input name="name" required className="w-full border rounded px-3 py-2" placeholder="e.g. Bachelor of Computer Science" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree Type *</label>
            <select name="degree_type" required defaultValue="Bachelor" className="w-full border rounded px-3 py-2">
              <option value="Certificate">Certificate</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor&apos;s</option>
              <option value="Master">Master&apos;s</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (months)</label>
            <input name="duration_months" type="number" min="1" required defaultValue={36} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tuition Fees</label>
            <input name="tuition_fees" type="number" min="0" step="0.01" className="w-full border rounded px-3 py-2" placeholder="e.g. 5000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select name="currency" defaultValue="KES" className="w-full border rounded px-3 py-2">
              <option value="KES">KES (Kenyan Shilling)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows={4} className="w-full border rounded px-3 py-2" placeholder="Program overview, curriculum highlights..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Entry Requirements</label>
          <textarea name="requirements" rows={3} className="w-full border rounded px-3 py-2" placeholder="One requirement per line" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Career Paths</label>
          <textarea name="career_paths" rows={3} className="w-full border rounded px-3 py-2" placeholder="One career path per line" />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? 'Creating...' : 'Create Program'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/programs')}
            className="px-6 py-2 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
