import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Institution {
  id: string
  name: string
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
