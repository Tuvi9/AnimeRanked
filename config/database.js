//? Import mongoose library
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
    try {
        //? Connects to MongoDB database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected successfully to MongoDB");

    //! Catches any errors that might occur
    } catch (error) {
        console.log(error);
    //! Closes the connection to the database.
    }
}

module.exports = { main }