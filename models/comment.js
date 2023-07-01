const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CommentSchema = new Schema({
    name: {
        type: String,
    },
    comment: {
        type: String,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const Comment = new mongoose.model('comments', CommentSchema);

module.exports = Comment;