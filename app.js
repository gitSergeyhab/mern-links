const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth-route');
const linkRouter = require('./routes/link-route');
const redirectRouter = require('./routes/redirect-route');

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/links', linkRouter);
app.use('/to', redirectRouter);

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoDB'));
    console.log('DB connected');
  } catch (err) {
    console.log('server ERROR', err.message);
    process.exit(1);
  }
};

start();

app.listen(PORT, () => console.log(`app started on port ${PORT}`));
