const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PositionModel = require('./models/position');
const bodyParser = require('body-parser');

app.listen(3000, function() {
    console.log('listening on 3000')
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, DELETE, POST, OPTIONS");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testB');

mongoose.connection.once('open', function() {
    console.log('connected');
}).on('error', function(error) {
    console.log('connection error: ', error);
});

app.get('/incomes', (req, res) => {
    PositionModel.find({}, (err, data) => {
        const incomes = data.filter(position => {
            return position.positionSign === 'inc'
        })
        res.json(incomes);
        console.log(incomes);
    })
});

app.get('/expenses', (req, res) => {
    PositionModel.find({}, (err, data) => {
        const expenses = data.filter(position => {
            return position.positionSign === 'exp'
        })
        res.json(expenses);
        console.log(expenses);
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

app.delete('/:id', (req, res) => {
    // console.log(req.params);
    PositionModel.remove({ _id: req.params.id}, function(){
        res.json({});
    })
});