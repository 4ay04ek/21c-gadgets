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
  if (year == undefined) showError();
  if (month == undefined) showError();
  if (file.files[0] == undefined) showError();
  if (content == undefined) showError();
  console.log(formData);
  console.log(file.files[0]);
  axios.post("http://5.228.43.243:7777/post", {
    name: name,
    year: year,
    month: month,
    content: content,
  });
  axios.post("http://5.228.43.243:7777/upload_image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
