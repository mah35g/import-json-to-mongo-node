var MongoClient = require('mongodb').MongoClient;
var request = require('request');

MongoClient.connect('mongodb://localhost:27017/course', function(err, db){
	if(err) throw err;

	// request('http://www.reddit.com/r/technology/.json', function(error, response, body){
	// 	if(!error && response.statusCode == 200) {
	// 		var obj = JSON.parse(body);
	// 		var stories = obj.data.children.map(function(story){return story.data;});

	// 		db.collection('reddit').insert(stories, function(err, data){
	// 			if(err) throw err;
	// 			console.dir(data);
	// 			db.close();
	// 		});
	// 	}
	// });

	// var query = {'title':{'$regex':'Euro'}};
	// var projection = {'title':1, '_id':0};

	// db.collection('reddit').find(query, projection).each(function(err, doc){
	// 	if(err) throw err;
	// 	if(doc==null){
	// 		return db.close();
	// 	}
	// 	console.dir(doc.title);
	// });


	var grades = db.collection('grades');
	//var cursor = grades.find({});
	// No matter how you write the order of the following, 
	// driver adjusts it to Sort, Skip, and Limit
	//cursor.sort('grade', 1);
	// cursor.sort([['grade',1], ['student',-1]])
	// cursor.skip(1);
	// cursor.limit(6);

	var options = {'skip':1, 'limit':4, 'sort':[['grade',1],['student',-1]]};
	var cursor = grades.find({}, {}, options); // find(query, project, options)

	cursor.each(function(err,doc){
		if(err) throw err;
		if(doc==null){
			db.close();
		}
		console.dir(doc);
	});

});