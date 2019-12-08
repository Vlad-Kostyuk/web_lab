exports.getNews = function (post_body, storage) {
  var newsArray = [];
  
	if (post_body.length > 0) {
		var json_body = JSON.parse(post_body);
		
	    json_body.forEach(function(item, i, arr) {
			if ((item.textNews) && (item.title)) {
				newsArray.push({ textNews: item.textNews, title: item.title });
			}
		});
		storage = storage.concat(newsArray);
	}
	console.log(storage);

  return storage;
}
