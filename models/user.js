const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const User = new mongoose.model('users', UserSchema);

module.exports = User;