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
