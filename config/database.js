//? Import mongoose library
const mongoose = require('mongoose');

async function main() {
    try {
        //? Connects to MongoDB database
        await mongoose.connect(
            "mongodb+srv://guyy:DemonSlayer6921@animeranked.4puup.mongodb.net/?retryWrites=true&w=majority&appName=AnimeRanked"
        );
        console.log("Connected successfully to MongoDB");

    //! Catches any errors that might occur
    } catch (error) {
        console.log(error);
    //! Closes the connection to the database.
    }
}

module.exports = { main }