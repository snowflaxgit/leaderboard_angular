/*
 * GET home page.
 */
// import database
var mongo = require('mongodb');
 
//create database server
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
//var io = require('socket.io').listen(server, { log: false });

// create cartdb Database
db = new Db('luvs', server);

// open database 
db.open(function(err, db) {
    if(!err) {
        db.collection('users', {safe:true}, function(err, collection) {
        	
           if (err) { 
                console.log("The 'users' collection doesn't exist. Creating it with sample data..."+err);
                populateDB();
            }
			else{
				//populateDB();
				console.log("The 'users' is exist.. "+collection);
				
				collection.find().toArray(function(err, items) {
					 if(items.length == 0){
					  	populateDB();
					 	//console.log("Length-1:::"+items.length);
					 	//console.log(items);
					 }else{
					 	//console.log("Length-2:::"+items.length);
					 }
				});	
                
				
			}
        });
    }
});

exports.index = function(req, res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.render('index');
};

exports.list = function(req, res,next){
	db.collection('users', function(err, collection) {
		collection.find().toArray(function(err, items) {
			//result = items;
			console.log(items);
		
		});
	});
};



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var user = [
    {
		name: "A", 
		rate: 0	
	},
    {
		name: "B", 
		rate: 0	
	},
    {
		name: "C", 
		rate: 0	
	},
    {
		name: "D", 
		rate: 0	
	},
    {
		name: "E", 
		rate: 0	
	}
	];
 
    db.collection('users', function(err, collection) {
		
		collection.remove(); //remove database
        
		collection.insert(user, {safe:true}, function(err, result) {
			if(err){
				console.log(err);
			}
			else{
				//console.log(result);
			}	
		});
    });
 
}; 
