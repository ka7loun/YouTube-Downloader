const mp3Btn = document.getElementById("mp3");
const mp4Btn = document.getElementById("mp4");
const URLinput = document.querySelector(".URL-input");

mp3Btn.addEventListener("click", () => {
  sendURL(URLinput.value, "mp3");
});

mp4Btn.addEventListener("click", () => {
  sendURL(URLinput.value, "mp4");
});

function sendURL(URL, format) {
  window.location.href = `http://localhost:4000/download?URL=${URL}&format=${format}`;
}
