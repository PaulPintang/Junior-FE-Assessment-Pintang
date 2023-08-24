const readMore = () => {
  const aboutText = document.getElementById("about-text");
  const toggleText = document.getElementById("toggle-text");
  aboutText.classList.toggle("expand");
  toggleText.innerHTML === "See less"
    ? (toggleText.innerHTML = "Read more")
    : (toggleText.innerHTML = "See less");
};
