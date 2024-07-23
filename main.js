import "./style.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CONFIG } from './src/utils/config.js';
import { Slider } from './src/components/Slider.js';

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", CONFIG.customEasePath);

  const appHTML = // html 
    `
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
  document.querySelector("#app").innerHTML = appHTML;

  new Slider(document.querySelector('.container'));
});