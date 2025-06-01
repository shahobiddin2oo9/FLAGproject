let mood = document.querySelector(".mood");
let dark = document.querySelector(".dark");

if (localStorage.getItem("darkMode") === "enm") {
  document.body.classList.add("dark-mode");
  dark.style.display = "flex";
  mood.style.display = "none";
}
mood.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", "enm");
  mood.style.display = "none";
  dark.style.display = "flex";
});

dark.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", "dis");
  dark.style.display = "none";
  mood.style.display = "flex";
});
