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
      Hobby: req.body.Hobby
    }).save( function(err){
      //res.redirect( '/' );
      res.writeHead(200, 'success', {'Content-Type': 'text/html'});
      res.end(req.body.id);
    });

});


module.exports = router;


