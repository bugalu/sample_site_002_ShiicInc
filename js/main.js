"use strict";
{
  const show = document.getElementById("show");
  const globalNav = document.getElementById("globalNav");
  const shopNav = document.getElementById("shopNav");

  show.addEventListener("click", function() {
    globalNav.classList.toggle("menu-open");
    shopNav.classList.toggle("menu-open");
  });
}
