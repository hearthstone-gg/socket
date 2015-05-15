require('pmx').init();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3003;

io.on('connection', function(socket) {
	console.log('a user connected');
});

http.listen(port, function() {
	var host = http.address().address;
	var port = http.address().port;

	console.log('App sserver listening at http://%s:%s', host, port);
});