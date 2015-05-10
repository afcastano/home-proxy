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
  if(startsWith(req.headers.host, 'utorrent.')) {
  	proxy.web(req,res, {target: 'http://192.168.0.100:8080'});
  } else if(startsWith(req.headers.host, 'torden.')) {
    proxy.web(req,res, {target: 'http://192.168.0.100:3030'});
  } else {
    var next = function(){
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
      return;
    }
    serve(req,res, next);
  }
});



server.listen(80, function(){
  console.log('listening on port 80');  
});
