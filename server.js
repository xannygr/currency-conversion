import express from 'express' 
const app = express();
const PORT = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Мидлвар для логирования всех запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  next();
});

app.get('/api/currencies', (req, res) => {
  console.log('Обработка GET /api/currencies');
  res.json({
    success: true,
    data: ['USD', 'EUR', 'GBP', 'JPY'],
    timestamp: new Date().toISOString()
  });
});

// GET /api/rates
app.get('/api/rates', (req, res) => {

  const { base, targets } = req.query;
  res.json({
    success: true,
    data: {
      base: base || 'USD',
      rates: {
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.5
      }
    },
    timestamp: new Date().toISOString()
  });
});

// GET /api/user
app.get('/api/user', (req, res) => {

  res.json({
    success: true,
    data: {
      user_id: req.headers.cookie?.split('=')[1] || 'new-user',
      base_currency: 'USD',
      favorites: ['EUR', 'GBP', 'JPY'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});

// POST /api/user
app.post('/api/user', (req, res) => {

  res.json({
    success: true,
    data: {
      user_id: req.headers.cookie?.split('=')[1] || 'new-user',
      base_currency: req.body.base_currency || 'USD',
      favorites: req.body.favorites || ['EUR', 'GBP', 'JPY'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
  console.log(`Server has been started on port http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/currencies');
  console.log('  GET  /api/rates?base=USD&targets=EUR,GBP');
  console.log('  GET  /api/user');
  console.log('  POST /api/user');
});