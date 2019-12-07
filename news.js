var pageId = 'news';
var sizeLocalHost = 0;
var i = 0;
var useLocaStorage = false;
 
 // document.addEventListener("DOMContentLoaded",printStartNews);
 
   window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
			if(isOnline()) {
			 sendDB();
			 getDataServer();
			 if(useLocaStorage) {
			   printStartNews();
			   localStorage.removeItem(pageId);
			 } else {
				var IndexDb = new FansIndexDb();
                IndexDb.getNews();
				IndexDb.deleteNews();
			 }
			} 
	}
	window.addEventListener('online',  updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
   });

	function isOnline() {    
		return window.navigator.onLine;
	}

	
	function sendDB() {
		console.log("send to server");
		//send to server
	}
	
	function getDataServer() {
				
		var http = new XMLHttpRequest();
		///var params = "text=test";
		http.open("POST", "http://localhost:8000/news", true);
		http.setRequestHeader("Content-type", "application/json");

		http.onreadystatechange = function() {
		  if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
			printStartNews(JSON.parse(http.responseText));
		  }
		}

		http.send();
		
		console.log("get data from server");
	}

    function saveLocalStorage(title, text) {
		let newsArray = getArrayNews();
	    var news = {
				title: title, 
				textNews: text
			};
			newsArray.push(news);
			localStorage.setItem(pageId, JSON.stringify(newsArray));
	}
    
	function addNews(title, text) {
		if(isOnline()) {
			sendDB();
			getDataServer();
		} else {
			//saveLocalStorage(title, text); 
			  if(useLocaStorage) {
			    saveLocalStorage(title, text); 
			  } else {
				var IndexDb = new FansIndexDb();
                IndexDb.saveNews(title, text);
			  }
		}
	}
	
	function getArrayNews() {
		// Read data localStorage
		let newsArray = [];
		var row = {
			title: '', 
			textNews: ''
		};
		sizeLocalHost = localStorage.length;
		if (sizeLocalHost > 0)  {
			var savedNews = localStorage.getItem(pageId);
			var jsonNews= JSON.parse(savedNews);
			for (var i = 0; i < jsonNews.length; i++) {
				var newsRow = jsonNews[i];
				row.title = newsRow.title;
				row.textNews = newsRow.textNews;
				newsArray.push(row);
				var row = {
					title : '', 
					textNews: ''
				};
			}
		}

		return newsArray;
	}
	
	function printStartNews(serverNews = false) {
		var rowId = 1;
		var rowName;
		var sectionId = 0;
		let newsArray = [];
		
		if(!serverNews) {
		  newsArray = getArrayNews();	
		}
		else {
		  newsArray = serverNews;
		}
		
		if (newsArray.length > 0) {
			rowName = 'row-news-' + rowId;
			printRowNews(rowName);
			newsArray.forEach(function(item, i, arr) {
			    printNews(rowName, item.title, item.textNews);
				sectionId++;
				if(sectionId == 2) {
					rowId++;
					sectionId = 0;
				}
			});
		}
	}

	function printNews(htmlId, title, text) {
		var htmlBlock = ' <div class="col-xs-2 col-md-4 col-lg-4">' + '<div>' 
		+ '<img class="foto" src="admin_foto.png" alt="Сайт гурту Океан Ельзи">' + '</div>' + '<div>' + '<center>' + '<h4>'  + title + '</h4>' + '</center>' 
		+ '</div>' + '<div>' + text + '</div>' + '</div>';
	    document.getElementById(htmlId).innerHTML  += htmlBlock;
	}
	
	
	function printRowNews(htmlId) {
		var htmlBlock = '<div class="row  col-xs-12 col-md-12 col-lg-12" id=' + htmlId + '>' + '<div>' 
	    document.getElementById('showNews').innerHTML  += htmlBlock;
	}
	