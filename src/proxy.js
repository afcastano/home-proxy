var connect = require('connect');
var serveStatic = require('serve-static');
var httpProxy = require('http-proxy');
var http = require('http');

var proxy = httpProxy.createProxyServer({});

var serve = serveStatic(__dirname);

var startsWith = function(url, value) {
	var ret = url.slice(0, value.length) == value;
	return ret;
}

// connect().use(serveStatic(__dirname)).listen(80);
var server = http.createServer(function(req, res) {
	// // You can define here your custom logic to handle the request
  // // and then proxy the request.
  // proxy.web(req, res, { target: 'http://127.0.0.1:5060' });
  debugger;
  if(startsWith(req.headers.host, 'utorrent.')) {
  	console.log('torrent url... redirecting... ');
  	proxy.web(req,res, {target: 'http://192.168.0.100:8080'});
  } else {
  	serve(req,res);
  }
});



server.listen(80, function(){
  console.log('listening on port 80');  
});
