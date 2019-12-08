exports.getFans = function (storage) {

	console.log(storage);
	
  return storage;
}

exports.addFans = function (post_body, storage) {	
	let commentArray = [];

	if (post_body.length > 0) {
		var json_body = JSON.parse(post_body);
		
	    json_body.forEach(function(item, i, arr) {
			if ((item.nick) && (item.comment)) {
				commentArray.push({ nick: item.nick, comment: item.comment, commentDate: item.commentDate });
			}
		});
		storage = storage.concat(commentArray);
	}
	console.log(storage);
	
  return storage;
}