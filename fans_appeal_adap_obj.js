function FansIndexDb() {
	this.databaseName = 'VladDatabase';
	this.version = 1;

	this.getDate = function() {
	    var date = new Date();
	    var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0');
		var yyyy = date.getFullYear();
		var hh = date.getHours();
		var minets = date.getMinutes();
		date = dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + minets;

     return date;
	}
	
	this.saveComment = function(nick, textComment) {
		var request;
		var db;
		var storeComments;
		var storeName = 'comments';
		var dateComment = this.getDate();

		
		request = window.indexedDB.open(this.databaseName, this.version);

		request.onerror = function(err){
			console.log(err);
			return false;
		};
		request.onupgradeneeded = function(event) {
			db = event.target.result;
			storeComments = db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});

		}
		request.onsuccess = function(event) {

			db = event.target.result;
			let transaction = db.transaction(storeName, "readwrite");
			transaction.onsuccess = function(event) {
				console.log('[Transaction] ALL DONE!');
			};
			let comments = transaction.objectStore(storeName);
			let comment = {
			  nick: nick,
			  comment: textComment,
			  commentDate: dateComment,
			};

			let requestAdd = comments.add(comment); 
			requestAdd.onsuccess = function() {
				console.log("add", requestAdd.result);
			};

			requestAdd.onerror = function() {
			  console.log("error", requestAdd.error);
			};
		}

	}

	this.getComment = function() {
		var request;
			var db;
			var storeComments;
			var storeName = 'comments';

			    request = window.indexedDB.open(this.databaseName, this.version);
			     request.onsuccess = function(event) {
			        db = event.target.result;
					let transaction = db.transaction(storeName, "readonly");
					let comments = transaction.objectStore(storeName);
					var getAllRequest = comments.getAll();
					getAllRequest.onsuccess = function() {
					  var commentUser = getAllRequest.result;
					  for(var i = 0; i < commentUser.length;i++) {
						  var tmpArray = commentUser[i];
						  printComment(tmpArray.comment,tmpArray.commentDate,tmpArray.nick)
					  } 
					  
					}
				}
	}

	this.deleteComment = function() {
		var request;
			var db;
			var storeComments;
			var storeName = 'comments';

			    request = window.indexedDB.open(this.databaseName, this.version);
			     request.onsuccess = function(event) {
			        db = event.target.result;
					let transaction = db.transaction(storeName, "readwrite");
					let comments = transaction.objectStore(storeName);
					comments.clear();
				}
	}	
}