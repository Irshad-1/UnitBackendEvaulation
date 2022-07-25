const { User, Post } = require('../database/notes');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

async function register(req, res) {
    const { user } = req.body; // email, name, and password

    let existingUser = await User.findOne({
        email: user.email
    })

    if (existingUser) {
        return res.status(400).send({
            error: "User already exists"
        })
    }

    let userDoc = await User.create(user);

    userDoc = userDoc.toJSON()  // 

    delete userDoc.password;

    return res.send({
        data: userDoc,
    })
}

async function createPost(req, res) {
    try {
        let { post } = req.body;
        const { user } = req.body;

        console.log(user);
        post.user_id = user._id;
        post = await Post.create(post);

        return res.send({
            data: post
        })
    } catch (error) {
        console.log(error)
    }
}
async function updatePost(req, res, next) {
    let { id } = req.params;
    let { post: postData, user } = req.body;


    let post = await Post.findById(id);

    if (post) {
        if (!checkPostBelongsToUser(post, user)) {
            return res.status(401).send({
                error: "This post does not belong to you. You can't udpate it."
            })
        }
    } else {
        return res.status(404).send({
            error: "Post with given id does not exist."
        })
    }

    for (const [key, value] of Object.entries(postData)) {
        post[key] = value;
    }

    await post.save();

    return res.send({
        data: post
    })
}
async function deletePost(req, res, next) {
    let { id } = req.params;
    const { user } = req.body;

    const post = await Post.findById(id)

    if (post) {
        if (!checkPostBelongsToUser(post, user)) {
            return res.status(401).send({
                error: "This post does not belong to you. You can't delete it."
            })
        }
    } else {
        return res.status(404).send({
            error: "Post with given id does not exist."
        })
    }

    await Post.findByIdAndDelete(id);

    return res.send({
        message: "Post has been deleted."
    })

}



async function login(req, res) {
    let { email, password } = req.body;

    let user = await User.findOne({
        email: email
    })

    if (user) {
        // match the password
        if (user.password === password) {
            // generate a secret token
            // encrypt user object {id, email, name}

            let encryptedToken = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name
            }, SECRET)

            return res.send({
                data: {
                    token: encryptedToken
                }
            })
        } else {
            return res.send({
                error: "Password does not match."
            })
        }
    } else {
        return res.status(404).send({
            error: "User is not found"
        })
    }
}
function checkPostBelongsToUser(post, user) {

    if (post.user_id.toString() === user._id.toString()) {
        return true
    }

    return false;
}

async function getLoggedInUser(req, res, next) {
    const { user } = req.body;
    console.log("getloggedin", user);
    if (!user) {
        return res.status(400).send({
            error: "Token was not provided"
        })
    } else {
        return res.send({
            data: user
        })
    }

}
module.exports = {
    login, register, getLoggedInUser, createPost, updatePost, deletePost
}