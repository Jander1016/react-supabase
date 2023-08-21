import {createClient} from "@supabase/supabase-js";

const API_URL = import.meta.env.VITE_API_SUPABASE_URL;
const API_KEY= import.meta.env.VITE_API_SUPABASE_ANON_KEY

export const client = createClient(API_URL, API_KEY)