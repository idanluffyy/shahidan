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

const track = document.querySelector(".track");
track.innerHTML += track.innerHTML;

const glow = document.getElementById("glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const city = document.getElementById("city");
const layerList = [
  { cls: "far", count: 30, depth: 12 },
  { cls: "mid", count: 22, depth: 28 },
  { cls: "near", count: 14, depth: 55 }
];

layerList.forEach((l) => {
  const row = document.createElement("div");
  row.className = "layer " + l.cls;
  row.dataset.depth = l.depth;
  for (let i = 0; i < l.count; i++) {
    const b = document.createElement("div");
    b.className = "bld";
    b.style.height = 30 + Math.random() * 70 + "%";
    b.style.flexGrow = 1 + Math.random() * 2;
    row.appendChild(b);
  }
  city.appendChild(row);
});

const headerEl = document.querySelector("header");

headerEl.addEventListener("mousemove", (e) => {
  const rect = headerEl.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const x = mouseX / rect.width - 0.5;

  document.querySelectorAll(".layer").forEach((row) => {
    row.style.transform = "translateX(" + -x * row.dataset.depth + "px)";
  });

  document.querySelectorAll(".near .bld").forEach((b) => {
    const r = b.getBoundingClientRect();
    const center = r.left - rect.left + r.width / 2;
    const lift = Math.max(0, 1 - Math.abs(mouseX - center) / 220);
    b.style.transform = "scaleY(" + (1 + lift * 0.4) + ")";
  });
});

headerEl.addEventListener("mouseleave", () => {
  document.querySelectorAll(".layer").forEach((row) => {
    row.style.transform = "";
  });
  document.querySelectorAll(".near .bld").forEach((b) => {
    b.style.transform = "";
  });
});

// Play the intro only once per visit
try {
  if (sessionStorage.getItem("introSeen")) {
    document.getElementById("loader").style.display = "none";
  }
  sessionStorage.setItem("introSeen", "1");
} catch (e) {}

// Twinkling buildings
document.querySelectorAll(".bld").forEach((b) => {
  const time = 3 + Math.random() * 4;
  const delay = Math.random() * 3;
  b.style.animation = "twinkle " + time + "s ease-in-out " + delay + "s infinite alternate";
});

// ---------- Page builds itself ----------
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const header = document.querySelector("header");
  const parts = [".photo", ".eyebrow", ".hero-title", "#typing", ".badge", ".hero-buttons"]
    .map((s) => header.querySelector(s))
    .filter(Boolean);
  const bld = document.querySelectorAll(".bld");

  parts.forEach((p) => p.classList.add("pre"));
  bld.forEach((b) => { b.style.transform = "scaleY(0)"; });

  const arrow = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="currentColor"/></svg>';
  const agents = [
    { name: "Layout", color: "#38bdf8" },
    { name: "Style", color: "#a78bfa" },
    { name: "Content", color: "#34d399" }
  ].map((a, i) => {
    const el = document.createElement("div");
    el.className = "agent";
    el.style.setProperty("--c", a.color);
    el.innerHTML = arrow + '<span class="tag">' + a.name + "</span>";
    el.style.transform = "translate(" + (80 + i * 120) + "px, -50px)";
    header.appendChild(el);
    return el;
  });

  function build() {
    const hr = header.getBoundingClientRect();

    agents.forEach((a) => (a.style.opacity = 1));

    bld.forEach((b) => {
      b.style.transition =
        "transform 0.9s cubic-bezier(.2,.8,.2,1) " + Math.random() * 1500 + "ms";
      b.style.transform = "";
    });

    parts.forEach((p, i) => {
      setTimeout(() => {
        const agent = agents[i % agents.length];
        const color = agent.style.getPropertyValue("--c");
        const hrNow = header.getBoundingClientRect();
        const r = p.getBoundingClientRect();

        const box = document.createElement("div");
        box.className = "sel";
        box.style.color = color;
        box.style.left = r.left - hrNow.left - 8 + "px";
        box.style.top = r.top - hrNow.top - 8 + "px";
        box.style.width = r.width + 16 + "px";
        box.style.height = r.height + 16 + "px";
        box.innerHTML =
          '<span class="h tl"></span><span class="h tr"></span><span class="h bl"></span><span class="h br"></span>';
        header.appendChild(box);

        agent.style.transform =
          "translate(" + (r.right - hrNow.left - 4) + "px," + (r.bottom - hrNow.top - 4) + "px)";

        setTimeout(() => p.classList.remove("pre"), 600);
        setTimeout(() => box.remove(), 1000);
      }, i * 500);
    });

    setTimeout(() => {
      agents.forEach((a) => {
        a.style.transform = "translate(" + (hr.width + 80) + "px, -60px)";
        a.style.opacity = 0;
      });
      bld.forEach((b) => (b.style.transition = ""));
      setTimeout(() => agents.forEach((a) => a.remove()), 1200);
    }, parts.length * 500 + 1400);
  }

  const loader = document.getElementById("loader");
  const wait = loader && loader.style.display !== "none" ? 3000 : 300;
  setTimeout(build, wait);

  // safety: never leave anything hidden
  setTimeout(() => parts.forEach((p) => p.classList.remove("pre")), wait + 7000);
})();

// ---------- Sections build themselves ----------
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const names = [
    ["Layout", "#38bdf8"],
    ["Style", "#a78bfa"],
    ["Content", "#34d399"]
  ];
  const arrow = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="currentColor"/></svg>';
  const handles = '<span class="h tl"></span><span class="h tr"></span><span class="h bl"></span><span class="h br"></span>';
  let n = 0;

  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      seen.unobserve(entry.target);

      const sec = entry.target;
      const pick = names[n++ % names.length];

      const box = document.createElement("div");
      box.className = "sel";
      box.style.color = pick[1];
      box.style.inset = "-6px";
      box.innerHTML = handles;

      const agent = document.createElement("div");
      agent.className = "agent";
      agent.style.setProperty("--c", pick[1]);
      agent.innerHTML = arrow + '<span class="tag">' + pick[0] + "</span>";
      agent.style.transform = "translate(-40px, -60px)";

      sec.appendChild(box);
      sec.appendChild(agent);

      requestAnimationFrame(() => requestAnimationFrame(() => {
        agent.style.opacity = 1;
        agent.style.transform =
          "translate(" + (sec.offsetWidth - 10) + "px," + (sec.offsetHeight - 10) + "px)";
      }));

      setTimeout(() => {
        box.style.opacity = 0;
        agent.style.opacity = 0;
      }, 1300);
      setTimeout(() => {
        box.remove();
        agent.remove();
      }, 1900);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll("main section").forEach((s) => seen.observe(s));
})();