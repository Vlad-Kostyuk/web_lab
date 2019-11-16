var user = getNameUser();
let localArray = [];
let a = ["Яблоко", "Апельсин", "Слива"];
var localUser;
var userOnline;
var sizeLocalHost = 0;
var t = 0;
var i = 0;
var j = 0;
	function isOnline() {    
		return window.navigator.onLine;
	}

    function checkOnline() {
	  if(isOnline() == true) {
		  userOnline = true;
	    } else {
		  userOnline = false;
	    } 
	}
	
    function writeLocalStorage(text, date) {
		let commentUser = [];
	    var json = {
			comment: text, 
			commentDate: date
			};
			//var obj = JSON.stringify(json);
			commentUser.push(json);
			localArray.push(JSON.stringify(commentUser));
			localStorage.setItem(user, localArray);
	}

	function riteLocalHost() {
	  sizeLocalHost = localStorage.length;
	  if(sizeLocalHost == 0)  {
	  } else {
		  for(c = 0; c <= sizeLocalHost; c++) {
		   localUser = localStorage.key(c);
            let local = JSON.parse(localStorage.getItem(localUser));
			var str =  local[c];
			console.log(local);
	    }
	}
	}

	/*
	function checkLocalHost(timeArray) {
	  for(b = 0; b < timeArray.length; b++) {
		   let localTimeArray = new Array();
		   localTimeArray[b] = timeArray[b];
			if(localTimeArray.length == 2) {
				var text = localTimeArray[0];
				var date = localTimeArray[1];
			    //text = JSON.stringify(timeText.text);
			    //date = JSON.stringify(timeDate.date);
				createComment(text, date, localUser);
			}
	    }
	}
	*/
//--------------------------------------------------------------------------------------------------------------
	function getComment() {
		var text = document.getElementById("inputComments").value;
		console.log(isOnline());
		if(isNotNull(text) == false) {
		 showError();
		} else {
         scrollText();
		 clearForm();
		 console.log(isOnline());
		  if(userOnline == true){
			 //createComment(text);
			 writeLocalStorage(text,getDate()); 
			 riteLocalHost();
		  } else {
			 writeLocalStorage(text,getDate()); 
			 riteLocalHost();
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
	    //console.log(date);
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
	
	function createComment(texts, dates ,users) {
		//var date = getDate();
		var date = dates;
		var comment = texts;
		var user = users;
		var htmlBlock = '<div id="end" class=" fans-appeal row">' + '<div class="col-xs-2 col-md-2 col-lg-2 col">' 
		+ '<p class="data-fans-appeal">' + user + '<br>' + date + '</p>' + '</div>' + '<div class="fans-middle-col"></div>' 
		+ '<div class="text-fans-appeal col-xs-10  col-md-9 col-lg-9 col">' + comment + '</div>' + '</div>';
	    document.getElementById('showComments').innerHTML  += htmlBlock;
	}
    