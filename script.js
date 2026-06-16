const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const magneticItems = document.querySelectorAll(".magnetic");
const revealItems = document.querySelectorAll(".reveal");
const interactiveCards = document.querySelectorAll(".interactive-card");
const packageCards = document.querySelectorAll(".package-card");
const labTabs = document.querySelectorAll("[data-lab-tab]");
const labPreview = document.querySelector("[data-lab-preview]");
const formButton = document.querySelector("[data-form-submit]");
const formNote = document.querySelector("[data-form-note]");

const labContent = {
  strategy: {
    eyebrow: "Strategy",
    title: "Position the offer before the first post goes live.",
    body: "We map your audience, creative angles, platform mix, and conversion path so every asset has a job.",
    width: "78%",
  },
  content: {
    eyebrow: "Content",
    title: "Build a month of social content around one sharp idea.",
    body: "Hooks, reels, carousels, captions, and visual direction are planned together so the feed feels intentional.",
    width: "86%",
  },
  ads: {
    eyebrow: "Ads",
    title: "Test creative fast and move budget toward what performs.",
    body: "Paid social campaigns turn the strongest content angles into traffic, leads, and retargeting momentum.",
    width: "68%",
  },
  reporting: {
    eyebrow: "Reporting",
    title: "Make every campaign smarter than the last one.",
    body: "Monthly insights translate reach, saves, clicks, and conversions into clear next moves.",
    width: "92%",
  },
};

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mx", `${Math.round((event.clientX / window.innerWidth) * 100)}%`);
  document.documentElement.style.setProperty("--my", `${Math.round((event.clientY / window.innerHeight) * 100)}%`);
}, { passive: true });

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  });
});

packageCards.forEach((card) => {
  card.addEventListener("click", () => {
    packageCards.forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
  });
});

labTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = labContent[tab.dataset.labTab];
    if (!next) return;

    labTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    labPreview.classList.add("is-switching");

    window.setTimeout(() => {
      labPreview.innerHTML = `
        <p class="eyebrow">${next.eyebrow}</p>
        <h3>${next.title}</h3>
        <p>${next.body}</p>
        <div class="lab-meter"><span style="width: ${next.width}"></span></div>
      `;
      labPreview.classList.remove("is-switching");
    }, 160);
  });
});

formButton.addEventListener("click", () => {
  formNote.textContent = "Thanks - your proposal request is ready to connect once this form is wired to email or a CRM.";
});
