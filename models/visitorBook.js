var mongoose = require('mongoose');

var visitorBook = mongoose.Schema({
    writer: {type: String, default: 'unknown'},
    comment: String,
    date: {type: Date, default: Date.now}
});

var VisitorBook = mongoose.model('VisitorBook', visitorBook);

module.exports = VisitorBook;
