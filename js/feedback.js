function send() {
  document.getElementById("send").innerHTML = "Спасибо!";
}

if (document.documentElement.clientWidth < 800) {
  document.querySelector("#form div").innerHTML = "Email:";
}
