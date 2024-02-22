const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
  Date: String,
  ProductForm: String,
  author_editor: String,
  isbn: String,
  language: String,
  publisher: String,
  title: String,
}, {
  timestamps: false,
});

module.exports = {
  collectionName: 'products',
  modelName: 'products',
  schema,
};
