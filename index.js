require('pmx').init();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var argv = require('yargs').argv;
var config = require('hs.gg-config').get(argv.env || 'local').services.socket;

io.on('connection', function(socket) {
	var interval;
	socket.on('subscribe', function(token){
		socket.token = token;
		socket.join(token);
		interval = setInterval(function() {
			io.to(token).emit('ping', Math.random());
		},10000);
	});
	socket.on('disconnect', function() {
		clearInterval(interval);
	})
});

http.listen(config.port, function() {
	var host = http.address().address;
	var port = http.address().port;

	console.log('Socket server listening at http://%s:%s', host, port);
});