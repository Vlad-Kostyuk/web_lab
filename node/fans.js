exports.getFans = function (post_body, storage) {
	let commentArray = [];

	if (post_body.length > 0) {
		var json_body = JSON.parse(post_body);
		
	    json_body.forEach(function(item, i, arr) {
			commentArray.push({ nick: item.nick, textNews: item.comment, commentDate: item.commentDate });
		});
		storage = storage.concat(commentArray);
	}
	console.log(storage);
	
  return storage;
}
