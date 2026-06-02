import React, { useState, useEffect } from 'react';

export default function Teams() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams`
      : 'http://localhost:8000/api/teams';

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
      <h2 style={styles.title}>Teams</h2>
      {loading && <p style={styles.info}>Loading teams...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={styles.list}>
          {data.map((team) => (
            <li key={team.id} style={styles.item}>
              <strong style={styles.itemTitle}>{team.name}</strong> - {team.membersCount || 0} members
            </li>
          ))}
          {data.length === 0 && <p style={styles.info}>No teams found.</p>}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', background: '#1e1e2e', borderRadius: '12px', color: '#cdd6f4', border: '1px solid #313244' },
  title: { fontSize: '24px', marginBottom: '15px', color: '#a6e3a1', borderBottom: '2px solid #a6e3a1', paddingBottom: '5px' },
  info: { color: '#a6adc8' },
  error: { color: '#f38ba8' },
  list: { listStyleType: 'none', padding: 0 },
  item: { padding: '10px', background: '#313244', marginBottom: '8px', borderRadius: '6px', borderLeft: '4px solid #a6e3a1' },
  itemTitle: { color: '#a6e3a1' }
};
