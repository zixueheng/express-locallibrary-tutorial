var mongoose = require('mongoose');
var moment = require('moment'); //格式化日期
moment.locale('zh-cn');

var BookInstanceSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function () {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted').get(function () {
  return moment(this.due_back).format('YYYY-MM-DD HH:mm:ss a');
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);