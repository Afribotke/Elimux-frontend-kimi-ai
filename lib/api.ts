import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be signed in to perform this action')
  }

  const res = await fetch(apiUrl + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + session.access_token,
      ...options.headers
    }
  })

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(body?.error || 'Request failed with status ' + res.status)
  }

  return body
}

export interface Institution {
  id: string
  name: string
  type: string
  country: string
  city: string
  description: string
  logo_url: string | null
  website: string | null
  accreditation: string | null
  ranking: number | null
  founded_year: number | null
  student_count: number | null
  created_at: string
}

export interface InstitutionFilters {
  country?: string
  city?: string
  search?: string
  limit?: number
  offset?: number
}

export async function getInstitutions(filters: InstitutionFilters = {}): Promise<Institution[]> {
  let query = supabase
    .from('institutions')
    .select('*')
    .order('name', { ascending: true })

  if (filters.country) {
    query = query.eq('country', filters.country)
  }

  if (filters.city) {
    query = query.eq('city', filters.city)
  }

  if (filters.search) {
    query = query.or('name.ilike.%' + filters.search + '%,description.ilike.%' + filters.search + '%')
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching institutions:', error)
    throw new Error('Failed to fetch institutions: ' + error.message)
  }

  return (data || []) as Institution[]
}

export async function getInstitutionById(id: string): Promise<Institution | null> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching institution:', error)
    return null
  }

  return data as Institution
}

export async function getFeaturedInstitutions(limit: number = 6): Promise<Institution[]> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .order('ranking', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured institutions:', error)
    return []
  }

  return (data || []) as Institution[]
}

export interface AdminStats {
  totalInstitutions: number
  totalPrograms: number
  totalUsers: number
  totalApplications: number
  totalRevenue: number
}

export async function getAdminStats(): Promise<AdminStats> {
  const [
    institutionsRes,
    programsRes,
    usersRes,
    applicationsRes
  ] = await Promise.all([
    supabase.from('institutions').select('*', { count: 'exact', head: true }),
    supabase.from('programs').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true })
  ])

  return {
    totalInstitutions: institutionsRes.count || 0,
    totalPrograms: programsRes.count || 0,
    totalUsers: usersRes.count || 0,
    totalApplications: applicationsRes.count || 0,
    totalRevenue: 0
  }
}

export interface InstitutionInput {
  name: string
  country: string
  city: string
  type: string
  description: string
  website: string | null
  accreditation: string | null
  ranking: number | null
  founded_year: number | null
  student_count: number | null
  logo_url: string | null
}

export async function createInstitution(data: InstitutionInput): Promise<Institution | null> {
  try {
    const body = await apiFetch('/api/institutions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return body.institution as Institution
  } catch (error) {
    console.error('Error creating institution:', error)
    throw new Error('Failed to create institution: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export async function updateInstitution(id: string, data: Partial<InstitutionInput>): Promise<Institution | null> {
  try {
    const body = await apiFetch('/api/institutions/' + id, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return body.institution as Institution
  } catch (error) {
    console.error('Error updating institution:', error)
    throw new Error('Failed to update institution: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export async function deleteInstitution(id: string): Promise<void> {
  try {
    await apiFetch('/api/institutions/' + id, { method: 'DELETE' })
  } catch (error) {
    console.error('Error deleting institution:', error)
    throw new Error('Failed to delete institution: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export interface Program {
  id: string
  institution_id: string
  name: string
  degree_type: string
  duration_months: number
  tuition_fees: number | null
  currency: string
  description: string | null
  requirements: string[] | null
  career_paths: string[] | null
  created_at: string
}

export interface ProgramInput {
  institution_id: string
  name: string
  degree_type: string
  duration_months: number
  tuition_fees: number | null
  currency: string
  description: string | null
  requirements: string[] | null
  career_paths: string[] | null
}

export async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching programs:', error)
    throw new Error('Failed to fetch programs: ' + error.message)
  }

  return (data || []) as Program[]
}

export async function getProgramsByInstitution(institutionId: string): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('institution_id', institutionId)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching programs by institution:', error)
    throw new Error('Failed to fetch programs: ' + error.message)
  }

  return (data || []) as Program[]
}

export async function createProgram(data: ProgramInput): Promise<Program | null> {
  try {
    const body = await apiFetch('/api/programs', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return body.program as Program
  } catch (error) {
    console.error('Error creating program:', error)
    throw new Error('Failed to create program: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export async function updateProgram(id: string, data: Partial<ProgramInput>): Promise<Program | null> {
  try {
    const body = await apiFetch('/api/programs/' + id, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return body.program as Program
  } catch (error) {
    console.error('Error updating program:', error)
    throw new Error('Failed to update program: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export async function deleteProgram(id: string): Promise<void> {
  try {
    await apiFetch('/api/programs/' + id, { method: 'DELETE' })
  } catch (error) {
    console.error('Error deleting program:', error)
    throw new Error('Failed to delete program: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

export async function getProgramById(id: string): Promise<Program | null> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching program:', error)
    return null
  }

  return data as Program
}

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'admin' | 'institution_admin' | 'sponsor'
  country: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface UserFilters {
  role?: string
  search?: string
  limit?: number
  offset?: number
}

export async function getUsers(filters: UserFilters = {}): Promise<UserProfile[]> {
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.role) {
    query = query.eq('role', filters.role)
  }

  if (filters.search) {
    query = query.or('full_name.ilike.%' + filters.search + '%,email.ilike.%' + filters.search + '%')
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    console.warn('Profiles table not found or error:', error.message)
    return []
  }

  return (data || []) as UserProfile[]
}

export async function getUserById(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return data as UserProfile
}

export async function updateUserRole(id: string, role: UserProfile['role']): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating user role:', error)
    throw new Error('Failed to update user role: ' + error.message)
  }

  if (!data || data.length === 0) {
    return null
  }

  return data[0] as UserProfile
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting user:', error)
    throw new Error('Failed to delete user: ' + error.message)
  }
}

