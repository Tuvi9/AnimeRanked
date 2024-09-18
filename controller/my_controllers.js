//* Imports defined mongoose schema for interacting with MongoDB
const { response } = require('express');
const blogModel = require('../models/blogModel')

//* Creates a new blog
const createBlog = async (req, res, next) => {

    try {
        //* req.body contains the data sent.
        const createModel = await blogModel.create(req.body)
        //* If successful send 201(Created)
        res.status(201).json(createModel)
    } catch(error) {
        console.log(error);
    }
};

//* Returns all exsisting blogs
const getBlogs = async (req, res, next) => {
    //* {} means it will return all documents form the MongoDB collection
    const allBlogs = await blogModel.find({})
    //* If successful send 200(OK)
    res.status(200).json(allBlogs)
};

//* Updates blog by id
const updateBlogs = async (req, res, next) => {
    //* Extracts id from URL(:id)
    const { id } = req.params;
    try {
        //* mongoose findByIdAndUpdate  finds the blog and updates it with the data in req.body
        //* { new: true } returns the updated document
        const updatedBlog = await blogModel.findByIdAndUpdate(id, req.body, { new: true });
        //* if no blog is found
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        //* if success
        res.status(200).json(updatedBlog);
    //* if unexpected error occurs
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//* Deletes blog by id
const deleteBlogs = async (req, res, next) => {
    //* Extracts id from URL(:id)
    const { id } = req.params;
    try {
        //* mongoose findByIdAndDelete  finds the blog with said :id and deletes it
        const deletedBlog = await blogModel.findByIdAndDelete(id);
        //* if no blog found to delete
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        //* if success send code which means 'no content'
        res.status(204).send();
    //* if unexpected error occurs
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
createBlog,
getBlogs,
updateBlogs,
deleteBlogs
}