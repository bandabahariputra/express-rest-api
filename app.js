const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer().array());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

mongoose.connect('mongodb+srv://bandabahariputra:bandabahariputra@node.wypos.mongodb.net/example')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
