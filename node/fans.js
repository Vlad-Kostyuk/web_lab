
exports.getFans = function (response) {

    let commentArray = [];  
	storage = [];
	const MongoClient = require("mongodb").MongoClient;
	const urlMongo = "mongodb://localhost:27017/";
	const mongoClient = new MongoClient(urlMongo, { useNewUrlParser: true });
	const mongoDbName = "lab_11";
	
	mongoClient.connect(function(err, client){
      
    const db = client.db(mongoDbName );
    const collection = db.collection("fans");

	collection.find().toArray(function(err, results){
      
        //console.log(results);
		if(results.length > 0) {

			results.forEach(function(item, i, arr) {
				commentArray.push({ nick: item.nick, comment: item.comment, commentDate: item.commentDate });
			});
			
		}
        client.close();
		console.log(commentArray);
		response.end(JSON.stringify(commentArray));
    });
 });
}

exports.addFans = function (post_body) {	

	const MongoClient = require("mongodb").MongoClient;
	const urlMongo = "mongodb://localhost:27017/";
	const mongoClient = new MongoClient(urlMongo, { useNewUrlParser: true });
	const mongoDbName = "lab_11";
	
	mongoClient.connect(function(err, client) {
	    const db = client.db(mongoDbName );
		const collection = db.collection("fans");
		
		if (post_body.length > 0) {
			var json_body = JSON.parse(post_body);
			
			json_body.forEach(function(item, i, arr) {
				if ((item.nick) && (item.comment)) {

				    let comment = {nick: item.nick, comment: item.comment, commentDate: item.commentDate};
					collection.insertOne(comment, function(err, result){
						  
						if(err){ 
							return console.log(err);
						}
					   // console.log(results);
						client.close();
					});
				}
			});
		}
	});
	
  return true;
}
