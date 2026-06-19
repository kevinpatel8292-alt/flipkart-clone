import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-order-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-order') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const newOrder = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'orders.json');

                // Read existing orders (or start fresh)
                let orders = [];
                if (fs.existsSync(filePath)) {
                  try {
                    const raw = fs.readFileSync(filePath, 'utf-8');
                    orders = JSON.parse(raw);
                    if (!Array.isArray(orders)) orders = [];
                  } catch {
                    orders = [];
                  }
                }

                // Append new order and write back
                orders.push(newOrder);
                fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})

