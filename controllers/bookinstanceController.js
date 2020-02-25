var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

var { body, validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');


// Display list of all BookInstances.
exports.bookinstance_list = function(req, res) {
    //res.send('NOT IMPLEMENTED: BookInstance list');
    BookInstance.find().populate('book').exec(function(err, list_bookinstances){
        res.render('bookinstance/list', { title: 'Book Instance List', list_bookinstances: list_bookinstances });
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if (err) { return next(err); }
      if (bookinstance==null) { // No results.
          var err = new Error('Book copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('bookinstance/detail', { title: 'Book:', bookinstance:  bookinstance});
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: BookInstance create GET');
    Book.find({}, function(err, books){
        if(err){ return next(err);}
        res.render('bookinstance/form', {title: 'Create Book Instance', books: books});
    });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
    body('imprint', 'Imprint must not be empty.').isLength({min: 1}).trim(),
    body('book', 'Book must not be empty.').isLength({min: 1}).trim(),
    body('due_back', 'Due back is not a valide date').optional({checkFalsy: true}).isISO8601(),

    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),

    function(req, res, next) {
        // res.send('NOT IMPLEMENTED: BookInstance create POST');
        const errors = validationResult(req);
        const bookinstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });
        if(!errors.isEmpty()){
            Book.find({}, function(err, books){
                if(err){ return next(err);}
                res.render('bookinstance/form', {title: 'Create Book Instance', books: books, bookinstance: bookinstance, errors: errors.array()});
            });
            return;
        }
        bookinstance.save(function(err, results){
            if(err){ return next(err); }
            res.redirect(bookinstance.url);
        });
    }
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};