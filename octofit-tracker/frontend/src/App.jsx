import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

export default function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const isLocal = !codespaceName;

  return (
    <Router>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <h1 style={styles.appTitle}>🐙 OctoFit Tracker</h1>
          <div style={styles.statusBadge}>
            {isLocal ? (
              <span style={{ ...styles.badge, backgroundColor: '#f9e2af', color: '#11111b' }}>Local Mode</span>
            ) : (
              <span style={{ ...styles.badge, backgroundColor: '#a6e3a1', color: '#11111b' }}>Codespaces Active</span>
            )}
          </div>
        </header>

        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Activities</Link>
          <Link to="/leaderboard" style={styles.navLink}>Leaderboard</Link>
          <Link to="/teams" style={styles.navLink}>Teams</Link>
          <Link to="/users" style={styles.navLink}>Users</Link>
          <Link to="/workouts" style={styles.navLink}>Workouts</Link>
        </nav>

        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer style={styles.footer}>
          <p>Powered by GitHub Copilot Agent Mode</p>
          <p style={styles.envInfo}>
            VITE_CODESPACE_NAME: <code>{codespaceName || 'Not Set (falling back to localhost)'}</code>
          </p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
    backgroundColor: '#11111b',
    color: '#cdd6f4',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    borderBottom: '1px solid #313244',
    paddingBottom: '15px',
  },
  appTitle: {
    fontSize: '28px',
    margin: 0,
    background: 'linear-gradient(90deg, #f5c2e7, #cba6f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#cdd6f4',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#181825',
    border: '1px solid #313244',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    cursor: 'pointer',
  },
  mainContent: {
    width: '100%',
    maxWidth: '800px',
    flex: 1,
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    color: '#6c7086',
    fontSize: '12px',
    borderTop: '1px solid #313244',
    paddingTop: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  envInfo: {
    marginTop: '5px',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
};
