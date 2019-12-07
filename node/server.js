var http= require("http");
var url = require('url');

 http.createServer(function(request, response) {
  var q = url.parse(request.url, true);
   var filename =  q.pathname;
   
   if (filename != '/fans' && filename != '/news') {
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end("404 Not Found");
    } else {  
       response.writeHead(200, {'Content-Type': 'text/html'});
       response.end('Testing NodeJSserver\n' + ' ' + filename);
	}
   
 }).listen(8000);
 
console.log('Server running at http://127.0.0.1:8000/');





