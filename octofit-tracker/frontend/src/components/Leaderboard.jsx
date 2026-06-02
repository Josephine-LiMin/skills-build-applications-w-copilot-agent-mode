import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
      : 'http://localhost:8000/api/leaderboard';

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((resData) => {
        // Keep compatibility with paginated and array responses
        const items = Array.isArray(resData) ? resData : resData.results || resData.data || [];
        setData(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Leaderboard</h2>
      {loading && <p style={styles.info}>Loading leaderboard...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={styles.list}>
          {data.map((entry, index) => (
            <li key={entry.id || index} style={styles.item}>
              <strong style={styles.itemTitle}>#{index + 1} {entry.name || entry.username}</strong> - {entry.score || entry.points} pts
            </li>
          ))}
          {data.length === 0 && <p style={styles.info}>No leaderboard data found.</p>}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', background: '#1e1e2e', borderRadius: '12px', color: '#cdd6f4', border: '1px solid #313244' },
  title: { fontSize: '24px', marginBottom: '15px', color: '#f9e2af', borderBottom: '2px solid #f9e2af', paddingBottom: '5px' },
  info: { color: '#a6adc8' },
  error: { color: '#f38ba8' },
  list: { listStyleType: 'none', padding: 0 },
  item: { padding: '10px', background: '#313244', marginBottom: '8px', borderRadius: '6px', borderLeft: '4px solid #f9e2af' },
  itemTitle: { color: '#f9e2af' }
};
