const app = require('./appConfig');
const PositionModel = require('./models/position');

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
    PositionModel.deleteOne({ _id: req.params.id}, function(){
        res.json({});
    })
});

app.delete('/expenses', (req, res) => {
    PositionModel.deleteMany({ positionSign: "exp"}, function() {
        res.json({});
    });
});

// db.getCollection('positionmodels').aggregate([{ $match: {positionSign : "exp" }}])