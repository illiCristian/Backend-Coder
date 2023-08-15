const socket = io();
let user = "desconocido";
fetch("/api/session/current").then((res) => {
  res.json().then((data) => {
    user = data.payload.first_name;
    console.log("asd");
    console.log(data);
    Swal.fire({
      //title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: `Te identificaste como ${user}`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
    socket.emit("authenticated", usuario);
  });
});
console.log(user);
let front = "desconocido";
let usuario = "desconocido";
const chatbox = document.getElementById("chatbox");
if (user !== "desconocido") {
}

/* Swal.fire({
  title: "Identifícate",
  input: "text",
  inputValidator: (value) => {
    return !value && "Necesita escribir el nombre de usuario para iniciar!";
  },
  allowOutsideClick: false,
  toast: true,
}).then((result) => {
  user = result.value;
  let usario = {
    user: user,
    origin: front,
  };

  socket.emit("authenticated", usuario);
}); */

chatbox.addEventListener("keyup", (evt) => {
  console.log(evt);
  if (evt.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      if (socket.connected) {
        socket.emit("message", { user: user, message: chatbox.value.trim() });
        chatbox.value = "";
      } else {
        console.log("Socket no conectado.");
      }
    }
  }
});

socket.on("messageLogs", (data) => {
  if (!user) return;

  let log = document.getElementById("messageLogs");

  let messages = [""];

  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message} <br/>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConnected", (data) => {
  if (!user) return;
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${data} se ha unido al chat`,
    icon: "success",
  });
});
