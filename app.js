const express = require('express');
const app = express();
const port = 3000;

//? http.IncomingMessage & http.ServerResponse
app.get('/', (req, res) => {
    res.send("I'm Working!")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})