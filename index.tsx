import { useState } from 'react';

export default function Home() {
  const [summary, setSummary] = useState('');

  const handleClick = async () => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: 'This is a test text to summarize.'})
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>SkimAI - Simple Summary App</h1>
      <button onClick={handleClick} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Generate Summary
      </button>
      {summary && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{summary}</p>
      )}
    </main>
  );
}