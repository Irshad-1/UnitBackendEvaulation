const express = require('express');

const { register, login, getLoggedInUser, createPost, updatePost, deletePost } = require('../handlers/userAndPost');
const auth = require('./middlewares/auth');


const notesRouter = express.Router();


notesRouter.post('/users', register);
notesRouter.post('/users/login', login);
notesRouter.post('/posts', auth, createPost);
notesRouter.get('/users/getLoggedIn', auth, getLoggedInUser);
notesRouter.post('/posts', auth, createPost);
notesRouter.patch('/posts/:id', auth, updatePost);
notesRouter.delete('/posts/:id', auth, deletePost);

module.exports = notesRouter;