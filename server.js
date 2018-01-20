const http = require('http');
const express = require( 'express' );

var server = express();
server.use( express.static(__dirname + '/public'));
//server.use('/', express.static(__dirname + '/public'));
//server.use(express.static( __dirname + '/public'));
server.listen(8080);
console.log( 'Su juego está corriendo en el puerto 8080');
