import './menu.scss';

const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".hamburger__icon_close");
const menuIcon = document.querySelector(".hamburger__icon_menu");

function toggleMenu() {
  if (menu.classList.contains("menu_show")) {
    menu.classList.remove("menu_show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    hamburger.setAttribute('aria-expanded', false);
  } else {
    menu.classList.add("menu_show");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    hamburger.setAttribute('aria-expanded', true);

  }
}

hamburger.addEventListener("click", toggleMenu);
