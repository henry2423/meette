var mongoose = require('mongoose');

mongoose.connect('mongodb://henry1203:henry57383@ds021346.mlab.com:21346/talkerdata');
// 定義Talkmetadata資料表的模式

var Schema = mongoose.Schema;

var Talkdata = new Schema ({
  id: String,
  name: String,
  hobby: String,
  gender: String,
  sexual: String,
  on_connect: Boolean
});

mongoose.model( 'Talkdata', Talkdata );
