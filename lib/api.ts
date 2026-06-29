import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  const { data: result, error } = await supabase
    .from('institutions')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error creating institution:', error)
    throw new Error('Failed to create institution: ' + error.message)
  }

  return result as Institution
}

export async function updateInstitution(id: string, data: Partial<InstitutionInput>): Promise<Institution | null> {
  const { data: result, error } = await supabase
    .from('institutions')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating institution:', error)
    throw new Error('Failed to update institution: ' + error.message)
  }

  return result as Institution
}

export async function deleteInstitution(id: string): Promise<void> {
  const { error } = await supabase
    .from('institutions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting institution:', error)
    throw new Error('Failed to delete institution: ' + error.message)
  }
}

