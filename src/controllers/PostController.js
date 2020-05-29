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

    console.log(req.file);

    // const [name] = key.split('.');

    // const fileName = `${name}.jpg`;

    // await sharp(req.file.path)
    //   .resize(500)
    //   .jpeg({quality: 70})
    //   .toFile(
    //     path.resolve(req.file.destination, 'resized', fileName)
    //   );

    // fs.unlinkSync(req.file.path);

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
}