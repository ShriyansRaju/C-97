
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

    user_name=localStorage.getItem("user_name")
    document.getElementById("user_name").innerHTML="Welcome "+user_name+"!"

    function add_room(){
      room_name=document.getElementById("room_name").value
      firebase.database().ref("/").child(room_name).update({
            Reason:"Adding Room"
      })
      localStorage.setItem("room_name", room_name)
      window.location="kwitter_page.html"
    }

    function logout(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location="index.html"
    }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Names "+Room_names)
      row="<div class='room_name' id="+Room_names+" onclick='redirect_to_room_name(this.id)'>#"+Room_names+"</div> <hr>"
      document.getElementById("output").innerHTML+=row
      //End code
      });});}
getData();

function redirect_to_room_name(name){
      console.log(name)
      localStorage.setItem("room_name", name)
      window.location="kwitter_page.html"
}
