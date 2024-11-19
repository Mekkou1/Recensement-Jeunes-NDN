import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fkjlnemqtdutwvcxvkoc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZramxuZW1xdGR1dHd2Y3h2a29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNDkxMzYsImV4cCI6MjA0NjkyNTEzNn0.Yb2NKvSd83H8CSF9CMMKRp8mIRYpO9lOROoNLmegXpQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
