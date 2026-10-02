const slides = document.querySelectorAll(".slide");
const sliderDotsContainer = document.querySelector("#sliderDots");
let current = 0;
let autoPlayTimer;

function setActiveSlide(index) {
   slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
   });

   if (sliderDotsContainer) {
      const dots = sliderDotsContainer.querySelectorAll(".slider-dot");
      dots.forEach((dot, dotIndex) => {
         dot.classList.toggle("active", dotIndex === index);
      });
   }
}

function changeSlide() {
   current = (current + 1) % slides.length;
   setActiveSlide(current);
}

if (slides.length > 0) {
   slides.forEach((_, index) => {
      if (!sliderDotsContainer) {
         return;
      }

      const dot = document.createElement("button");
      dot.className = "slider-dot";
      dot.setAttribute("type", "button");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      dot.addEventListener("click", function () {
         current = index;
         setActiveSlide(current);
         clearInterval(autoPlayTimer);
         autoPlayTimer = setInterval(changeSlide, 3200);
      });

      sliderDotsContainer.appendChild(dot);
   });

   setActiveSlide(0);
   autoPlayTimer = setInterval(changeSlide, 3200);
}

const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {
   menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
   });

   document.addEventListener("click", function (event) {
      const clickedInsideNav = event.target.closest(".navbar");
      if (!clickedInsideNav) {
         navMenu.classList.remove("open");
      }
   });

   window.addEventListener("resize", function () {
      if (window.innerWidth > 1180) {
         navMenu.classList.remove("open");
      }
   });
   
}