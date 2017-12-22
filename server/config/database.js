const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const reg = RegExp('\\.js$', 'i');

const modelsPath = path.resolve('server', 'models');

mongoose.connect('mongodb://localhost/pawolmizik');
mongoose.connection.on('connected', () => console.log('we are connected to the db'));

mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelsPath, file));
    }
});