exports.getNews = function (post_body, storage) {
  var newsArray = [];
  
	if (post_body.length > 0) {
		var json_body = JSON.parse(post_body);
		
	    json_body.forEach(function(item, i, arr) {
			newsArray.push({ id: item.id, textNews: item.textNews, title: item.title });
		});
		storage = storage.concat(newsArray);
	}

  return storage;
}