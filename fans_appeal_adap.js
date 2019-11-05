var user = getNameUser();

	function getComment() {
		var text = document.getElementById("inputComments").value;
		if(isNotNull(text) == false) {
		 showError();
		} else {
         scrollText();
		 clearForm();
		 createComment(text);
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
	    console.log(date);
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
	
	function createComment(text) {
		var date = getDate();
		var comment = text;
		var htmlBlock = '<div id="end" class=" fans-appeal row">' + '<div class="col-xs-2 col-md-2 col-lg-2 col">' 
		+ '<p class="data-fans-appeal">' + user + '<br>' + date + '</p>' + '</div>' + '<div class="fans-middle-col"></div>' 
		+ '<div class="text-fans-appeal col-xs-10  col-md-9 col-lg-9 col">' + comment + '</div>' + '</div>';
	    document.getElementById('showComments').innerHTML  += htmlBlock;
	}
    