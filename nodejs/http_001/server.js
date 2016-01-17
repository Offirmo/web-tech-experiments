#!/usr/bin/env node
'use strict';

// http://fr.openclassrooms.com/informatique/cours/des-applications-ultra-rapides-avec-node-js/construire-son-serveur-http


var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('Salut tout le monde !');
});

console.log('Listening on 8080...');

server.listen(8080);
