var mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');

var BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: mongoose.Schema.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: mongoose.Schema.ObjectId, ref: 'Genre'}]
});

BookSchema.virtual('url').get(function () {
  return '/catalog/book/' + this._id;
});

// BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', BookSchema);