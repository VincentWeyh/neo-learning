var fs = require('fs');
var path = require('path');

var DB = {};

var files = fs.readdirSync(path.join(__dirname, 'models'));
files.forEach(file => {
  file = file.split('.js')[0];
  DB[file] = require(path.join(__dirname, 'models/', file));
});

module.exports = DB;
