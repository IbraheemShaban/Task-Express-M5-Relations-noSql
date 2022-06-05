const Post = require('../../models/Post');

exports.fetchPost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

// exports.postsCreate = async (req, res) => {
//   try {
//     const newPost = await Post.create(req.body);
//     res.status(201).json(newPost);
//   } catch (error) {
//     next(error);
//   }
// };

exports.postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
//
exports.postsUpdate = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// exports.postsGet = async (req, res) => {
//   try {
//     // const posts = await Post.find();
//     const posts = await Post.find({}, '-createdAt -updatedAt').populate(
//       'authorId',
//       'name'
//     );
//     res.json(posts);
//   } catch (error) {
//     next(error);
//   }
// };

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find({}, '-createdAt -updatedAt')
      .populate('authorId', 'name')
      .populate('tags', 'name');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.tagAdd = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    await Post.findByIdAndUpdate(req.post.id, {
      $push: { tags: tagId },
    });
    await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: req.post.id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.fetchMonument = async (req, res, next, monumentId) => {
  try {
    const monument = await Post.findById(monumentId);
    return monument;
  } catch (error) {
    next(error);
  }
};
