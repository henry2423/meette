
var peer = new Peer({host: 'meette.me', port: 7000, path: '/api',secure: true,turn: true, debug: 3});
/*
 , config: { 'iceServers': [
 {'url': 'turn:homeo@turn.bistri.com:80', credential: 'homeo' },
 {'url':'stun:stun.ekiga.net'},
 {'url':'stun:stun.ideasip.com'},
 {'url':'stun:stun.schlund.de'},
 {'url':'stun:stun.l.google.com:19302'},
 {'url':'stun:stun1.l.google.com:19302'},
 {'url':'stun:stun2.l.google.com:19302'},
 {'url':'stun:stun3.l.google.com:19302'},
 {'url':'stun:stun4.l.google.com:19302'},
 {
 'url': 'turn:numb.viagenie.ca',
 credential: 'muazkh',
 username: 'webrtc@live.com'
 }
 ] }
 */


//var peer = new Peer({key: '2640a314-2f9a-4012-940b-67c418868b0b' ,debug: 3});
//choose game
var game_menu;
var db_unique_id = " ";

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});


function pair(game_menu) {

  //find someone to pair
  $.ajax({
    type: 'POST',
    url: '/search',
    data: {
      age: document.getElementById("age").value,
      gender: document.getElementById("sexual").value,
      sexual: document.getElementById("gender").value,
      game_mode: game_menu
    },
    success: function (msg) {
      get_result_from_pair(msg);
    },
    error:function(xhr, ajaxOptions, thrownError){
      alert("search "+xhr.status);
      alert("search "+thrownError);
    }
  });

}

function get_result_from_pair(msg){
  //if pair redirect to games otherwise wait in the database

  var dest_peer_id = msg;

  if(dest_peer_id != "-1")
  {
    //this connect is for notify dest_peer to redirect to game page
    var conn = peer.connect(dest_peer_id);

    //create host itself to database w/ on_connect: true
    $.ajax({
      type: 'POST',
      url: '/register',
      data: {
        peer_id: peer.id,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        hobbies: document.getElementById("hobbies").value,
        gender: document.getElementById("gender").value,
        sexual: document.getElementById("sexual").value,
        on_connect: true,
        game_mode: game_menu
      }, success: function(msg) {
        console.log(msg);
        //alert("unique_id "+msg);
        db_unique_id = msg;

      }, error:function(xhr, ajaxOptions, thrownError){
        alert("register1 "+xhr.status);
        alert("register1 "+thrownError);
      }, complete: function (jqXHR, textStatus) {
        //post to games page and redirect
        document.getElementById("my_id").value = peer.id;
        document.getElementById("destinated_id").value = dest_peer_id;
        document.getElementById("host").value = true;
        document.getElementById("game_mode").value = game_menu;
        $("#connect_form").submit();
      }
    });

  }
  else
  {
    //create host itself to database w/ on_connect: false
    $.ajax({
      type: 'POST',
      url: '/register',
      data: {
        peer_id: peer.id,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        hobbies: document.getElementById("hobbies").value,
        gender: document.getElementById("gender").value,
        sexual: document.getElementById("sexual").value,
        on_connect: false,
        game_mode: game_menu
      },
      success: function(msg) {
        //alert('Data Saved: ' + msg);
        console.log("unique_id "+msg);
        db_unique_id = msg;
      },
      error:function(xhr, ajaxOptions, thrownError){
        alert("register2 "+xhr.status);
        alert("register2 "+thrownError);
      }
    });
  }
}


/*
function submit() {

  //update UI function future
  $("#submit_user").hide();






}

*/

function choosegender(gender) {

  if(gender == '1')
  {
    document.getElementById("gender").value = "male";
    document.getElementById("gender_male_pic").src = '/img/male.png';
    document.getElementById("gender_female_pic").src = '/img/unselect.png';
  }else
  {
    document.getElementById("gender").value = "female";
    document.getElementById("gender_female_pic").src = '/img/female.png';
    document.getElementById("gender_male_pic").src = '/img/unselect.png';
  }

}

function chooseinterest (interest ) {

  if(interest == '1')
  {
    document.getElementById("sexual").value = "male";
    document.getElementById("sexual_male_pic").src = '/img/male.png';
    document.getElementById("sexual_female_pic").src = '/img/unselect.png';
  }else
  {
    document.getElementById("sexual").value = "female";
    document.getElementById("sexual_female_pic").src = '/img/female.png';
    document.getElementById("sexual_male_pic").src = '/img/unselect.png';
  }

}

$(document).ready(function () {
  //cancel the pairing process
  $("#submit_user").hide();
  $("#cancel_wait").hide();


  //choose game
  game_menu = 0;

  $("#games_choose").off().click( function () {

    pair(game_menu);
    $("#games_choose").hide();
    $("#cancel_wait").show();
  });




  $("#cancel_wait").off().click(function(){
    //update UI
    //$("#submit_user").show();
    $("#games_choose").show();
    $("#cancel_wait").hide();

    //ajax delete the user data if exist
    if(db_unique_id != " ")
    {
      $.ajax({
        type: 'POST',
        url: '/delete',
        data: {
          _id: db_unique_id,
        }, success: function(msg) {
          console.log("delete "+msg);

        }, error:function(xhr, ajaxOptions, thrownError){
          alert("update "+xhr.status);
          alert("update "+thrownError);
        }, complete: function () {
          //go to the user setting view (updateUI)
          db_unique_id = " ";
        }
      });
    }

  });
});


peer.on('connection', function(conn) {
  var destinated_id = " ";

  //ajax update the on_connect status to true
  $.ajax({
    type: 'POST',
    url: '/update',
    data: {
      _id: db_unique_id,
      on_connect: true
    }
  });


  //post to games page and redirect and hold to be connect at games page
  document.getElementById("my_id").value = peer.id;
  document.getElementById("destinated_id").value = destinated_id;
  document.getElementById("host").value = false;
  document.getElementById("game_mode").value = game_menu;
  $("#connect_form").submit();

});


peer.on('close', function() {
  //alert("close");


  //make the user who lost connection will be disable
  $.ajax({
    type: 'POST',
    url: '/update',
    data: {
      _id: db_unique_id,
      on_connect: true
    },
    success: function (msg) {
      console.log(msg);
    },
    error:function(xhr, ajaxOptions, thrownError){
      alert("clear "+xhr.status);
      alert("clear "+thrownError);
    }
  });

});

peer.on('error', function(err) {
  alert("server timeout");

});


//be fired when someone close the web page
window.onbeforeunload = function () {
  /*
   $.ajax({
   type: 'POST',
   url: '/games/clear',
   data: {
   my_peer_id: 'my_id',
   },
   success: function (msg) {
   //clear data directly
   console.log(msg);
   },
   error:function(xhr, ajaxOptions, thrownError){
   alert("clear "+xhr.status);
   alert("clear "+thrownError);
   }
   });
   */
  //make the user who lost connection will be disable
  $.ajax({
    type: 'POST',
    url: '/update',
    data: {
      _id: db_unique_id,
      on_connect: true,
      game_mode: 0
    },
    success: function (msg) {
      console.log(msg);
    },
    error:function(xhr, ajaxOptions, thrownError){
      //alert("clear "+xhr.status);
      //alert("clear "+thrownError);
    }
  });
}
