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
                const orderData = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'orders.txt');
                
                // Format products list
                const productsStr = orderData.products.map(p => `${p.productTitle} (x${p.quantity})`).join('; ');
                
                // Build 2-line text layout
                const line1 = `OrderID: ${orderData.orderId}, CustomerName: ${orderData.customerName}, CustomerPhone: ${orderData.customerPhone}, CustomerAddress: ${orderData.customerAddress}\n`;
                const line2 = `Products: ${productsStr}, TotalAmount: ${orderData.totalAmount}, OrderDate: ${orderData.orderDate}\n`;
                const divider = `--------------------------------------------------------------------------------\n`;
                
                fs.appendFileSync(filePath, line1 + line2 + divider, 'utf-8');
                
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
