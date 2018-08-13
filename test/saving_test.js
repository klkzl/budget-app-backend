const assert = require('assert');
const PositionModel = require('../models/position');

describe('saving records', function(){
    it('saves record to the database', function(done) {
        const Position = new PositionModel({
            positionSign: '-',
            positionName: 'sth',
            positionValue: 30,
            positionDisplay: '30.00'
        });

        Position.save().then(function() {
            assert(Position.isNew === false);
            done();
        });

    });
});