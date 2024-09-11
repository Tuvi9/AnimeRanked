//* Imports defined mongoose schema for interacting with MongoDB
const blogModel = require('../models/blogModel')

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

const getBlogs = async (req, res, next) => {
    //* {} means it will return all documents form the MongoDB collection
    const allBlogs = await blogModel.find({})
    //* If successful send 200(OK)
    res.status(200).json(allBlogs)
}

module.exports = {
createBlog,
getBlogs
}