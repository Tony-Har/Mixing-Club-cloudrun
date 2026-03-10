import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Automatic Domain Redirects
  app.use((req, res, next) => {
    const host = req.get('host');
    const targetHost = 'clube.mixingoriginals.com';
    
    // Redirect if it's 'club', 'www.club', or 'www.clube'
    const domainsToRedirect = [
      'club.mixingoriginals.com',
      'www.club.mixingoriginals.com',
      'www.clube.mixingoriginals.com'
    ];

    if (host && domainsToRedirect.includes(host)) {
      return res.redirect(301, `https://${targetHost}${req.url}`);
    }
    
    next();
  });

  // API routes FIRST
  app.post('/api/submit-form', async (req, res) => {
    try {
      const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        console.error('GOOGLE_SCRIPT_URL is not defined in environment variables.');
        return res.status(500).json({ error: 'Server configuration error' });
      }

      // Forward the request to Google Apps Script
      // We use fetch to send the data to the Google Script URL securely from the backend
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });

      // Google Apps Script usually returns a redirect or JSON depending on how it's called.
      // We just need to know it didn't throw a network error.
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error forwarding to Google Sheets:', error);
      res.status(500).json({ error: 'Failed to submit form' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
    
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
