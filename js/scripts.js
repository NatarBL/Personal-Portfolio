/*!
 * Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Activate SimpleLightbox plugin for portfolio items
  new SimpleLightbox({
    elements: "#portfolio a.portfolio-box",
  });
});

function showGameDisplay() {
  document.getElementById("gameButton").style.display = "none";
  document.getElementById("gameDisplay").style.display = "block";
}

function mouseOverA() {
  document.getElementById("imgDescriptionA").style =
    "display: block; position:absolute; margin-top: 2.5%; width: 33.33%; text-align:center; padding: 10px; z-index:99;";
}
function mouseOutA() {
  document.getElementById("imgDescriptionA").style = "display: none;";
}
function showDivA() {
  document.getElementById("projectdivA").style.display = "block";
}
function mouseOverB() {
  document.getElementById("imgDescriptionB").style =
    "display: block; position:absolute; margin-left: 33.33%; margin-top: 2.5%; width: 33.33%; text-align:center; padding: 10px; z-index:99;";
}
function mouseOutB() {
  document.getElementById("imgDescriptionB").style = "display: none;";
}
function mouseOverC() {
  document.getElementById("imgDescriptionC").style =
    "display: block; position:absolute; margin-left: 66.66%; margin-top: -20%; width: 33.33%; text-align:center; padding: 10px; z-index:99;";
}
function mouseOutC() {
  document.getElementById("imgDescriptionC").style = "display: none;";
}

function toPokeLink() {
  location.replace("https://nateblandofficial-pokedemo.netlify.app/");
}
