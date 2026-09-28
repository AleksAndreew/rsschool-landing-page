document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const wrappers = slider.querySelectorAll(".slider_wrapper");
  const markers = document.querySelectorAll(".slider_marker");
  const leftBtn = document.querySelector(".slider_control .left");
  const rightBtn = document.querySelector(".slider_control .right");

  let currentIndex = 0;
  const totalSlides = wrappers.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    markers.forEach((marker, index) => {
      marker.classList.toggle("checked", index === currentIndex);
    });
  }

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  markers.forEach((marker, index) => {
    marker.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  updateSlider();
});
