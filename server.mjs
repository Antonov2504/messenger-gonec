import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

// Папка билда
const distPath = path.join(__dirname, 'dist');

// Раздаём статику
app.use(express.static(distPath));

// SPA fallback — для всех маршрутов отдаём index.html
app.get(/.*/, (_, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
