const Author = require('../../models/Author');
const Post = require('../../models/Post');

exports.fetchAuthor = async (authorId) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

exports.authorsCreate = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};
// exports.coursesCreate = async (req, res, next) => {
//   try {
//     const newCourse = await Course.create(req.body);
//     await Teacher.findByIdAndUpdate(req.teacher.id, {
//       $push: { courses: newCourse._id },
//     });
//     res.status(201).json(newCourse);
//   } catch (error) {
//     next(error);
//   }
// };

exports.postsCreate = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    await Author.findByIdAndUpdate(req.author.id, {
      $push: { posts: newPost._id },
    });
    res.status(201).json(newPost);
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
exports.authorsDelete = async (req, res, next) => {
  try {
    await Author.findByIdAndRemove({ _id: req.author.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsUpdate = async (req, res, next) => {
  try {
    await Author.findByIdAndUpdate(req.author.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsGet = async (req, res, next) => {
  try {
    // const authors = await Author.find();
    const authors = await Author.find({}, '-createdAt -updatedAt').populate(
      'posts'
    );
    res.json(authors);
  } catch (error) {
    next(error);
  }
};
exports.fetchMonument = async (req, res, next, monumentId) => {
  try {
    const monument = await Author.findById(monumentId);
    return monument;
  } catch (error) {
    next(error);
  }
};
