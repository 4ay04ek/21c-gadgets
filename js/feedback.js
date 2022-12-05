function send() {
  document.getElementById("send").innerHTML = "Спасибо!";
  document.getElementById("send").style.cursor = "default";
  document.getElementById("send").onclick = undefined;
  document.getElementById("send").style.color = "white";
  document.getElementById("send").onmouseover = () => {
    document.getElementById("send").style.color = "white";
  };
  axios.post("https://ultrabizzare.site/api/feedback", {
    email: document.querySelector("input[name='email']").value,
    text: document.querySelector("textarea").value,
  });
}

if (document.documentElement.clientWidth < 800) {
  document.querySelector("#form div").innerHTML = "Email:";
}
