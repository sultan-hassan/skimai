// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>🔍 SkimAI</h1>
      <textarea
        placeholder="Paste your scientific text, abstract, or notes here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          width: '100%',
          height: 150,
          padding: '10px',
          fontSize: '1rem',
          marginBottom: '20px',
        }}
      />
      <button
        onClick={handleSummarize}
        disabled={loading || !inputText}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
        }}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div style={{ marginTop: '30px', background: '#f0f0f0', padding: '15px', borderRadius: '6px' }}>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </main>
  );
}
