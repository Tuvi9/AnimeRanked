//* Imports defined mongoose schema for interacting with MongoDB
const { response } = require('express');
const supabase = require('../config/supabaseClient');


//* Creates a new blog
const createBlog = async (req, res, next) => {
    const { title, description, image, user_id } = req.body;
    try {
        //* req.body contains the data sent.
        const { data, error } = await supabase
            .from('Anime')
            .insert({
                title: title,
                description: description,
                image: image,
                user_id: user_id
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
    const { user_id } = req.query;
    try {
        const { data, error } = await supabase
            .from('Anime')
            .select('*')
            .eq('user_id', user_id)

        if (error) throw error;
        res.status(200).json(data)
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

//* Updates blog by id
const updateBlogs = async (req, res, next) => {
    const { id } = req.params;
    const { newDescription } = req.body;

    try {
        const { data, error } = await supabase
            .from('Anime')
            .update({ description: newDescription })
            .eq('id', id)

        if (error) throw error;
        res.status(200).json(data)
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

//* Creates a new user profile in Supabase
const createUserProfile = async (req, res, next) => {
    const { uid, username, email } = req.body;
    console.log('Attempting to create profile:', { uid, username, email });

    try {
        const { data, error } = await supabase
            .from('profiles')
            .insert({
                id: uid,
                username: username,
                email: email
            });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }
        
        console.log('Profile created successfully:', data);
        res.status(200).json(data)
    } catch(error) {
        console.error('Failed to create profile:', error);
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    createBlog,
    getBlogs,
    updateBlogs,
    deleteBlogs,
    createUserProfile
}