
const shootBtn = document.getElementById("shootBtn");
const arrow = document.getElementById("arrow");
const heart = document.getElementById("heart");
const opening = document.getElementById("opening");
const birthday = document.getElementById("birthday");

const letterBtn = document.getElementById("letterBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const letterPopup = document.getElementById("letterPopup");
const surprisePopup = document.getElementById("surprisePopup");

let fired = false;

// Shoot the arrow
shootBtn.addEventListener("click", () => {
    if (fired) return;

    fired = true;
    shootBtn.disabled = true;
    shootBtn.textContent = "Sending Love... ❤️";

    arrow.classList.add("fly");

    setTimeout(() => {
        heart.classList.add("hit");
        createBurst();
    }, 1200);

    setTimeout(() => {
        opening.style.opacity = "0";
        opening.style.pointerEvents = "none";
        birthday.classList.add("show");
    }, 2300);
});

// Heart particle animation
function createBurst() {
    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.textContent = Math.random() > 0.5 ? "❤️" : "✨";

        particle.style.position = "fixed";
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.fontSize = `${15 + Math.random() * 20}px`;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9999";

        document.body.appendChild(particle);

        const x = (Math.random() - 0.5) * 500;
        const y = (Math.random() - 0.5) * 500;

        const animation = particle.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${x}px,${y}px) scale(0.2)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: "ease-out"
        });

        animation.onfinish = () => particle.remove();
    }
}

// Open popup
letterBtn.addEventListener("click", () => {
    letterPopup.classList.add("show");
});

surpriseBtn.addEventListener("click", () => {
    surprisePopup.classList.add("show");
});

// Close buttons
document.querySelectorAll(".close").forEach(button => {
    button.addEventListener("click", () => {
        closePopups();
    });
});

// Close by clicking outside the popup card
[letterPopup, surprisePopup].forEach(popup => {
    popup.addEventListener("click", event => {
        if (event.target === popup) {
            closePopups();
        }
    });
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closePopups();
    }
});

function closePopups() {
    letterPopup.classList.remove("show");
    surprisePopup.classList.remove("show");
}