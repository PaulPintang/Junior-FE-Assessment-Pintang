const readMore = () => {
  const aboutText = document.getElementById("about-text");
  const toggleText = document.getElementById("toggle-text");
  aboutText.classList.toggle("expand");
  toggleText.innerHTML === "See less"
    ? (toggleText.innerHTML = "Read more")
    : (toggleText.innerHTML = "See less");
};

const toggleMenu = () => {
  nav = document.querySelector(".links-container");
  header = document.querySelector("header");
  flexHeight = document.querySelector(".h-full");
  logoPosition = document.querySelector(".logo");
  body = document.querySelector("body");
  nav.classList.toggle("active");
  header.classList.toggle("active");
  flexHeight.classList.toggle("active");
  logoPosition.classList.toggle("active");
  body.classList.toggle("active");
};
