import { supabase } from '../supabaseClient';

interface ProgressEntry {
  lesson_id: string;
  step_id: string;
  is_completed: boolean;
}

export async function saveProgress(userId: string, entry: ProgressEntry) {
  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      lesson_id: entry.lesson_id,
      step_id: entry.step_id,
      is_completed: entry.is_completed,
    }, { onConflict: 'user_id, lesson_id, step_id' }); // Upsert based on these unique identifiers

  if (error) {
    console.error('Error saving progress:', error);
    return null;
  }
  return data;
}

export async function loadProgress(userId: string): Promise<ProgressEntry[] | null> {
  const { data, error } = await supabase
    .from('progress')
    .select('lesson_id, step_id, is_completed')
    .eq('user_id', userId);

  if (error) {
    console.error('Error loading progress:', error);
    return null;
  }
  return data as ProgressEntry[];
}
