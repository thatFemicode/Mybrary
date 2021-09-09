const express = require('express');
const router = express.Router();
const Author = require('../models/author');
// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  // console.log(req.query);
  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

// New Author Routes
// Pass Variables from author model and these variables are going to be sent
// down to  the ejs file but this does not say anything to the database but it creates an author which we can
// Use to save delete and update things in out ejs file
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Route to CREATE THE AUTHORS WRITE TO POST the authors to the route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect('authors');
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Erroer Creating Author',
    });
  }
  //   First Version
  //   author.save((err, newAuthor) => {
  //     if (err) {
  //       res.render('authors/new', {
  //         author: author,
  //         errorMessage: 'Erroer Creating Author',
  //       });
  //     } else {
  //       res.redirect('authors');
  //     }
  //   });
});
module.exports = router;
