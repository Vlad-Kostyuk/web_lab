var http= require("http");
var url = require('url');
var news = require('./news');
var fans = require('./fans');

 http.createServer(function(request, response) {
  var q = url.parse(request.url, true);
   var filename =  q.pathname;
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8301');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
	
   if (filename != '/fans' && filename != '/news') {
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end("404 Not Found");
    } else {  
       response.writeHead(200, {'Content-Type': 'application/json'});
	   if (filename == '/fans') {
       //  response.end('Testing NodeJSserver\n' + ' ' + fans.getFans());
	   response.end(JSON.stringify(fans.getFans()));
	   } 
       else {
		 //  response.end('Testing NodeJSserver\n' + ' ' + news.getNews());
		response.end(JSON.stringify(news.getNews()));
	   }
	}
   
 }).listen(8000);
 
console.log('Server running at http://127.0.0.1:8000/');





