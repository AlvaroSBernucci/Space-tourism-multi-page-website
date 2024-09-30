import Slide from "./slide.js";
const destSlide = new Slide(".planet-links a", "[data-detail]", "destinations");
destSlide.init();

const crewSlide = new Slide(".crew-links a", "[data-detail]", "crew");
crewSlide.init();

const techSlide = new Slide(".tech-links a", "[data-detail]","technology","portrait");
techSlide.init();
