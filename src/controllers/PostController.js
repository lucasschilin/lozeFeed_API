const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res){
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res){
    const {author, description, place, hashtags} = req.body;
    const {originalname: image, key, location: url = ""} = req.file;

    const post = await Post.create({
      author, 
      place, 
      description, 
      hashtags,
      image,
      key,
      url,
    });

    req.io.emit('post', post);

    return res.json(post);
  },

  async destroy(req, res){
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  }
}