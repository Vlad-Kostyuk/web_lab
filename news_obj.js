
function FansIndexDb() {
	this.databaseName = 'VladDatabase';
	this.version = 1;
	
	this.saveNews= function(title, textNews) {
		var request;
		var db;
		var storeNews;
		var storeName = 'news';

		request = window.indexedDB.open(this.databaseName, this.version);

		request.onerror = function(err){
			console.log(err);
			return false;
		};
		request.onupgradeneeded = function(event) {
			db = event.target.result;
			storeNews = db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});

		}
		request.onsuccess = function(event) {

			db = event.target.result;
			let transaction = db.transaction(storeName, "readwrite");
			transaction.onsuccess = function(event) {
				console.log('[Transaction] ALL DONE!');
			};
			let news = transaction.objectStore(storeName);
			let row = {
			  title: title,
			  textNews: textNews,
			};

			let requestAdd = news.add(row); 
			requestAdd.onsuccess = function() {
				console.log("add", requestAdd.result);
			};

			requestAdd.onerror = function() {
			  console.log("error", requestAdd.error);
			};
		}

	}

	this.getNews = function() {
		var request;
			var db;
			var storeName = 'news';
            let arrayNews = [];
			var rowId = 1;
		    var rowName;
		    var sectionId = 0;
			    request = window.indexedDB.open(this.databaseName, this.version);
			     request.onsuccess = function(event) {
			        db = event.target.result;
					let transaction = db.transaction(storeName, "readonly");
					let news = transaction.objectStore(storeName);
					var getAllRequest = news.getAll();
					getAllRequest.onsuccess = function() {
                    arrayNews = getAllRequest.result;			
                      if (arrayNews.length > 0) {
							rowName = 'row-news-' + rowId;
							printRowNews(rowName);
							for(var i = 0; i < arrayNews.length;i++) {
							 item = arrayNews[i];
							 printNews(rowName, item.title, item.textNews);
							 sectionId++;
								if(sectionId == 2) {
									rowId++;
									sectionId = 0;
								}
							};
						} 
					}
				}
	}

	this.deleteNews = function() {
		var request;
			var db;
			var storeName = 'news';

			    request = window.indexedDB.open(this.databaseName, this.version);
			     request.onsuccess = function(event) {
			        db = event.target.result;
					let transaction = db.transaction(storeName, "readwrite");
					let news = transaction.objectStore(storeName);
					news .clear();
				}
	}	
}