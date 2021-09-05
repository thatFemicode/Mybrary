// if (process.env.ENV === 'dev') {
//   // const path = require("path");
//   // require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
//   // require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
//   // require('dotenv').parse();
//   require('dotenv').config();
// }

require('dotenv').config();
const uri = process.env.DATABASE_URL;
console.log(uri);
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Hook Up initial index router to the server by requiring it
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
// const uri =
//   'mongodb+srv://user:tumininu10@cluster0.kagsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connecting mongodb library with the app
const mongoose = require('mongoose');

// Using out connection to connect to either a development or production database

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected!');
    app.listen(3000);
  })
  .catch((err) => {
    console.log('DB Connection Error: ' + err);
  });
// // Checking if connection is pure now
// mongoose.connection.once('open', () => {
//   console.log('connected!');
// });
// mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to database'));
app.use('/', indexRouter);
