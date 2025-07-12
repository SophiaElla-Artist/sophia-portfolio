// Initialize EmailJS
emailjs.init("wXPsYj4bd-oMtLZRi"); // Your EmailJS User ID

// Portfolio Gallery
const artworks = [
  { title: "Mystic Realms", description: "Fantasy world with floating lands and magical villages.", image: "Images/fantasy_magic.webp" },
  { title: "Katakuri Tribute", description: "Fan art of Katakuri from One Piece.", image: "Images/katakuri_fan_art.webp" },
  { title: "Original Character", description: "Custom designed original character with weapon.", image: "Images/oc_art.webp" },
  { title: "Galactic Sorceress", description: "Magic user in a cosmic space scene.", image: "Images/space_art.webp" },
  { title: "Toothless Tribute", description: "Fan art of the dragon Toothless under the night sky.", image: "Images/toothless_dragon.webp" },
  { title: "The Arcane Scribe", description: "A mystical character conjuring runes while writing in an enchanted book.", image: "Images/character_portrait.webp" },
  { title: "Mystery in the Library", description: "A cinematic storytelling scene set in an ancient castle library.", image: "Images/story_art.webp" },
  { title: "Edge of the Flame", description: "A fantasy landscape where lava meets a snowy mountain valley.", image: "Images/scene_art.webp" }
];

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const searchInput = document.getElementById("search");

let itemsToShow = 3;

function renderGallery(items) {
  gallery.innerHTML = "";
  items.slice(0, itemsToShow).forEach(item => {
    const tile = document.createElement("div");
    tile.className = "art-tile";
    tile.innerHTML = `
  <img src="${item.image}" alt="${item.title}" loading="lazy">
  <div class="art-info">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>`;
    gallery.appendChild(tile);
  });

  loadMoreBtn.style.display = itemsToShow >= items.length ? "none" : "block";
}

renderGallery(artworks);

loadMoreBtn.addEventListener("click", () => {
  itemsToShow += 3;
  renderGallery(artworks);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = artworks.filter(item =>
    item.title.toLowerCase().includes(query)
  );
  itemsToShow = filtered.length;
  renderGallery(filtered);
});

// Highlight Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navLinksList = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let current = "home";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_bdmn2in", "template_n6svdbs", this)
    .then(() => {
      alert("Message sent successfully!");
      contactForm.reset();
    }, (error) => {
      alert("Failed to send message: " + error.text);
    });
});

// Toggle Mobile Menu
const hamburger = document.getElementById("hamburger");
const navContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navContainer.classList.toggle("show");
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navContainer.contains(e.target) && !hamburger.contains(e.target)) {
    navContainer.classList.remove("show");
  }
});



// 🌌 Constellation Background Animation
const canvas = document.getElementById("constellation-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];
const STAR_COUNT = 80;
const STAR_RADIUS = 1.2;
const LINE_DISTANCE = 100;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = stars[i];
    ctx.beginPath();
    ctx.arc(star.x, star.y, STAR_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Connect with nearby stars
    for (let j = i + 1; j < STAR_COUNT; j++) {
      const other = stars[j];
      const dx = star.x - other.x;
      const dy = star.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < LINE_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / LINE_DISTANCE})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Move star
    star.x += star.vx;
    star.y += star.vy;

    // Bounce off edges
    if (star.x < 0 || star.x > width) star.vx *= -1;
    if (star.y < 0 || star.y > height) star.vy *= -1;
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
drawStars();
