import "./style.css";
import { gsap } from "gsap";

document.querySelector("#app").innerHTML = /*html*/`
  <div class="container">
    <nav>
      <a href="#" id="logo">Beanos</a>
      <a href="#">Subscribe</a>
    </nav>
    <footer>
      <a href="#">Unlock Source Code with Pro</a>
      <a href="#">Link in Description</a>
    </footer>

    <div class="bg-overlay"></div>
    
    <div class="slider-nav"></div>

    <div class="slides"></div>

    <div class="slide-title">
      <div class="slide-title-row">
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
      </div>
      <div class="slide-title-row">
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
        <div class="letter"></div>
      </div>
    </div>

  </div>
`;
