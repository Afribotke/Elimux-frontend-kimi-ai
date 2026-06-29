import React from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: string
  color: string
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={'p-3 rounded-full ' + color}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}
