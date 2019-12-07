exports.getNews = function () {
  let newsArray = [];
	newsArray[0] = {id: 1, textNews: 'fromNodeJs',title: 'Node'};
	newsArray[1] = {id: 2, textNews: 'fromNodeJs2',title: 'Node!'};
	newsArray[2] = {id: 3, textNews: 'fromNodeJs3',title: 'Node!!!!!!'};
  return  newsArray;
}