#!/usr/bin/env node
'use strict';

// https://fr.openclassrooms.com/informatique/cours/des-applications-ultra-rapides-avec-node-js/construire-son-serveur-http

const http = require('http');

const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('Hello world !');
});

server.listen(8080);
console.log('Listening on 8080...');
