// Optimized Cursor Trailer
const trailer = document.querySelector(".cursor-trailer");
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
const speed = 0.2; // Adjust for cursor speed (lower = faster)

const animateTrailer = () => {
  // Calculate new position with easing
  trailX += (mouseX - trailX) * speed;
  trailY += (mouseY - trailY) * speed;
  
  trailer.style.transform = `translate(${trailX}px, ${trailY}px)`;
  requestAnimationFrame(animateTrailer);
};

// Initialize animation
animateTrailer();

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Hover effects
document.querySelectorAll("a, button, .skill-card, .project-card, .certification-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    trailer.style.width = "40px";
    trailer.style.height = "40px";
    trailer.style.backgroundColor = "rgba(59, 130, 246, 0.3)";
  });
  
  el.addEventListener("mouseleave", () => {
    trailer.style.width = "20px";
    trailer.style.height = "20px";
    trailer.style.backgroundColor = "rgba(59, 130, 246, 0.5)";
  });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (savedTheme === 'dark') {
  html.classList.add('dark');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});