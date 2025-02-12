import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import { initData } from './db/db.js';
dotenv.config({});

const PORT = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use('/api', routes);

await initData();

app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});
