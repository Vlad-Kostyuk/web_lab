var http = require("http");
var url = require('url');
var news = require('./news');
var fans = require('./fans');

let storageNews = [];
let storageComments = [];
var post_body;


http.createServer(function(request, response) {
  var q = url.parse(request.url, true);
   var filename =  q.pathname;
	
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8301');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
	
	if (filename != '/get-fans' && filename != '/add-fans'&& filename != '/add-news' && filename != '/get-news') {
      response.writeHead(404, {'Content-Type': 'text/html'});
      return response.end("404 Not Found");
    }

	response.writeHead(200, {'Content-Type': 'text/html'});
	
	console.log('method ' + request.method);
	console.log('url page ' + filename);
	
		if (filename == '/get-news') {
			storageNews = news.getNews(storageNews);
			response.end(JSON.stringify(storageNews));
		}
		else if (filename == '/get-fans') {
			fans.getFans(response);
		}
		else if (filename == '/add-fans') {
			//addMongoFans();
			//getMongoFans();
			request.on('data', chunk => {
				post_body = chunk.toString();
				result = fans.addFans(post_body);
				response.end(JSON.stringify(result));
			});
		}
		else if (filename == '/add-news') {
			request.on('data', chunk => {
				post_body = chunk.toString();
				storageNews = news.addNews(post_body, storageNews);
			    response.end(JSON.stringify(storageNews));
			});
		}
		
 }).listen(8000);
 
console.log('Server running at http://127.0.0.1:8000/');



function getMongoNews() {
	
}

function addMongoNews() {
	
}


