var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var Talkdata = mongoose.model( 'Talkdata' );

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index.ejs',{title: 'meette'});
});


router.post('/register', function (req, res){

    new Talkdata({
      peer_id: req.body.peer_id,
      name: req.body.name,
      age: req.body.age,
      hobbies: req.body.hobbies,
      gender: req.body.gender,
      sexual: req.body.sexual,
      on_connect: req.body.on_connect,
      game_mode: req.body.game_mode
    }).save( function(err, talkdata, count){
      //res.redirect( '/' );
      res.writeHead(200, 'success', {'Content-Type': 'text/html'});
      res.write(talkdata._id.toString());
      res.end();
    });

});


router.post('/search', function (req, res){

    Talkdata.
    find({
      "gender": req.body.gender,
      "sexual": req.body.sexual,
      //"age": { $gt: parseInt(req.body.age)-3, $lt: parseInt(req.body.age)+5 },
      "on_connect": false,
      "game_mode": req.body.game_mode
    }).
    limit(3).
    sort('age').
    select({ peer_id: 1}).
    exec(function (err, talkdata) {

      console.log(talkdata);
      console.log(talkdata.length == 0);

      if(talkdata.length == 0)
      {
        res.writeHead(200, 'fail', {'Content-Type': 'text/html'});
        res.write("-1");
        res.end();
      }
      else
      {
        res.writeHead(200, 'success', {'Content-Type': 'text/html'});
        res.write(talkdata[0].peer_id);
        res.end();
      }

    });

});

router.post('/update', function (req, res) {

  Talkdata.findById(req.body._id, function (err, talkdata) {

    console.log(talkdata);

    talkdata.on_connect = req.body.on_connect;
    talkdata.game_mode = req.body.game_mode;

    talkdata.save( function ( err, talkdata, count ) {
      res.writeHead(200, 'success', {'Content-Type': 'text/html'});
      res.write("success");
      res.end();
    });

  });

});


router.post('/delete', function (req, res) {

  Talkdata.findById(req.body._id, function (err, talkdata) {

    console.log(talkdata);

    talkdata.remove( function ( err, talkdata) {
      res.writeHead(200, 'success', {'Content-Type': 'text/html'});
      res.write("delet success");
      res.end();
    });



  });


});


router.post('/games', function (req, res){

  /*
  console.log('Granted access');
  res.send({redirect: '/games'});


  res.writeHead(200, 'success', {'Content-Type': 'text/html'});
  res.send({redirect: '/games'});
  console.log("seuccess");

   var ids = {
   my_id: req.body.my_id,
   destinated_id: req.body.destinated_id
   };
   res.write(ids);

  res.end();
   */
  console.log(req.body);
  res.render('games.ejs',{my_id: req.body.my_id, destinated_id: req.body.destinated_id, host: req.body.host});

});


module.exports = router;


