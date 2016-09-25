var mongoose = require('mongoose');
    assert = require('assert');

var Leaderships = require('./models/leadership');

//connection to the server
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);

//subscription to error or open events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected correctly to the server');

    Leaderships.create({
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
    }, function(err, leadership) {
        if(err) throw err;
        
        console.log('Leadership created!');
        console.log(leadership);
        var id = leadership.id;
        
        //get all the promos
        setTimeout(function () {
            Leaderships.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
            .exec(function (err, leadership) {
                if(err) throw err;
                console.log('Updated Leadership!');
                console.log(leadership);
                
                db.collection('leaderships').drop(function(){
                    db.close();});
            })
        }, 3000);
    });
});