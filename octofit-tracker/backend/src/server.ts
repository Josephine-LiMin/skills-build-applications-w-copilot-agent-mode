import express from 'express';
import connectDB from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Octocat' }]);
});

app.get('/api/activities', (req, res) => {
  res.json([{ id: 1, type: 'Running', duration: 30 }]);
});

// Configure API base URL for Codespaces and Localhost
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

console.log(`API Base URL: ${apiBaseUrl}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
