var express = require('express');
var router = express.Router();

var mongoose = require( 'mongoose' );
var Talkdata = mongoose.model( 'Talkdata' );

var drawSomething_question = [
  "猴子",
  "飛機",
  "汽車",
  "狗",
  "鴨子",
  "老鼠",
  "吹風機",
  "燈泡",
  "熱氣球",
  "雞蛋",
  "放大鏡",
  "墨鏡",
  "雨傘",
  "圍巾",
  "冰淇淋",
  "紅包",
  "紅綠燈",
  "方向盤",
  "鋼琴",
  "小提琴",
  "吉他",
  "二胡",
  "保險套",
  "衛生棉",
  "風車",
  "風箏",
  "蘋果",
  "鳳梨",
  "香蕉",
  "西瓜",
  "啤酒",
  "足球",
  "籃球",
  "高爾夫球",
  "動物園",
  "飯店",
  "蛇",
  "蝸牛",
  "裙子",
  "小丑"
];


router.get('/', function(req, res) {


  res.writeHead(301,
    {Location: '/'}
  );
  res.end();

  //res.render('games.ejs',{my_id: 123434, destinated_id: 123123, host: false, game_mode: 0});
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

router.post('/getDrawTopic', function (req, res){


    var random_chose = Math.floor(Math.random() * drawSomething_question.length);

    console.log("DrawTopic is "+ drawSomething_question[random_chose]);


    res.writeHead(200, 'delete', {'Content-Type': 'text/html; charset=utf-8'});
    res.end(drawSomething_question[random_chose]);


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

router.post('/search', function (req, res){

  Talkdata.findOne({"peer_id": req.body.dest_peer_id},function (err, talkdata) {

    var user_data =  JSON.stringify({
      name: talkdata.name,
      age: talkdata.age,
      hobbies: talkdata.hobbies,
      gender: talkdata.gender
    });

    console.log("search "+user_data);

    res.writeHead(200, 'search', {'Content-Type': 'application/json'});
    res.end(user_data);

  });

});




module.exports = router;
