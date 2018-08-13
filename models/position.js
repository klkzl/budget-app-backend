const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    positionSign: String,
    positionName: String,
    positionValue: Number,
    positionDisplay: String
});

const PositionModel = mongoose.model('positionmodel', PositionSchema);

module.exports = PositionModel;
