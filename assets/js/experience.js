(function () {
  const revealItems = document.querySelectorAll("section, .lift-card, article, .reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 1100;
      const start = performance.now();
      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.45 });
  counters.forEach((counter) => counterObserver.observe(counter));

  const chips = document.querySelectorAll("[data-focus]");
  const focusCards = document.querySelectorAll("[data-focus-card]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const focus = chip.dataset.focus;
      chips.forEach((item) => item.classList.toggle("is-active", item === chip));
      focusCards.forEach((card) => {
        const active = card.dataset.focusCard === focus || focus === "tout";
        card.style.display = active ? "" : "none";
      });
    });
  });

  const galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length) {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = '<button class="absolute right-6 top-5 text-4xl font-bold text-white" type="button" aria-label="Fermer">&times;</button><img alt="">';
    document.body.appendChild(modal);
    const modalImage = modal.querySelector("img");
    galleryItems.forEach((image) => {
      image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modal.classList.add("is-open");
      });
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.tagName === "BUTTON") modal.classList.remove("is-open");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.classList.remove("is-open");
    });
  }

  document.querySelectorAll(".auto-gallery").forEach((gallery) => {
    const items = [...gallery.querySelectorAll(".gallery-item")];
    if (items.length <= 3) {
      items.forEach((item) => item.classList.add("is-active"));
      return;
    }
    let current = items.findIndex((item) => item.classList.contains("is-active"));
    if (current < 0) current = 0;
    const showGroup = () => {
      items.forEach((item, index) => {
        const offset = (index - current + items.length) % items.length;
        item.classList.toggle("is-active", offset < 3);
      });
    };
    showGroup();
    setInterval(() => {
      current = (current + 3) % items.length;
      showGroup();
    }, 3500);
  });

  const topButton = document.createElement("button");
  topButton.className = "back-to-top fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-2xl font-extrabold text-white shadow-card";
  topButton.type = "button";
  topButton.setAttribute("aria-label", "Retour en haut");
  topButton.textContent = "";
  document.body.appendChild(topButton);
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    topButton.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  // DYNAMIC HERO CAROUSEL LOGIC
  const HERO_IMAGES = {
    "index.html": [
      "assets/img/hero section/accueil/ministre.jpg",
      "assets/img/hero section/accueil/2.jpg",
      "assets/img/hero section/accueil/3.jpg"
    ],
    "le-ministere.html": [
      "assets/ministre/3.jpeg",
      "assets/ministre/4.jpeg",
      "assets/ministre/1.jpg",
      "assets/ministre/2.jpg"
    ],
    "jeunesse.html": [
      "assets/img/hero section/jeunes/PHOTO-2026-01-13-22-02-07.jpg",
      "assets/img/hero section/jeunes/PHOTO-2025-11-18-17-31-30.jpg",
      "assets/jeuness/1.jpg",
      "assets/jeuness/2.jpg"
    ],
    "sports-loisirs.html": [
      "assets/img/hero section/sport/PHOTO-2025-11-19-14-00-33.jpg",
      "assets/img/hero section/sport/PHOTO-2026-02-28-19-58-19.jpg",
      "assets/img/hero section/sport/PHOTO-2026-02-28-20-11-38.jpg",
      "assets/img/hero section/sport/PHOTO-2026-04-14-10-39-35.jpg"
    ],
    "culture-arts.html": [
      "assets/img/hero section/culture/PHOTO-2026-04-26-15-27-34.jpg",
      "assets/img/hero section/culture/PHOTO-2026-04-26-15-29-18.jpg",
      "assets/img/hero section/culture/PHOTO-2026-04-18-14-06-37.jpg",
      "assets/img/hero section/culture/PHOTO-2026-04-18-14-06-22.jpg"
    ],
    "actualites.html": [
      "assets/img/hero section/actualité/1.jpeg",
      "assets/img/hero section/actualité/3.jpeg",
      "assets/img/hero section/actualité/4.jpeg"
    ],
    "medias.html": [
      "assets/img/hero section/galerie/PHOTO-2025-11-18-17-31-53.jpg",
      "assets/img/hero section/galerie/PHOTO-2025-11-29-14-07-12.jpg",
      "assets/img/hero section/galerie/PHOTO-2026-02-04-17-42-07.jpg",
      "assets/img/hero section/galerie/PHOTO-2026-04-18-14-06-19.jpg",
      "assets/img/hero section/galerie/PHOTO-2026-04-26-15-29-18.jpg"
    ],
    "legals.html": [
      "assets/ministre/1.jpg",
      "assets/ministre/3.jpeg",
      "assets/ministre/4.jpeg"
    ],
    "contact.html": [
      "assets/ministre/WhatsApp Image 2026-05-21 at 12.59.31 (1).jpeg",
      "assets/ministre/1.jpeg",
      "assets/ministre/PHOTO-2026-04-18-14-06-22.jpg"
    ],
    "partenaires.html": [
      "assets/img/hero section/partenaires/1.jpg",
      "assets/img/hero section/partenaires/2.jpg",
      "assets/img/hero section/partenaires/3.jpg"
    ],
    "soumettre-projet.html": [
      "assets/img/hero section/soumettre-projet/1.jpg",
      "assets/img/hero section/soumettre-projet/2.jpg",
      "assets/img/hero section/soumettre-projet/3.jpg"
    ]
  };

  const page = window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  if (page !== "index.html" && HERO_IMAGES[page]) {
    const mainSection = document.querySelector("main section");
    if (mainSection) {
      const staticImg = page === "soumettre-projet.html"
        ? mainSection.querySelector("img.shadow-card")
        : mainSection.querySelector("img");

      if (staticImg) {
        const images = HERO_IMAGES[page];

        // Create carousel wrapper
        const carouselWrap = document.createElement("div");
        carouselWrap.id = "carousel";
        carouselWrap.className = staticImg.className + " relative overflow-hidden bg-black z-0";
        if (staticImg.getAttribute("style")) {
          carouselWrap.setAttribute("style", staticImg.getAttribute("style"));
        }

        // Generate slides
        images.forEach((src, idx) => {
          const slide = document.createElement("div");
          slide.className = `slide absolute inset-0 transition-opacity duration-700 ${idx === 0 ? "is-active opacity-100" : "opacity-0"}`;

          const img = document.createElement("img");
          img.src = src;
          img.alt = staticImg.alt || "Hero Section";
          img.className = "h-full w-full object-cover object-center";
          img.style.objectPosition = "center center";

          slide.appendChild(img);
          carouselWrap.appendChild(slide);
        });

        // Add progress bar
        const progressBg = document.createElement("div");
        progressBg.className = "absolute bottom-0 left-0 h-1 w-full bg-white/25 z-10";
        const progressBar = document.createElement("div");
        progressBar.className = "carousel-progress h-full bg-danger";
        progressBg.appendChild(progressBar);
        carouselWrap.appendChild(progressBg);

        // Add prev/next buttons
        const prevBtn = document.createElement("button");
        prevBtn.id = "prevSlide";
        prevBtn.className = "absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/30 bg-primary text-3xl text-white shadow-card md:flex z-10";
        prevBtn.type = "button";
        prevBtn.setAttribute("aria-label", "Précédent");

        const nextBtn = document.createElement("button");
        nextBtn.id = "nextSlide";
        nextBtn.className = "absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/30 bg-primary text-3xl text-white shadow-card md:flex z-10";
        nextBtn.type = "button";
        nextBtn.setAttribute("aria-label", "Suivant");

        carouselWrap.appendChild(prevBtn);
        carouselWrap.appendChild(nextBtn);

        // Add dots indicators
        const dotsContainer = document.createElement("div");
        dotsContainer.className = "absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-10";
        images.forEach((_, idx) => {
          const dot = document.createElement("button");
          dot.className = `dot h-5 w-5 rounded-md ${idx === 0 ? "bg-white" : "bg-white/50"}`;
          dot.type = "button";
          dot.setAttribute("aria-label", `Diapositive ${idx + 1}`);
          dotsContainer.appendChild(dot);
        });
        carouselWrap.appendChild(dotsContainer);

        // Ensure overlays & content inside section are in correct order/z-index
        const siblings = [...mainSection.children];
        siblings.forEach(sibling => {
          if (sibling !== staticImg && !sibling.classList.contains("z-20") && !sibling.classList.contains("z-10")) {
            sibling.style.zIndex = "20";
            if (sibling.style.position === "" || sibling.style.position === "static") {
              sibling.style.position = "relative";
            }
          }
        });

        // Replace the static image in DOM
        staticImg.parentNode.replaceChild(carouselWrap, staticImg);
      }
    }
  }

  // Universal Initialization Logic (runs on all pages, including index.html)
  const carousel = document.getElementById("carousel");
  if (carousel) {
    const slides = [...carousel.querySelectorAll(".slide")];
    const dots = [...carousel.querySelectorAll(".dot")];
    const prevBtn = document.getElementById("prevSlide") || carousel.querySelector("#prevSlide");
    const nextBtn = document.getElementById("nextSlide") || carousel.querySelector("#nextSlide");
    let progress = carousel.querySelector(".carousel-progress");
    let current = 0;

    if (slides.length > 0) {
      function showSlide(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.style.opacity = i === current ? "1" : "0";
          slide.classList.toggle("is-active", i === current);
        });

        const allDots = dots.length ? dots : [...document.querySelectorAll(".dot")];
        allDots.forEach((dot, i) => {
          dot.classList.toggle("bg-white", i === current);
          dot.classList.toggle("bg-white/50", i !== current);
        });

        // Restart progress bar animation
        if (progress) {
          const newBar = progress.cloneNode(true);
          progress.parentNode.replaceChild(newBar, progress);
          progress = newBar;
        }
      }

      if (prevBtn) prevBtn.addEventListener("click", () => showSlide(current - 1));
      if (nextBtn) nextBtn.addEventListener("click", () => showSlide(current + 1));

      const allDots = dots.length ? dots : [...document.querySelectorAll(".dot")];
      allDots.forEach((dot, i) => {
        dot.addEventListener("click", () => showSlide(i));
      });

      setInterval(() => {
        showSlide(current + 1);
      }, 6000);
    }
  }

  // Centering Hero text overlays and images dynamically
  const centerHeroElements = () => {
    // 1. Center all slide images
    const allSlideImages = document.querySelectorAll("#carousel img, .slide img");
    allSlideImages.forEach((img) => {
      img.classList.add("object-center");
      img.style.objectPosition = "center center";
    });

    // 2. Center writings (overlay boxes) in hero sections
    const heroH1 = document.querySelector("main section h1");
    if (heroH1) {
      const overlay = heroH1.closest("div.absolute");
      if (overlay) {
        // Inject dynamic centered keyframe definition to override native CSS stylesheet animations
        const customStyle = document.createElement("style");
        customStyle.innerHTML = `
          @keyframes heroRise {
            from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)) scale(.98); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `;
        document.head.appendChild(customStyle);

        overlay.style.position = "absolute";
        overlay.style.bottom = "auto";
        overlay.style.top = "50%";
        overlay.style.left = "50%";
        overlay.style.transform = "translate(-50%, -50%)";
        overlay.style.margin = "0";
        overlay.style.width = "90%";
        overlay.style.maxWidth = "850px";
        overlay.style.textAlign = "center";
      }
    }
  };

  // Run the centering function
  centerHeroElements();
})();
