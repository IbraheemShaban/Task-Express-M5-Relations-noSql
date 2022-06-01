const Tag = require('../../models/Tag');

// exports.fetchTag = async (tagId) => {
//   try {
//     const tag = await Tag.findById(tagId);
//     return tag;
//   } catch (error) {
//     next(error);
//   }
// };

exports.tagsCreate = async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

exports.tagsDelete = async (req, res, next) => {
  try {
    await Tag.findByIdAndRemove({ _id: req.tag.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.tagsUpdate = async (req, res, next) => {
  try {
    await Tag.findByIdAndUpdate(req.tag.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.tagsGet = async (req, res, next) => {
  try {
    const tags = await Tag.find({}, '-createdAt -updatedAt').populate(
      'posts',
      'name'
    );
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.fetchMonument = async (req, res, next, monumentId) => {
  try {
    const monument = await Tag.findById(monumentId);
    return monument;
  } catch (error) {
    next(error);
  }
};
