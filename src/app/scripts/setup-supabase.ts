import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupSupabase() {
  // Create memes table
  const { error: createTableError } = await supabase.rpc('create_memes_table');
  if (createTableError) console.error('Error creating table:', createTableError);

  // Insert sample data
  const { error: insertError } = await supabase.from('memes').insert([
    { text: 'When you finally fix that bug', imageUrl: 'https://example.com/memes/1.jpg' },
    { text: 'Code review be like', imageUrl: 'https://example.com/memes/2.png' },
    { text: 'JavaScript promises in a nutshell', imageUrl: 'https://example.com/memes/3.gif' },
  ]);
  if (insertError) console.error('Error inserting data:', insertError);

  console.log('Supabase setup complete');
}

setupSupabase();