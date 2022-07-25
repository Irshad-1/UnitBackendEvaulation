const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ["true", "Name should be provided"]
    },
    email: {
        type: String,
        required: ["true", "Email should be provided"]
    },
    password: {
        type: String,
        required: ["true", "Password should be provided"]
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ["true", "title should be provided"]
    },
    note: {
        type: String,
        required: ["true", "note should be provided"]
    },
    label: {
        type: String,
        required: ["true", "label should be provided"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };