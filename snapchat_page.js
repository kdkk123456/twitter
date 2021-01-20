//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCgbfU1JI_l4YfkCoe-9I4XEpgq6f-VEcs",
      authDomain: "sfinalkwitter.firebaseapp.com",
      databaseURL: "https://sfinalkwitter-default-rtdb.firebaseio.com",
      projectId: "sfinalkwitter",
      storageBucket: "sfinalkwitter.appspot.com",
      messagingSenderId: "277140422129",
      appId: "1:277140422129:web:ddc55a6da8b69e81471850",
      measurementId: "G-KHB64LZ52F"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user")
    room_name=localStorage.getItem("room_name")
    function send() {
          message=document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                NAME:user_name,
                MESSAGE:message,
                LIKE:0
          });
    }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         
//Start code
console.log(message_data)
user=message_data["NAME"]
message=message_data["MESSAGE"]
like=message_data["LIKE"]

nametag=`<h4>${user}</h4> <br>`
messagetag=`<h4>${message}</h4>`
buttontag=`<button class="btn btn-warning" id=${firebase_message_id} value=${like} onclick="updatelike(this.id)">`
spantag=`<span class="glyphicon glyphicon-thumbs-up">Like: ${like}</span></button><hr>`

final=nametag+messagetag+buttontag+spantag

document.getElementById("output").innerHTML+=final;
//End code
      } });  }); }
getData();
function logout() {
      localStorage.removeItem("user")
      localStorage.removeItem("room_name")
      window.location="index.html"
}

function updatelike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      likes_in_number = Number(likes) + 1;
      console.log(likes_in_number);
      firebase.database().ref(room_name).child(message_id).update({ LIKE : likes_in_number });
}
