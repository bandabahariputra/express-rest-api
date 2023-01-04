const { validationResult } = require('express-validator');
const Post = require('../models/post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      posts,
    });
  } catch (err) {
    console.log(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json({
      post,
    });
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    userId: req.userId,
  });

  try {
    const savedPost = await post.save();

    res.status(201).json({
      post: savedPost,
    });
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json('Post not found');
    }

    if (post.userId.toString() !== req.userId) {
      return res.status(401).json('Unauthorized');
    }

    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;

    const updatedPost = await post.save();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json('Post not found');
    }

    if (post.userId.toString() !== req.userId) {
      return res.status(401).json('Unauthorized');
    }

    const removedPost = await post.remove();

    res.json({
      post: removedPost,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
