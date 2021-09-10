// if (process.env.ENV === 'dev') {
//   // const path = require("path");
//   // require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
//   // require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
//   // require('dotenv').parse();
//   require('dotenv').config();
// }

// require('dotenv').config();
// const uri = process.env.MONGODB_URI;
// console.log(uri);

const express = require('express');
// Require dotenv for the environment varaibles
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3000;
const connectDB = require('./database/connection');
connectDB();
// Hook Up initial index router to the server by requiring it
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Layput file imports everything from all our pages (views)
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// const uri =
//   'mongodb+srv://user:tumininu10@cluster0.kagsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connecting mongodb library with the app
const mongoose = require('mongoose');

// Using out connection to connect to either a development or production database

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// .then(() => {
//   console.log('DB Connected!');
// })
// .catch((err) => {
//   console.log('DB Connection Error: ' + err);
// });
// // Checking if connection is pure now
// mongoose.connection.once('open', () => {
//   console.log('connected!');
// });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
