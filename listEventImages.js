import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

// Use your Service Role Key for administrative tasks on the server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const listEventImages = async () => {
  console.log("Fetching file list from 'event-images' bucket...");

  // The list() method retrieves all files in the bucket's root
  const { data, error } = await supabase
    .storage
    .from('event-images')
    .list();

  if (error) {
    console.error('Error listing files:', error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log('Successfully retrieved files:');
    // Log the name of each file found in the bucket
    data.forEach(file => {
      console.log(`- ${file.name}`);
    });
  } else {
    console.log('The bucket is empty or no files were found.');
  }
};

listEventImages();
