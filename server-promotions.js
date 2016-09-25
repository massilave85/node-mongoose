var mongoose = require('mongoose');
    assert = require('assert');

var Promotions = require('./models/promotions');

//connection to the server
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);

//subscription to error or open events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected correctly to the server');

    Promotions.create({
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "price": "$19.99",
      "description": "Featuring . . ."
    }, function(err, promo) {
        if(err) throw err;
        
        console.log('Promotion created!');
        console.log(promo);
        var id = promo.id;
        
        //get all the promos
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
            .exec(function (err, promo) {
                if(err) throw err;
                console.log('Updated Promo!');
                console.log(promo);
                
                db.collection('promotions').drop(function(){
                    db.close();});
            })
        }, 3000);
    });
});