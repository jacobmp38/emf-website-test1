// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  // Add click event listener to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default behavior
      e.preventDefault();

      // Get the target section id from the link's href
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // Scroll to the targeted section smoothly
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const progressBar = document.querySelector('.progress-bar');
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds per slide

  function showSlide(n) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Update slide index
    currentSlide = (n + slides.length) % slides.length;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Reset and start progress bar
    resetProgressBar();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function resetProgressBar() {
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.transition = 'width ' + intervalTime + 'ms linear';
      progressBar.style.width = '100%';
    }, 50);
  }

  function startSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, intervalTime);
    resetProgressBar();
  }

  // Event Listeners
  prevButton.addEventListener('click', () => {
    prevSlide();
    startSlideshow();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    startSlideshow();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startSlideshow();
    });
  });

  // Initialize slideshow
  showSlide(0);
  startSlideshow();

  // Pause slideshow on hover
  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
    progressBar.style.transition = 'none';
    progressBar.style.width = progressBar.offsetWidth + 'px';
  });

  heroSection.addEventListener('mouseleave', startSlideshow);
});
