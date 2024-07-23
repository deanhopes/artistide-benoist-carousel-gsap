import "./style.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { titles } from './titleData.js';

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase);
  CustomEase.create(
    "hop",
    "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
  );

  const sliderNav = document.querySelector(".slider-nav");
  const slidesContainer = document.querySelector(".slides");
  const bgOverlay = document.querySelector(".bg-overlay");
  const slideTitle = document.querySelector(".slide-title");
  const numberOfItems = 30;
  let currentIndex = 0;

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updateTitle(newIndex, color) {
    const title = titles[newIndex % titles.length];
    const titleRows = slideTitle.querySelectorAll(".slide-title-row");

    titleRows.forEach((row, rowIndex) => {
      row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
        const existingSpan = letter.querySelector("span");
        if (existingSpan) {
          letter.removeChild(existingSpan);
        }

        const newSpan = document.createElement("span");
        const direction = newIndex > currentIndex ? 150 : -150;
        gsap.set(newSpan, {
          x: direction,
          color: color
        });

        newSpan.textContent = title[rowIndex][letterIndex] || "";
        letter.appendChild(newSpan);
        gsap.to(newSpan, {
          x: 0,
          duration: 1,
          ease: "hop",
          delay: 0.125
        });
      })
    })
  }

  // Create all slides at the beginning
  for (let i = 0; i < numberOfItems; i++) {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (i === 0) {
      slide.classList.add("active");
    }

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("img");

    const img = document.createElement("img");
    img.src = `./assets/img${i + 1}.jpg`;
    img.alt = "";

    imgWrapper.appendChild(img);
    slide.appendChild(imgWrapper);
    slidesContainer.appendChild(slide);
  }

  for (let i = 0; i < numberOfItems; i++) {
    const navItemWrapper = document.createElement("div");
    navItemWrapper.classList.add("nav-item-wrapper");

    if (i === 0) {
      navItemWrapper.classList.add("active");
    }

    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");

    navItemWrapper.appendChild(navItem);
    sliderNav.appendChild(navItemWrapper);

    navItemWrapper.addEventListener("click", () => {
      if (i === currentIndex) {
        return;
      }

      document.querySelectorAll(".nav-item-wrapper").forEach((nav) => nav.classList.remove("active"));
      navItemWrapper.classList.add("active");

      const translateXValue = -i * 100;
      gsap.to(slidesContainer, {
        x: `${translateXValue}vw`,
        duration: 1.5,
        ease: "hop"
      });

      const newColor = getRandomColor();
      gsap.to(bgOverlay, {
        backgroundColor: newColor,
        duration: 1.5,
        ease: "hop"
      });

      updateTitle(i, newColor);
      currentIndex = i;
    });
  }

  if (Array.isArray(titles) && titles.length > 0) {
    updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);
  } else {
    console.error('titles is not a valid array. Check your titleData.js file.');
  }
});

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
