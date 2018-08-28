const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(function(done){
    mongoose.connect('mongodb://localhost/testB', { useNewUrlParser: true });

    mongoose.connection.once('open', function() {
        console.log('connected');
        done();
    }).on('error', function(error) {
        console.log('connection error: ', error);
    });
});