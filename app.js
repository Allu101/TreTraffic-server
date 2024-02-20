const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const dataRouter = require('./routes/data');
const locationsRouter = require('./routes/locations');

const PORT = 5000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use('/api/data', dataRouter);
app.use('/api/locations', locationsRouter);

app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});