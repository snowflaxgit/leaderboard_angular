/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

//database 
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// all environments
app.set('port', process.env.PORT || 3660);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());    
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD:leaderboard_angular.js
<<<<<<< HEAD:leaderboard_angular.js
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();

});
=======
>>>>>>> parent of 0672461... Access-Control-Allow-Origin line added:app.js
=======
>>>>>>> parent of 0672461... Access-Control-Allow-Origin line added:app.js
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

 var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));  
});

app.get('/', routes.index);

var io = require('socket.io').listen(server, { log: false });

io.sockets.on('connection', function (socket) {	
	app.get('/list', routes.list);	
	
	socket.on('id', function (data) {
		//console.log(data.user_id);
		var id = data.user_id;
		<!-- update item from db -->
		db.collection('users', function(err, collection) {
			collection.update({'_id':new BSON.ObjectID(id)}, {$inc:{rate : 5}} , {safe:true}, function(err, result) {
				if (err) {
					//res.send({'error':'An error has occurred'});
						console.log(err);
				} else {
					//console.log('' + result + ' document(s) updated');					
					 collection.find().toArray(function(err, items) {
						//console.log(items);
						socket.broadcast.emit('update',{items : items});
						socket.emit('update',{items : items});
					});				
				}
			});
		});
	});
	socket.on('new',function(data){
		console.log("ok....");
		db.collection('users', function(err, collection) {
			collection.find().toArray(function(err, items) {
				//console.log(items);
				socket.broadcast.emit('update',{items : items});
				socket.emit('update',{items : items});
			});
		});
	});
	
});
