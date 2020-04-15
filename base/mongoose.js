const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          autoIndex: false
        };

        mongoose.connect('mongodb://moody:moody@mycluster-shard-00-00-5z0ha.mongodb.net:27017 ,mycluster-shard-00-01-5z0ha.mongodb.net:27017 ,mycluster-shard-00-02-5z0ha.mongodb.net:27017/StaricDatabase?ssl=true&replicaSet=mycluster-shard-0&authSource=admin&retryWrites=true', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n ${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });
    }
};