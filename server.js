const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/api/books', (req, res) => {
    res.json([
            {
                id: 1,
                title: "Alice's Adventures in Wonderland",
                author: "Charles Lutwidge Dodgson"
            },
            {
                id: 2,
                title: "Einstein's Dreams",
                author: "Alan Lightman"
            }
        ])
})

mongoose.connect('mongodb://localhost/testaroo');

mongoose.connection.once('open', function() {
    console.log('connected')
}).on('error', function(error) {
    console.log('connection error: ', error)
});