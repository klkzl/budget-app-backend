const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    positionSign: {
        type: String,
        enum: ['inc', 'exp']
    },
    positionName: {
        type: String,
        maxlength: 30,
        minlength: 3
    },
    positionValue: {
        type: Number,
        max: 100000,
        min: 0
    },
    positionDisplay: {
        type: String
    }
});

const PositionModel = mongoose.model('positionmodel', PositionSchema);

module.exports = PositionModel;
