let months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function showError() {
  alert("Не все поля заполнены!");
}

function send() {
  const name = document.querySelector("input[name='name']").value;
  const date = document.querySelector("input[name='year']").value;
  const year = date.split("-")[0];
  const month = months[parseInt(date.split("-")[1]) - 1];
  var formData = new FormData();
  var file = document.querySelector("input[name='preview']");
  formData.append("image", file.files[0]);
  const content = document.querySelector("textarea[name='content']").value;
  if (name == undefined) showError();
  else if (year == undefined) showError();
  else if (month == undefined) showError();
  else if (file.files[0] == undefined) showError();
  else if (content == undefined) showError();
  else {
    axios.post("https://ultrabizzare.site/post", {
      name: name,
      year: year,
      month: month,
      content: content,
    });
    axios.post("https://ultrabizzare.site/upload_image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    document.getElementById("send").innerHTML = "Спасибо за помощь сайту!";
    document.getElementById("send").onclick = undefined;
    document.getElementById("send").style.cursor = "default";
    document.getElementById("send").style.color = "white";
    document.getElementById("send").onmouseover = () => {
      document.getElementById("send").style.color = "white";
    };
  }
}
