import Slide from "./slide.js";
import MenuMobile from "./menumobile.js";
// const destSlide = new Slide(".planet-links a", "[data-detail]", "destinations");
// destSlide.init();

// const crewSlide = new Slide(".crew-links a", "[data-detail]", "crew");
// crewSlide.init();

// const techSlide = new Slide(".tech-links a", "[data-detail]","technology","portrait");
// techSlide.init();

// techSlide.addResizeEvent();

const menuMobile = new MenuMobile('.menu-btn', '.ul-menu', '.close-btn');
menuMobile.init();

const currentPage = document.body.getAttribute("data-page");
if (currentPage === "destinations") {
    const destSlide = new Slide(".planet-links a", "[data-detail]", "destinations");
    destSlide.init();
} else if (currentPage === "crew") {
    const crewSlide = new Slide(".crew-links a", "[data-detail]", "crew");
    crewSlide.init();
} else if (currentPage === "technology") {
    const techSlide = new Slide(".tech-links a", "[data-detail]", "technology", "portrait");
    techSlide.init();
    techSlide.addResizeEvent();
}