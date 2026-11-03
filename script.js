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

const nav = document.querySelector("nav");
const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll("nav a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// ---------- Project pop-up ----------
const projectInfo = {
  "IT Asset Management System": {
    text: "A central system to manage company IT assets from start to finish.",
    points: [
      "Tracks inventory, assignment and returns",
      "Tracks maintenance and warranty",
      "Interactive dashboards and easy forms for asset management and reporting"
    ],
    tools: ["Power Apps", "Microsoft Lists", "Power Automate"]
  },
  "O&M Vehicle Management System": {
    text: "A vehicle system with one side for users and one side for admins.",
    points: [
      "User forms for vehicle requests",
      "Admin screens to manage vehicles, approvals and records",
      "Automatic notifications and approval flows"
    ],
    tools: ["Power Apps", "Microsoft Lists", "Power Automate"]
  }
};

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

function closeModal() {
  modal.classList.remove("open");
}

document.querySelectorAll("#projects .card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("shot") && document.getElementById("viewer")) return;

    const title = card.querySelector("h3").textContent;
    const info = projectInfo[title];
    if (!info) return;

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-text").textContent = info.text;

    const list = document.getElementById("modal-list");
    list.innerHTML = "";
    info.points.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      list.appendChild(li);
    });

    const tags = document.getElementById("modal-tags");
    tags.innerHTML = "";
    info.tools.forEach((t) => {
      const s = document.createElement("span");
      s.textContent = t;
      tags.appendChild(s);
    });

    const shot = card.querySelector(".shot");
    if (shot) {
      modalImg.src = shot.src;
      modalImg.style.display = "block";
    } else {
      modalImg.style.display = "none";
    }
    modalImg.onerror = () => (modalImg.style.display = "none");

    modal.classList.add("open");
  });
});

document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Load logos and screenshots only when they come into view
document.querySelectorAll("img.shot, img.logo").forEach((img) => {
  img.loading = "lazy";
});

// ---------- Card tilt (laptop only) ----------
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        "perspective(700px) rotateX(" + -y * 10 + "deg) rotateY(" + x * 10 + "deg) translateY(-6px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ---------- Click sparkles ----------
document.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    const angle = (Math.PI * 2 * i) / 8;
    const dist = 30 + Math.random() * 30;
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    s.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
});

// ---------- Skill bars fill when visible ----------
const levels = document.getElementById("levels");
new IntersectionObserver((entries, obs) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      levels.classList.add("go");
      obs.disconnect();
    }
  });
}, { threshold: 0.3 }).observe(levels);

// ---------- Language button (EN / BM) ----------
(function () {
  const ms = {
    "About": "Tentang",
    "Experience": "Pengalaman",
    "Projects": "Projek",
    "Skills": "Kemahiran",
    "Contact": "Hubungi",

    "FROM ISSUES.": "DARI MASALAH.",
    "TO SOLUTIONS.": "KE PENYELESAIAN.",
    "Open to opportunities": "Terbuka untuk peluang",
    "Download Resume": "Muat Turun Resume",

    "Years in IT": "Tahun dalam IT",
    "Companies": "Syarikat",
    "Power Apps Systems": "Sistem Power Apps",
    "Certification": "Sijil",

    "NOT JUST SUPPORT.": "BUKAN SEKADAR SOKONGAN.",
    "KEEPING EVERYTHING RUNNING.": "MEMASTIKAN SEMUANYA BERJALAN.",
    "LET'S BUILD": "MARI BINA",
    "SOMETHING RELIABLE.": "SESUATU YANG BOLEH DIPERCAYAI.",

    "About Me": "Tentang Saya",
    "Professional Experience": "Pengalaman Kerja",
    "Technical Expertise": "Kepakaran Teknikal",
    "Skill Levels": "Tahap Kemahiran",
    "Tools I Use": "Alatan Yang Digunakan",
    "Education": "Pendidikan",
    "Certifications": "Sijil",
    "Activities": "Aktiviti",

    "I'm an IT professional with hands-on experience in IT operations, Microsoft 365 administration, end-user support, and IT infrastructure troubleshooting.":
      "Saya seorang profesional IT yang berpengalaman dalam operasi IT, pentadbiran Microsoft 365, sokongan pengguna akhir, dan penyelesaian masalah infrastruktur IT.",
    "My work involves managing Microsoft 365 services, resolving technical issues, supporting business-critical systems, and maintaining a reliable and secure IT environment. I take a practical, problem-solving approach to technology, with a focus on system reliability, operational efficiency, and user experience.":
      "Kerja saya melibatkan pengurusan perkhidmatan Microsoft 365, menyelesaikan isu teknikal, menyokong sistem kritikal perniagaan, serta menjaga persekitaran IT yang boleh dipercayai dan selamat. Saya mengamalkan pendekatan praktikal dan berfokus kepada penyelesaian masalah, dengan penekanan pada kebolehpercayaan sistem, kecekapan operasi dan pengalaman pengguna.",
    "I'm continuously developing my technical expertise in cloud technologies, infrastructure management, and cybersecurity.":
      "Saya terus memperkembangkan kepakaran teknikal saya dalam teknologi awan, pengurusan infrastruktur dan keselamatan siber.",

    "Let's connect and discuss technology, IT operations, and opportunities for professional collaboration.":
      "Jom berhubung dan berbincang tentang teknologi, operasi IT dan peluang kerjasama profesional.",
    "Email Me": "E-mel Saya",
    "Copy Email": "Salin E-mel",
    "Send Message": "Hantar Mesej",
    "References available on request.": "Rujukan boleh diberikan atas permintaan."
  };

  const placeholders = {
    "Your name": "Nama anda",
    "Your email": "E-mel anda",
    "Your message": "Mesej anda"
  };

  const norm = (s) => s.replace(/\u2019/g, "'").replace(/\s+/g, " ").trim();
  const map = {};
  Object.keys(ms).forEach((k) => (map[norm(k)] = ms[k]));

  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (["SCRIPT", "STYLE"].includes(n.parentNode.nodeName)) continue;
    const key = norm(n.nodeValue);
    if (map[key]) nodes.push({ node: n, en: n.nodeValue, ms: map[key] });
  }

  const fields = [...document.querySelectorAll("[placeholder]")]
    .map((el) => ({ el, en: el.placeholder, ms: placeholders[el.placeholder] }))
    .filter((f) => f.ms);

  const btn = document.createElement("button");
  btn.id = "lang-btn";
  document.body.appendChild(btn);

  function apply(lang) {
    nodes.forEach((x) => {
      if (lang === "ms") {
        const lead = x.en.match(/^\s*/)[0];
        const trail = x.en.match(/\s*$/)[0];
        x.node.nodeValue = lead + x.ms + trail;
      } else {
        x.node.nodeValue = x.en;
      }
    });
    fields.forEach((f) => (f.el.placeholder = lang === "ms" ? f.ms : f.en));
    document.documentElement.lang = lang;
    btn.textContent = lang === "ms" ? "🌐 EN" : "🌐 BM";
  }

  let lang = "en";
  try { lang = localStorage.getItem("lang") || "en"; } catch (e) {}

  btn.addEventListener("click", () => {
    lang = lang === "ms" ? "en" : "ms";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    apply(lang);
  });

  apply(lang);
})();

// ---------- Dark / Light button ----------
(function () {
  const btn = document.createElement("button");
  btn.id = "theme-btn";
  document.body.appendChild(btn);

  let theme = "dark";
  try { theme = localStorage.getItem("theme") || "dark"; } catch (e) {}

  function apply() {
    document.documentElement.dataset.theme = theme;
    btn.textContent = theme === "light" ? "🌙 Dark" : "☀️ Light";
  }

  btn.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", theme); } catch (e) {}
    apply();
  });

  apply();
})();