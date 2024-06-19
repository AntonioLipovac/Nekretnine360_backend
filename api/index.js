import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Spojeno na MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// Definicija osnovne rute za GET zahtev na '/'
app.get('/', (req, res) => {
  res.send('Pozdrav! Ovo je osnovna stranica.');
});

app.listen(3000, () => {
  console.log('Server je pokrenut na portu 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);