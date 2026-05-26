(function () {
  const nav = document.querySelector("header nav");
  if (!nav) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const activeClass = "text-primary";
  const normalClass = "hover:text-primary";
  const isActive = (pages) => pages.includes(currentPage) ? activeClass : normalClass;

  nav.innerHTML = `
    <div class="mx-auto flex max-w-7xl items-center px-6 py-4">
      <a href="index.html" class="flex w-full max-w-[430px] items-center">
        <img src="assets/img/LOGO 2.jpeg" alt="Ministere provincial de la Jeunesse, Sports & Loisirs, Culture & Arts" class="h-16 w-auto object-contain md:h-20">
      </a>
      <button id="menuBtn" class="ml-auto rounded-md p-2 text-heading lg:hidden" aria-label="Ouvrir le menu" type="button">
        <span class="block h-0.5 w-7 bg-heading"></span>
        <span class="mt-1.5 block h-0.5 w-7 bg-heading"></span>
        <span class="mt-1.5 block h-0.5 w-7 bg-heading"></span>
      </button>
      <div id="mainMenu" class="fixed inset-y-0 left-0 hidden w-80 bg-[#1f2733] p-7 text-white shadow-2xl lg:static lg:ml-auto lg:block lg:w-auto lg:bg-transparent lg:p-0 lg:text-heading lg:shadow-none">
        <div class="mb-8 flex items-center justify-between lg:hidden">
          <h3 class="text-2xl font-extrabold">Ministere</h3>
          <button id="closeMenu" class="text-3xl leading-none" aria-label="Fermer le menu" type="button">&times;</button>
        </div>
        <ul class="flex flex-col gap-2 text-[14px] font-extrabold lg:flex-row lg:items-center lg:gap-4">
          <li><a class="block rounded-md px-2 py-2 ${isActive(["index.html"])}" href="index.html">Accueil</a></li>
          <li class="relative">
            <div class="flex items-center justify-between gap-1 rounded-md px-2 py-2">
              <a class="${isActive(["le-ministere.html"])}" href="le-ministere.html">Le Ministere</a>
              <button class="dropdown-toggle rounded px-1 text-lg leading-none ${isActive(["le-ministere.html"])}" type="button" aria-expanded="false" aria-label="Ouvrir Le Ministere"></button>
            </div>
            <ul class="dropdown-menu hidden rounded-md bg-white py-2 text-heading shadow-card lg:absolute lg:left-0 lg:top-full lg:z-50 lg:min-w-64">
              <li><a class="block px-4 py-2 hover:text-primary" href="le-ministere.html#historique">Historique</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="le-ministere.html#missions">Vision & missions</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="le-ministere.html#cabinet">Cabinet du Ministre</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="le-ministere.html#organigramme">Organigramme</a></li>
            </ul>
          </li>
          <li class="relative">
            <div class="flex items-center justify-between gap-1 rounded-md px-2 py-2">
              <a class="${isActive(["jeunesse.html"])}" href="jeunesse.html">Jeunesse</a>
              <button class="dropdown-toggle rounded px-1 text-lg leading-none ${isActive(["jeunesse.html"])}" type="button" aria-expanded="false" aria-label="Ouvrir Jeunesse"></button>
            </div>
            <ul class="dropdown-menu hidden rounded-md bg-white py-2 text-heading shadow-card lg:absolute lg:left-0 lg:top-full lg:z-50 lg:min-w-64">
              <li><a class="block px-4 py-2 hover:text-primary" href="jeunesse.html#programmes">Programmes jeunesse</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="jeunesse.html#entrepreneuriat">Entrepreneuriat</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="jeunesse.html#formation">Formation</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="jeunesse.html#appels">Appels a projets</a></li>
            </ul>
          </li>
          <li><a class="block rounded-md px-2 py-2 ${isActive(["sports-loisirs.html"])}" href="sports-loisirs.html">Sports</a></li>
          <li><a class="block rounded-md px-2 py-2 ${isActive(["culture-arts.html"])}" href="culture-arts.html">Culture</a></li>
          <li class="relative">
            <div class="flex items-center justify-between gap-1 rounded-md px-2 py-2">
              <a class="${isActive(["actualites.html", "medias.html", "legals.html", "contact.html"])}" href="actualites.html">Plus</a>
              <button class="dropdown-toggle rounded px-1 text-lg leading-none ${isActive(["actualites.html", "medias.html", "legals.html", "contact.html"])}" type="button" aria-expanded="false" aria-label="Ouvrir Plus"></button>
            </div>
            <ul class="dropdown-menu hidden rounded-md bg-white py-2 text-heading shadow-card lg:absolute lg:right-0 lg:top-full lg:z-50 lg:min-w-56">
              <li><a class="block px-4 py-2 hover:text-primary" href="actualites.html">Actualites</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="medias.html">Medias</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="legals.html">Legals</a></li>
              <li><a class="block px-4 py-2 hover:text-primary" href="contact.html">Contact</a></li>
            </ul>
          </li>
        </ul>
        <a href="https://registration.minprov-jeslca.cd" target="_self" rel="noopener" class="mt-6 block w-full rounded-[10px] bg-primary px-5 py-3 text-center text-sm font-extrabold text-white shadow-card lg:hidden">Register</a>
      </div>
      <a href="https://registration.minprov-jeslca.cd" target="_self" rel="noopener" class="ml-5 hidden rounded-[10px] bg-primary px-5 py-2.5 text-sm font-extrabold text-white shadow-card md:inline-flex">Register</a>
    </div>
    <div class="absolute bottom-0 left-0 flex h-[5px] w-full">
      <span class="flex-1 bg-[#159ada]"></span>
      <span class="flex-1 bg-[#fbef00]"></span>
      <span class="flex-1 bg-[#e51b22]"></span>
    </div>
  `;

  const menu = document.getElementById("mainMenu");
  const menuButton = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const dropdownToggles = menu.querySelectorAll(".dropdown-toggle");

  const closeDropdowns = (except) => {
    menu.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
      if (dropdown !== except) dropdown.classList.add("hidden");
    });
    dropdownToggles.forEach((button) => {
      const dropdown = button.closest("li").querySelector(".dropdown-menu");
      if (dropdown !== except) button.setAttribute("aria-expanded", "false");
    });
  };

  menuButton.addEventListener("click", () => menu.classList.remove("hidden"));
  closeMenu.addEventListener("click", () => menu.classList.add("hidden"));

  dropdownToggles.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const dropdown = button.closest("li").querySelector(".dropdown-menu");
      const willOpen = dropdown.classList.contains("hidden");
      closeDropdowns(dropdown);
      dropdown.classList.toggle("hidden", !willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) menu.classList.add("hidden");
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) closeDropdowns();
  });
})();
