var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

var { body, validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

// Display list of all Authors.
exports.author_list = function(req, res) {
    //res.send('NOT IMPLEMENTED: Author list');
    Author.find().exec(function(err, list_authors){
        res.render('author/list', { title: 'Author List', error: err, list_authors: list_authors });
    })
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id).exec(callback);
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author/detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    //res.send('NOT IMPLEMENTED: Author create GET');
    res.render('author/form', { title: 'Create Author'});
};

// Handle Author create on POST.
exports.author_create_post = [
    body('first_name').isLength({min:1}).trim().withMessage('First Name Must Be Specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').isLength({min:1}).trim().withMessage('Family Name Must Be Specified.')
    .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').trim().toDate(),
    sanitizeBody('date_of_death').trim().toDate(),
    function(req, res, next) {
        const errors = validationResult(req); // Extract the validation errors from a request.
        if(!errors.isEmpty()){
            res.render('author/form', { title: 'Create Author', errors: errors.array()});
            return;
        }
        var author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });
        author.save(function (err) {
            if (err) { return next(err); }
            res.redirect(author.url); // author saved. Redirect to author detail page.
          });
    }
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};