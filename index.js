const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: 'https://phoenix-capital-group-deployed.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
  }));
  
app.use(express.json());

app.options('*', cors())

app.get('/', (req, res) => {
  res.send(req.url);
});


// Routing
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/owners', require('./routes/owners'));
app.use('/api/landholdings', require('./routes/landHoldings'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
