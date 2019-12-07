var http = require("http");
var url = require('url');
var news = require('./news');
var fans = require('./fans');
var commentsRequest = [];
var newsRequest = [];
let storageNews = [];
let storageComments = [];
var post_body;

// const express = require('express')
// const app = express()
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
    }

	console.log('test ' + request.method);
	console.log('test23 ' + filename);
		if (filename == '/news') {
			request.on('data', chunk => {
				post_body = chunk.toString();
				storageNews = news.getNews(post_body, storageNews);
			    response.end(JSON.stringify(storageNews));
			});
		}
		if (filename == '/fans') {
			request.on('data', chunk => {
				post_body = chunk.toString();
					console.log('test77 ' + post_body);
				storageComments = fans.getFans(post_body, storageComments);
				response.end(JSON.stringify(storageComments));
			});
		}
		
 }).listen(8000);
 
console.log('Server running at http://127.0.0.1:8000/');






