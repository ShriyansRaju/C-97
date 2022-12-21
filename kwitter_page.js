//YOUR FIREBASE LINKS

var firebaseConfig = {
      apiKey: "AIzaSyDImQ8wenDZohLOB3MrVX3FwQfaGyVpRbk",
      authDomain: "kwitter-90754.firebaseapp.com",
      databaseURL: "https://kwitter-90754-default-rtdb.firebaseio.com",
      projectId: "kwitter-90754",
      storageBucket: "kwitter-90754.appspot.com",
      messagingSenderId: "775041687125",
      appId: "1:775041687125:web:a2c04bcd8f9e8a62c07edc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
      message = document.getElementById("message").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            like: 0
      })
      document.getElementById("message").value = ""
}

function logout() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id)
                        console.log(message_data)

                        name = message_data['name']
                        message = message_data['message']
                        like = message_data['like']

                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
                        message_with_tag = "<h5 class='message_h4'>" + message + "</h5>"
                        like_button = "<button  class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like:" + like + "</span> </button> <hr>"

                        row = name_with_tag + message_with_tag + like_button + span_with_tag

                        document.getElementById("output").innerHTML+=row

                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id){
      console.log("Clicked on the Like Button"+message_id)
      button_id=message_id
      likes=document.getElementById(button_id).value
      updatedLikes=Number(likes)+1
      console.log(updatedLikes)
      firebase.database().ref(room_name).child(message_id).update({
            like:updatedLikes
      })
}