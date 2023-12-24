import { createClient } from "@supabase/supabase-js";
const apiUrl = "https://hgyklvikgehqgqlrlkrc.supabase.co";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneWtsdmlrZ2VocWdxbHJsa3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzOTQ3MzQsImV4cCI6MjAxODk3MDczNH0.P0_rjnqe_GphQKsLZ7kCzSZTKT0FBNOyDGrb3fysj-0";
export const supabase = createClient(apiUrl, apiKey);
