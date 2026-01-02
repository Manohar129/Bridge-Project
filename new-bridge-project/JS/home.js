//fixed background image Section //


let images= ["new-bridge-project/images/slide01.jpeg","new-bridge-project/images/slide02.jpeg"];

let index = 0;
let slider = document.querySelector(".fixed-background");

// set first image
slider.style.backgroundImage = `url(${images[index]})`;

setInterval(() => {
    index++;

    if (index === images.length) {
        index = 0; // restart slider
    }

    slider.style.backgroundImage = `url(${images[index]})`;

}, 3000); 


// testimonial Slider Functionality //
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelector(".tm-slides-imges");
  const slideItems = document.querySelectorAll(".tm-image");
  const prevBtn = document.querySelector(".fa-left-long");
  const nextBtn = document.querySelector(".fa-right-long");

  if (!prevBtn || !nextBtn) {
    console.error("Arrow buttons not found. Check class names.");
    return;
  }

  let index = 0;

  function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", function () {
    index = (index + 1) % slideItems.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", function () {
    index = (index - 1 + slideItems.length) % slideItems.length;
    updateSlider();
  });

});
