require('pmx').init();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var argv = require('yargs').argv;
var config = require('hs.gg-config').get(argv.env || 'local').services.socket;

io.on('connection', function(socket) {
	console.log('a user connected');
	// setInterval(function() {
	// 	socket.emit('ping', Math.random());
	// },10000);
});

http.listen(config.port, function() {
	var host = http.address().address;
	var port = http.address().port;

	console.log('App sserver listening at http://%s:%s', host, port);
});