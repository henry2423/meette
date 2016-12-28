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
      id: req.body.id,
      name: req.body.name,
      hobby: req.body.hobby,
      gender: req.body.gender,
      sexual: req.body.sexual,
      on_connect: req.body.on_connect
    }).save( function(err, talkdata, count){
      //res.redirect( '/' );
      res.writeHead(200, 'success', {'Content-Type': 'text/html'});
      res.write(talkdata._id.toString());
      res.end();

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


