import { supabase } from '@/lib/supabase'

export interface Institution {
  id: string
  name: string
  country: string
  city: string
  type: string
  website: string
  description: string
  logo_url: string
  established_year: number
  ranking: number
  created_at: string
}

export interface Program {
  id: string
  institution_id: string
  name: string
  degree_type: string
  duration_months: number
  tuition_usd: number
  description: string
  requirements: string[]
  career_paths: string[]
  created_at: string
}

export async function getInstitutions(): Promise<Institution[]> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .order('ranking', { ascending: true })
  
  if (error) {
    console.error('Error fetching institutions:', error)
    return []
  }
  
  return data || []
}

export async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
  
  if (error) {
    console.error('Error fetching programs:', error)
    return []
  }
  
  return data || []
}

export async function searchPrograms(query: string): Promise<Program[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*, institutions(name, country, logo_url)')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
  
  if (error) {
    console.error('Error searching programs:', error)
    return []
  }
  
  return data || []
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
  
  return data
}
