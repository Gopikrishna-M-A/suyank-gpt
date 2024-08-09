import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const processMemes = async () => {
    setProcessing(true);
    try {
      const response = await fetch('/api/process-memes', { method: 'POST' });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error processing memes');
    }
    setProcessing(false);
  };

  return (
    <div>
      <h1>Meme Processor</h1>
      <button onClick={processMemes} disabled={processing}>
        {processing ? 'Processing...' : 'Process Memes'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}