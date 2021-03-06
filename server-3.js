var mongoose = require('mongoose');
    assert = require('assert');

var Dishes = require('./models/dishes-3');

//connection to the server
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);

//subscription to error or open events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected correctly to the server');

    Dishes.create({
        name: "Uthapizza",
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Damon'
            }
        ]
    }, function(err, dish) {
        if(err) throw err;
        
        console.log('Dish created!');
        console.log(dish);
        var id = dish.id;
        
        //get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
            .exec(function (err, dish) {
                if(err) throw err;
                console.log('Updated Dish!');
                console.log(dish);
                
                dish.comments.push({
                    rating: 5,
                    comment: 'New comment',
                    author: 'Leonardo di Carpaccio'
                });
                
                dish.save(function(err, dish){
                    console.log('Updated Comments!');
                    console.log(dish);
                    db.collection('dishes').drop(function(){
                        db.close();});
            });
            })
        }, 3000);
    });
});