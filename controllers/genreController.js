var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

var { body, validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Genre list');
    Genre.find().exec(function(err, genre_list){
        res.render('genre/list', { title: 'Genre List', error: err, genre_list: genre_list });
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id).exec(callback);
        },
        books: function(callback){
            Book.find({genre: req.params.id}).exec(callback);
        }
    },function(err, results){
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre/detail', { title: 'Genre Detail', genre: results.genre, books: results.books });
    });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    //res.send('NOT IMPLEMENTED: Genre create GET');
    res.render('genre/form', { title: 'Create Genre'});
};

// Handle Genre create on POST. 参考：http://www.expressjs.com.cn/guide/routing.html 路由句柄
exports.genre_create_post = [ //这里是将一个中间件数组传给router 函数，每个中间件函数会依次调用，用这种方式是必须的因为 sanitisers/validators 是中间件函数
    body('name', 'Name is required!').isLength({min: 1}).trim(), //验证字段
    sanitizeBody('name').trim().escape(), //净化字段
    function(req, res, next) { //在 validation and sanitization 之后 处理 request
        const errors = validationResult(req); // Extract the validation errors from a request.
        if(!errors.isEmpty()){
            res.render('genre/form', { title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        }
        var genre = new Genre({ name: req.body.name});
        Genre.findOne({name: req.body.name}, function(err, gen){
            if(err) return next(err);
            if(gen){
                res.redirect(gen.url); // Genre exists, redirect to its detail page.
            }else{
                genre.save(function (err) {
                    if (err) { return next(err); }
                    res.redirect(genre.url); // Genre saved. Redirect to genre detail page.
                  });
            }
        });
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};