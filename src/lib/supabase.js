import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ogxpddceuzwjbuceeuhg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fmokxmGLsGKU9YpDh9sQpA_o6noDWd9';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Saves appointment booking request to Supabase appointments table
 */
export async function saveAppointmentRequest(data) {
  try {
    const { data: result, error } = await supabase
      .from('appointments')
      .insert([
        {
          full_name: data.fullName || data.name || '',
          phone_number: data.phoneNumber || data.phone || '',
          service: data.serviceSelect || data.service || '',
          preferred_date: data.preferredDate || data.date || '',
          notes: data.userMessage || data.message || '',
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.warn('Supabase record notice:', error.message);
    }
    return { success: !error, result, error };
  } catch (err) {
    console.warn('Supabase connection notice:', err.message);
    return { success: false, error: err };
  }
}
