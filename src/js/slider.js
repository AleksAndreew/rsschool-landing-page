document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const viewport = document.querySelector(".slider_viewport");
  const markers = document.querySelectorAll(".slider_marker");
  const leftBtn = document.querySelector(".slider_control .left");
  const rightBtn = document.querySelector(".slider_control .right");

  const originalSlides = [...slider.querySelectorAll(".slider_wrapper")];
  const totalSlides = originalSlides.length;

  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  slider.append(firstClone);
  slider.prepend(lastClone);

  let currentIndex = 1;
  let isAnimating = false;
  let startX = 0;

  function moveSlider(withAnimation = true) {
    slider.style.transition = withAnimation
      ? "transform 0.4s ease"
      : "none";

    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function updateMarkers() {
    let activeIndex = currentIndex - 1;

    if (currentIndex === 0) {
      activeIndex = totalSlides - 1;
    }

    if (currentIndex === totalSlides + 1) {
      activeIndex = 0;
    }

    markers.forEach((marker, index) => {
      marker.classList.toggle("checked", index === activeIndex);
    });
  }

  function goToNextSlide() {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex += 1;

    moveSlider(true);
    updateMarkers();
  }

  function goToPreviousSlide() {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex -= 1;

    moveSlider(true);
    updateMarkers();
  }

  function goToSlide(slideIndex) {
    if (isAnimating) return;

    isAnimating = true;

    currentIndex = slideIndex + 1;

    moveSlider(true);
    updateMarkers();
  }

  slider.addEventListener("transitionend", (event) => {
    if (event.propertyName !== "transform") return;

    if (currentIndex === 0) {
      currentIndex = totalSlides;
      moveSlider(false);
    }

    if (currentIndex === totalSlides + 1) {
      currentIndex = 1;
      moveSlider(false);
    }

    isAnimating = false;
    updateMarkers();
  });

  leftBtn.addEventListener("click", goToPreviousSlide);
  rightBtn.addEventListener("click", goToNextSlide);

  markers.forEach((marker, index) => {
    marker.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  viewport.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].screenX;
  }, { passive: true });

  viewport.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].screenX;
    const swipeDistance = endX - startX;
    const minSwipeDistance = 50;

    if (swipeDistance < -minSwipeDistance) {
      goToNextSlide();
    }

    if (swipeDistance > minSwipeDistance) {
      goToPreviousSlide();
    }
  }, { passive: true });

  moveSlider(false);
  updateMarkers();
});