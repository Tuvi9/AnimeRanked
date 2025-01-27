//* Imports defined mongoose schema for interacting with MongoDB
const { response } = require('express');
const supabase = require('../config/supabaseClient');


//* Creates a new blog
const createBlog = async (req, res, next) => {
    const animeReview = req.body;
    try {
        //* req.body contains the data sent.
        const { data, error } = await supabase
            .from('Anime')
            .insert({
            title: animeReview.title,
            description: animeReview.description,
            image: animeReview.image
        })

        if (error) throw error;
        res.status(200).json(data)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
};

//* Returns all exsisting blogs
const getBlogs = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('Anime')
            .select('*')

        if (error) throw error;
        res.status(200).json(data)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

//* Updates blog by id
const updateBlogs = async (req, res, next) => {
    //* Extracts id from URL(:id)
    const { id } = req.params;
    const { newDescription } = req.body;
    console.log(newDescription)
    console.log(id)

    try {
        const { data, error } = await supabase
            .from('Anime')
            .update({ description: newDescription })
            .eq('id', id)

        if (error) throw error;
        res.status(200).json(AnimeUpdate)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
//* Deletes blog by id
const deleteBlogs = async (req, res, next) => {
    //* Extracts id from URL(:id)
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('Anime')
            .delete()
            .eq('id', id)

        if (error) throw error;
        res.status(200).json(data)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
createBlog,
getBlogs,
updateBlogs,
deleteBlogs
}