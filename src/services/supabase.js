import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lzzrnyjaoikvzpfyioop.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6enJueWphb2lrdnpwZnlpb29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODI1MTAsImV4cCI6MjAxMjk1ODUxMH0.xC3Muq_I3ArPn53les7bPW5GuliqHEyPUkOenlYR2rk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
