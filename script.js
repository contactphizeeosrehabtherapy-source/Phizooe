/* Typing Effect */
const text = "Healing, Right at Your Home";
let i = 0;
const speed = 80;

function type() {
    if (i < text.length) {
        document.querySelector(".typing").textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}
type();

/* Reveal */
document.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

/* Cursor Glow */
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

/* Tilt Effect */
document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.transform = `rotateX(${-(y - r.height/2)/10}deg) rotateY(${(x - r.width/2)/10}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});
document.addEventListener("DOMContentLoaded", () => {

    let reviewIndex = 0;
    const reviews = document.querySelectorAll(".review-card");
    const dots = document.querySelectorAll(".dot");

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            reviewIndex = i;
            showReview(reviewIndex);
        });
    });

    setInterval(() => {
        reviewIndex = (reviewIndex + 1) % reviews.length;
        showReview(reviewIndex);
    }, 5000);

});
// HAMBURGER MENU
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// REMOVE SPLASH, KEEP HERO LOGO
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.remove();

    // Force hero logo visibility after splash
    const heroLogo = document.querySelector(".holo-logo img");
    if (heroLogo) {
      heroLogo.style.opacity = "1";
      heroLogo.style.transform = "scale(1)";
    }
  }, 5200);
});

