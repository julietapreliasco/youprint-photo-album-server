import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || '';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production'
      ? 'https://youprint-photo-album.vercel.app'
      : 'http://localhost:5173',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
