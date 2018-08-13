const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PositionModel = require('./models/position');
const bodyParser = require('body-parser');

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testB');

mongoose.connection.once('open', function() {
    console.log('connected');
}).on('error', function(error) {
    console.log('connection error: ', error);
});

app.get('/', (req, res) => {
    PositionModel.find({}, (err, data) => {
        res.json(data);
    })
});

app.post('/', (req, res) => {
    const Position = new PositionModel(req.body);
    Position.save()
        .then(savedModel => {
            res.json({
                name: savedModel.positionName,
            });
        });
});
