import { gsap } from "gsap";
import { CONFIG } from '../utils/config.js';
import { getRandomColor } from '../utils/utils.js';
import { titles } from '../titleData.js';

export class Slider {
    constructor(container) {
        this.container = container;
        this.sliderNav = container.querySelector(".slider-nav");
        this.slidesContainer = container.querySelector(".slides");
        this.bgOverlay = container.querySelector(".bg-overlay");
        this.slideTitle = container.querySelector(".slide-title");
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.createSlides();
        this.createNavigation();
        this.updateTitle(0, getComputedStyle(this.bgOverlay).backgroundColor);
    }

    createSlides() {
        for (let i = 0; i < CONFIG.numberOfItems; i++) {
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
            this.slidesContainer.appendChild(slide);
        }
    }

    createNavigation() {
        for (let i = 0; i < CONFIG.numberOfItems; i++) {
            const navItemWrapper = document.createElement("div");
            navItemWrapper.classList.add("nav-item-wrapper");

            if (i === 0) {
                navItemWrapper.classList.add("active");
            }

            const navItem = document.createElement("div");
            navItem.classList.add("nav-item");

            navItemWrapper.appendChild(navItem);
            this.sliderNav.appendChild(navItemWrapper);

            navItemWrapper.addEventListener("click", () => this.handleNavClick(i));
        }
    }

    updateTitle(newIndex, color) {
        const title = titles[newIndex % titles.length];
        const titleRows = this.slideTitle.querySelectorAll(".slide-title-row");

        titleRows.forEach((row, rowIndex) => {
            row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
                const existingSpan = letter.querySelector("span");
                if (existingSpan) {
                    letter.removeChild(existingSpan);
                }

                const newSpan = document.createElement("span");
                const direction = newIndex > this.currentIndex ? 150 : -150;
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
            });
        });
    }

    handleNavClick(index) {
        if (index === this.currentIndex) return;

        document.querySelectorAll(".nav-item-wrapper").forEach((nav) => nav.classList.remove("active"));
        this.sliderNav.children[index].classList.add("active");

        const translateXValue = -index * 100;
        gsap.to(this.slidesContainer, {
            x: `${translateXValue}vw`,
            duration: CONFIG.animationDuration,
            ease: "hop"
        });

        const newColor = getRandomColor();
        gsap.to(this.bgOverlay, {
            backgroundColor: newColor,
            duration: CONFIG.animationDuration,
            ease: "hop"
        });

        this.updateTitle(index, newColor);
        this.currentIndex = index;
    }
}