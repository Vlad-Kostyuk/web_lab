
	function newContent() {
		getText();
	}
	
	function getText() {
	    var title = document.getElementById("titleNews").value;
		var textNews = document.getElementById("textNews").value;
	    if(title.length == 0 && textNews.length == 0) {
			showErrorTitleNews();
			showErrorMessageTextNews();
		} 
		if(title.length > 0 && textNews.length > 0) {
			scrollTextTitleNews();
			clearFormTitleNews();
			scrollTextNews();
			clearTextNews();
			addNews(title, textNews);
		} 
		if(title.length > 0 && textNews.length == 0) {
			showErrorMessageTextNews();
			scrollTextTitleNews();
		} 
		if(title.length == 0 && textNews.length > 0) {
			showErrorTitleNews();
			scrollTextNews();
		}
	}
	

	
	function showErrorTitleNews() {
	  var name = 'Поле не може бути пустим!';
      errorMessageTitleNews.innerHTML = name;
	}
	
	function scrollTextTitleNews() {
      var name = '';
      errorMessageTitleNews.innerHTML = name;
	}
	
	function clearFormTitleNews() {
	  document.getElementById('titleNews').value = "";
	}
	
	
	function showErrorMessageTextNews() {
	  var name = 'Поле не може бути пустим!';
      errorMessageTextNews.innerHTML = name;
	}
	
	function scrollTextNews() {
      var name = '';
      errorMessageTextNews.innerHTML = name;
	}
	
	function clearTextNews() {
	  document.getElementById('textNews').value = "";
	}
