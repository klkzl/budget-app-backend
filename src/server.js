const app = require('./appConfig');
const PositionModel = require('./models/position');

const INCOME = 'inc';
const EXPENSE = 'exp';

app.get('/incomes', (req, res) => {
    PositionModel.find({}, (err, data) => {
        const incomes = data.filter(position => position.positionSign === INCOME);
        res.json(incomes);
    })
});

app.get('/expenses', (req, res) => {
    PositionModel.find({}, (err, data) => {
        const expenses = data.filter(position => position.positionSign === EXPENSE);
        res.json(expenses);
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
    PositionModel.deleteOne({ _id: req.params.id}, () => {
        res.json({});
    })
});

app.delete('/expenses', (req, res) => {
    PositionModel.deleteMany({ positionSign: EXPENSE}, () => {
        res.json({});
    });
});

// db.getCollection('positionmodels').aggregate([{ $match: {positionSign : "exp" }}])