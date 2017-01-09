
$(document).ready(function () {
  //if the someone cancel the session
  var cancel_peer_id;

  $("#leave_room").off().click(function(){
    //update UI

    //when user click leaver, clear own data from db and move back to index page with their own data
    peer.destroy();
  });
});



//be fired when someone close the web page
window.onbeforeunload = function () {
  /*
   $.ajax({
   type: 'POST',
   url: '/games/clear',
   data: {
   my_peer_id: 'id',
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
  peer.destroy();
}





//call function

peer.on('call', function(incoming) {

  //fetching call
  navigator.getUserMedia =  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;


  navigator.getUserMedia({
    audio: true, video: false
  }, function(stream) {
    //replay local audio stream to destinate
    // Answer the call, providing our mediaStream
    incoming.answer(stream);
  }, function(error){
    console.log(error);
    alert('An error occured. Please try again');
  });


  incoming.on('stream', function(stream){

    //get call setting
    var audio = document.getElementById('peer_call');
    var audio_url = window.URL || window.webKitURL || window.mozURL;

    audio.src = audio_url.createObjectURL(stream);
    audio.play();

  });

});





$(document).ready(function () {

  $("#call").off().click(function(){



    //fetching call
    navigator.getUserMedia =  (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);


    navigator.getUserMedia({
      audio: true, video: false
    }, function(stream) {
      //replay local audio stream to destinate
      // Answer the call, providing our mediaStream
      var call = peer.call(dest_peer_id, stream);

      call.on('stream', function(stream) {
        // `stream` is the MediaStream of the remote peer.

        //get call setting
        var audio = document.getElementById('peer_call');
        var audio_url = window.URL || window.webKitURL || window.mozURL;

        audio.src = audio_url.createObjectURL(stream);
        audio.play();
      });
    }, function(error){
      console.log(error);
      alert('An error occured. Please try again');
    });


  });

});
