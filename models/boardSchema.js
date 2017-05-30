var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
    writer: {type: String, default: 'unknown'},
    password: String,
    title: String,
    contents: String,
    date: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false} // true면 삭제 된 경우임
});

var BoardContent = mongoose.model('BoardContent', boardSchema);

module.exports = BoardContent;
