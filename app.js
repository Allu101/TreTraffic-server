import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config({});
const { urlencoded, json } = pkg;
const PORT = 5000;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});
