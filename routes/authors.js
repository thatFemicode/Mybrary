const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
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
    res.redirect(`authors/${newAuthor.id}`);
    // res.redirect('authors');
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
router.get('/:id', async (req, res) => {
  // res.send('Mian' + req.params.id);
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render('authors/show', {
      author: author,
      booksByAuthor: books,
    });
  } catch (err) {
    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  // res.send(`Edit  Author ` + req.params.id);
  // instead of making a new author we will be getting an author from the database
  try {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', { author: author });
  } catch {
    res.redirect('/authors');
  }
});
router.put('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    console.log(author, author.name, req.body.name);
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect('/');
    } else {
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author',
      });
    }
  }
});
router.delete('/:id', async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    console.log(author, author.name, req.body.name);
    await author.remove();
    res.redirect(`/authors/`);
  } catch {
    if (author == null) {
      res.redirect('/');
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});
module.exports = router;
