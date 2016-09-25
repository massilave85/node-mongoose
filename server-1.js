var mongoose = require('mongoose');
    assert = require('assert');

var Dishes = require('./models/dishes-1');

//connection to the server
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);

//subscription to error or open events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected correctly to the server');
    
    //create a new user!
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test' 
    });
    
    //save changes
    newDish.save(function(err){
        if (err) throw err;
        
        console.log('Dish created!');
        
        //get all the users
        Dishes.find({}, function(err, dishes){
            if (err) throw err;
            
            console.log(dishes);
            
            db.collection('dishes').drop(function(){
                db.close();
            });
        });
    });
});