const app = require('./appConfig');
const PositionModel = require('./models/position');

const INCOME = 'inc';
const EXPENSE = 'exp';

app.get('/incomes', (req, res) => {
    PositionModel.find({})
        .then(data => {
            const incomes = data.filter(position => position.positionSign === INCOME);
            res.json(incomes);
        })
        .catch(err => console.log(err));
});

app.get('/expenses', (req, res) => {
    PositionModel.find({})
        .then(data => {
            const expenses = data.filter(position => position.positionSign === EXPENSE);
            res.json(expenses);
        })
        .catch(err => console.log(err));
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

app.delete('/position/:id', (req, res) => {
    PositionModel.deleteOne({ _id: req.params.id})
        .then(() => res.json({}))
});

app.delete('/income', (req, res) => {
    PositionModel.deleteMany({ positionSign: INCOME})
        .then(() => res.json({}))
});

app.delete('/expenses', (req, res) => {
    PositionModel.deleteMany({ positionSign: EXPENSE})
        .then(() => res.json({}))
});