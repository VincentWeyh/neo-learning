var fs = require('fs');
var path = require('path');

var directories = fs.readdirSync(path.join(__dirname, './')).filter(function (directory){
  return fs.statSync(path.join(__dirname, './', directory)).isDirectory();
});

    console.log('Purée : ',directories )
var routers = [];

directories.forEach(directory => {
  routers.push(require(path.join(__dirname, './', directory)));
});

module.exports = routers;
