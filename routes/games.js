var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var Talkdata = mongoose.model( 'Talkdata' );


router.get('/', function(req, res) {

  res.writeHead(301,
    {Location: '/'}
  );
  res.end();

});

router.post('/clear', function (req, res){

  console.log("clear "+ req.body.my_peer_id);

  Talkdata.findOne({"peer_id": req.body.my_peer_id},function (err, talkdata) {

    if(talkdata == null) return ;

    console.log(talkdata);
    var user_data = JSON.stringify({
      name: talkdata.name,
      age: talkdata.age,
      hobbies: talkdata.hobbies,
      gender: talkdata.gender,
      sexual: talkdata.sexual
    });

    talkdata.remove(function (err, talkdata) {
      res.writeHead(200, 'delete', {'Content-Type': 'application/json'});
      res.end(user_data);
    });

  });


});







/*
router.post('/clear', function (req, res){

  console.log("ids "+ req.body.destinated_peer_id +" " +req.body.my_peer_id);


  Talkdata.findOne({"peer_id": req.body.destinated_peer_id},function (err, talkdata) {

    talkdata.remove(function (err, talkdata) {});

  });


  Talkdata.findOne({"peer_id": req.body.my_peer_id},function (err, talkdata) {

    console.log(talkdata);
    var user_data = JSON.stringify({
      name: talkdata.name,
      age: talkdata.age,
      hobbies: talkdata.hobbies,
      gender: talkdata.gender,
      sexual: talkdata.sexual
    });

    talkdata.remove(function (err, talkdata) {
      res.writeHead(200, 'delete', {'Content-Type': 'application/json'});
      res.end(user_data);
    });

  });


});
*/
/*
router.post('/search', function (req, res){

  Talkdata.findOne({"peer_id": req.body.my_peer_id},function (err, talkdata) {

    var user_data =  JSON.stringify({
      name: talkdata.name,
      age: talkdata.age,
      hobbies: talkdata.hobbies,
      gender: talkdata.gender,
      sexual: talkdata.sexual
    });

    console.log("search "+user_data);

    res.writeHead(200, 'delete', {'Content-Type': 'application/json'});
    res.end(user_data);

  });

});
*/



module.exports = router;
