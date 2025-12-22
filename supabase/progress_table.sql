CREATE TABLE public.progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id text NOT NULL,
  step_id text NOT NULL,
  completed_at timestamp with time zone DEFAULT now() NOT NULL,
  is_completed boolean DEFAULT TRUE NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own progress
CREATE POLICY "Users can view their own progress." ON public.progress
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own progress
CREATE POLICY "Users can insert their own progress." ON public.progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own progress
CREATE POLICY "Users can update their own progress." ON public.progress
  FOR UPDATE USING (auth.uid() = user_id);