exports.getNews = function (response) {
    let newsArray = [];  

	const MongoClient = require("mongodb").MongoClient;
	const urlMongo = "mongodb://localhost:27017/";
	const mongoClient = new MongoClient(urlMongo, { useNewUrlParser: true });
	const mongoDbName = "lab_11";
	
	mongoClient.connect(function(err, client){
      
    const db = client.db(mongoDbName );
    const collection = db.collection("news");

	collection.find().toArray(function(err, results){
      
        //console.log(results);
		if(results.length > 0) {

			results.forEach(function(item, i, arr) {
				newsArray.push({ textNews: item.textNews, title: item.title });
			});
			
		}
        client.close();
		console.log(newsArray);
		response.end(JSON.stringify(newsArray));
    });
 });
}

exports.addNews = function (post_body) {
  
	const MongoClient = require("mongodb").MongoClient;
	const urlMongo = "mongodb://localhost:27017/";
	const mongoClient = new MongoClient(urlMongo, { useNewUrlParser: true });
	const mongoDbName = "lab_11";
	
	mongoClient.connect(function(err, client) {
	    const db = client.db(mongoDbName );
		const collection = db.collection("news");
		
		if (post_body.length > 0) {
			var json_body = JSON.parse(post_body);
			
			json_body.forEach(function(item, i, arr) {
				if ((item.textNews) && (item.title)) {

				    let news = { textNews: item.textNews, title: item.title };
					collection.insertOne(news, function(err, result){
						  
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