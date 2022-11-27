window.onmousemove = (e) => {
  document.getElementById("cursor").style.top = e.pageY;
  document.getElementById("cursor_circle").style.top = e.pageY - 12;
  document.getElementById("cursor").style.left = e.pageX;
  document.getElementById("cursor_circle").style.left = e.pageX - 12;
};
