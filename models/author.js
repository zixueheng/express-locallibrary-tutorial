var mongoose = require('mongoose');
var moment = require('moment'); //格式化日期
moment.locale('zh-cn');

var AuthorSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: Date,
    date_of_death: Date,
});

AuthorSchema.virtual('name').get(function(){
    return this.first_name + ' ' + this.family_name;
});

AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
    if(this.date_of_birth){
        return moment(this.date_of_birth).format('YYYY-MM-DD');
    }else{
        return '';
    }
    
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
    if(this.date_of_death){
        return moment(this.date_of_death).format('YYYY-MM-DD');
    }else{
        return '';
    }   
});

module.exports = mongoose.model('Author', AuthorSchema);