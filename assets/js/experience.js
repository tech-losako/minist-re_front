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

  const topButton = document.createElement("button");
  topButton.className = "back-to-top fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-2xl font-extrabold text-white shadow-card";
  topButton.type = "button";
  topButton.setAttribute("aria-label", "Retour en haut");
  topButton.textContent = "↑";
  document.body.appendChild(topButton);
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    topButton.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });
})();
