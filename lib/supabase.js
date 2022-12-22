import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://gafxcpszcyaqjsslwbzq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZnhjcHN6Y3lhcWpzc2x3YnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1ODk4ODcsImV4cCI6MTk4NzE2NTg4N30.rOE59yDBtlfrP_GHwvYjag9ZQcejwAQix6IpKC2n4Eg');

export default supabase;