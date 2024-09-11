const mongoose = require('mongoose');

//! Define new blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

//! Creates new model based on the schema above
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;