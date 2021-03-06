var tls = require('tls');
var inject = require('reconnect-core');
var slice = [].slice;
var noop = function () {};

module.exports = inject(function(){
	var args = slice.call(arguments);
	var cleartextStream = tls.connect.apply(tls, args);

	cleartextStream.on('secureConnect', function(){
		if(cleartextStream.authorized){
			cleartextStream.emit('connect');
		}else{
			cleartextStream.emit('error', cleartextStream.authorizationError);
		}
	}).on('error', noop);

	return cleartextStream;
});
