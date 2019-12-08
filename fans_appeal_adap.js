var user = getNameUser();
var pageId = 'fans';
var sizeLocalHost = 0;
var i = 0;
var useLocaStorage = false;
let loadDataServer = false;

	document.addEventListener("DOMContentLoaded", getDataServer());
    
   window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
		console.log("start"  + event );
			if(isOnline()) {
			 sendDB();
			 getDataServer();
			 if(useLocaStorage) {
			   printStartComments();
			   localStorage.removeItem(pageId);
			 } else {
				var IndexDb = new FansIndexDb();
                IndexDb.getComment();
				IndexDb.deleteComment();
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
		
		if (!isOnline() && (!loadDataServer)) { 
			return;
		}
		
		var http = new XMLHttpRequest();
		// var params = [];
		// params.push('');
		http.open("POST", "http://localhost:8000/get-fans", true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

		http.onreadystatechange = function() {
		  if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
			printStartComments(JSON.parse(http.responseText));
		  }
		}

		//http.send(JSON.stringify(params));
		http.send();
		
		console.log("get data from server");
		
		loadDataServer = true;
	}

    function saveLocalStorage(text, date) {
		let commentArray = getArrayComments();
	    var comment = {
				nick: user, 
				comment: text, 
				commentDate: date
			};
			commentArray.push(comment);
			localStorage.setItem(pageId, JSON.stringify(commentArray));
	}

	function getArrayComments() {
		// Read data localStorage
		let commentArray = [];
		var row = {
			nick: '', 
			comment: '', 
			commentDate: ''
		};
		sizeLocalHost = localStorage.length;
		if (sizeLocalHost > 0)  {
			var savedComments = localStorage.getItem(pageId);
			var jsonComments = JSON.parse(savedComments);
			for (var i = 0; i < jsonComments.length; i++) {
				var commentRow = jsonComments[i];
				row.nick = commentRow.nick;
				row.comment = commentRow.comment;
				row.commentDate = commentRow.commentDate;
				commentArray.push(row);
				var row = {
					nick: '', 
					comment: '', 
					commentDate: ''
				};
			}
		}

		return commentArray;
	}
	
	function printStartComments(serverComments = false) {
		let commentArray = [];
		if (!serverComments) {
			commentArray = getArrayComments();
		}
		else {
			commentArray = serverComments;
		}

		if (commentArray.length > 0) {
			commentArray.forEach(function(item, i, arr) {
			    printComment(item.comment, item.commentDate, item.nick);
			});
		}
	}

    function sendCommentToServer(text, commentDate, user) {
		
		var comment = {
			nick: user,
			comment: text, 
			commentDate: commentDate
		};
		var params = [];
		
		params.push(comment);
		
		var http = new XMLHttpRequest();
		http.open("POST", "http://localhost:8000/add-fans", true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

		http.onreadystatechange = function() {
		  if (http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);
		  }
		}

		http.send(JSON.stringify(params));

		console.log("send data to server");
	}

	function addComment() {
		var text = document.getElementById("inputComments").value;
		console.log(isOnline());
		if(isNotNull(text) == false) {
		 showError();
		} else {
         scrollText();
		 clearForm();
		 console.log(isOnline());
		  if(isOnline() == true){
			  //sendDB();
			 // getDataServer();
			  sendCommentToServer(text, getDate(), user);
			  printComment(text, getDate(), user);
		  } else {	
			  if(useLocaStorage) {
			    saveLocalStorage(text, getDate()); 
			  } else {
				var IndexDb = new FansIndexDb();
                IndexDb.saveComment(user, text);
			  }
		  } 
		}
	}

    function getNameUser() {
		var nameUser = prompt('Ведіть ваш нікнейм!');
	   return nameUser;
	}
 
	function getDate() {
	    var date = new Date();
	    var dd = String(date.getDate()).padStart(2, '0');
		var mm = String(date.getMonth() + 1).padStart(2, '0');
		var yyyy = date.getFullYear();
		var hh = date.getHours();
		var minets = date.getMinutes();
		date = dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + minets;
     return date;
	}
	
	function isNotNull(text) {
        if(text == false) {
			return false;
		} else {
			return true;
		}
	}
	
	function showError() {
	  var name = 'Поле не може бути пустим!';
      errorMessage.innerHTML = name;
	}
	
	function scrollText() {
      var name = '';
      errorMessage.innerHTML = name;
	}
	
	function clearForm() {
	  document.getElementById('inputComments').value = "";
	}
	
	function printComment(texts, dates, users) {
		//var date = getDate();
		var date = dates;
		var comment = texts;
		var htmlBlock = '<div id="end" class=" fans-appeal row">' + '<div class="col-xs-2 col-md-2 col-lg-2 col">' 
		+ '<p class="data-fans-appeal">' + users + '<br>' + date + '</p>' + '</div>' + '<div class="fans-middle-col"></div>' 
		+ '<div class="text-fans-appeal col-xs-10  col-md-9 col-lg-9 col">' + comment + '</div>' + '</div>';
	    document.getElementById('showComments').innerHTML  += htmlBlock;
	}
	