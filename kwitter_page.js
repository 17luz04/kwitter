const firebaseConfig = {
  apiKey: "AIzaSyDlrBn9kuZ7uvDTt4iknEvU7KU70p8YO7g",
  authDomain: "kwitter-f6945.firebaseapp.com",
  databaseURL: "https://kwitter-f6945-default-rtdb.firebaseio.com",
  projectId: "kwitter-f6945",
  storageBucket: "kwitter-f6945.appspot.com",
  messagingSenderId: "247824651990",
  appId: "1:247824651990:web:041d59c5bb127dcd735b77",
  measurementId: "G-QJPVGG994C"
};

firebase.initializeApp(firebaseConfig);
/////////////////////////////////////////

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;//para contener todos los id únicos de los mensajes generados por Firebase.
        message_data = childData;//para guardar todos los mensajes, los Me gusta y el nombre de usuario de cada mensaje.
        //Start code
        name = message_data['name'];//obtenermos el valor de name y lo guardamos en la var name
        message = message_data['message'];//obtenermos el valor de message y lo guardamos en la var message
        like = message_data['like'];//obtenermos el valor de like y lo guardamos en la var like
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";/// aquí vamos a almacenar el nombre de usuario y la imagen del icono.
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";//aquí vamos a almacenar el mensaje
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + "onclick='updateLike(this.id)'>";
        ///like_button  aquí vamos a almacenar la etiqueta button.
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
        //span_whit_tag aquí vamos a almacenar la etiqueta del botón.
        row = name_with_tag + message_with_tag + like_button + span_with_tag; /// juntar todas las variables en row
        document.getElementById("output").innerHTML += row; // mostarar en output el valor de row
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) { //actualizar numero de likes
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes // actualiza los like en firebase
  });

}

function logout() { /// funcion de cierre de sesion 
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}