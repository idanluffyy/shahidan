const items = document.querySelectorAll("section");

const show = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

items.forEach((item) => {
  item.classList.add("hidden");
  show.observe(item);
});

const words = [
  "IT Executive",
  "Microsoft 365 Administrator",
  "IT Infrastructure Support",
  "Cybersecurity Learner"
];
const typing = document.getElementById("typing");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typing.textContent = word.substring(0, c) + "|";

  if (!deleting && c < word.length) {
    c++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (c > 0) {
    c--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    w = (w + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

const startDate = new Date(2024, 3, 1); // April 2024
const years = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24 * 365.25));
document.getElementById("years").dataset.target = years;

document.querySelectorAll(".stats b").forEach((el) => {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  let n = 0;

  function count() {
    el.textContent = n + suffix;
    if (n < target) {
      n++;
      setTimeout(count, 350);
    }
  }
  count();
});

const bar = document.getElementById("progress");
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max) * 100 + "%";

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

document.getElementById("copy").addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText("myshahidan@gmail.com");
  e.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
});

const updated = document.getElementById("updated");
const d = new Date(document.lastModified);
updated.textContent = "Last updated: " + d.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
});