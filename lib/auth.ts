import { supabase } from './api'

export interface AuthError {
  message: string
  status?: number
}

export async function signUp(email: string, password: string, fullName: string): Promise<{ user: any | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    return { user: data.user, error: null }
  } catch (err) {
    return {
      user: null,
      error: { message: err instanceof Error ? err.message : 'Unknown error during signup' }
    }
  }
}

export async function signIn(email: string, password: string): Promise<{ user: any | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    return { user: data.user, error: null }
  } catch (err) {
    return {
      user: null,
      error: { message: err instanceof Error ? err.message : 'Unknown error during signin' }
    }
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { error: { message: error.message } }
    }
    return { error: null }
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : 'Unknown error during signout' } }
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) return { user: null, error }
    return { user, error: null }
  } catch (err) {
    return { user: null, error: err }
  }
}

export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/reset-password'
    })
    if (error) {
      return { error: { message: error.message } }
    }
    return { error: null }
  } catch (err) {
    return { error: { message: err instanceof Error ? err.message : 'Unknown error' } }
  }
}
