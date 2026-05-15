(function () {
  const DATA = window.MEDICALL_DATA;
  const app = document.getElementById("app");
  const store = {
    shortlist: "medicall_shortlist",
    compare: "medicall_compare",
  };
  const ui = { mobileOpen: false, megaOpen: false };

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function loadSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (error) {
      return new Set();
    }
  }

  function saveSet(key, set) {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  }

  function shortlist() {
    return loadSet(store.shortlist);
  }

  function compare() {
    return loadSet(store.compare);
  }

  function route() {
    const filename = window.location.pathname.split("/").pop() || "index.html";
    const pageMap = {
      "": "/",
      "index.html": "/",
      "search.html": "/search",
      "product.html": `/product/${new URLSearchParams(window.location.search).get("id") || ""}`,
      "vendor.html": `/vendor/${new URLSearchParams(window.location.search).get("id") || ""}`,
      "compare.html": "/compare",
      "profile.html": "/profile",
      "exhibitor.html": "/exhibitor",
      "knowledge-hub.html": "/knowledge-hub",
      "article.html": `/article/${new URLSearchParams(window.location.search).get("id") || ""}`,
      "about.html": "/about",
      "faq.html": "/faq",
    };
    return {
      path: pageMap[filename] || "/",
      params: new URLSearchParams(window.location.search),
    };
  }

  function go(path) {
    ui.mobileOpen = false;
    ui.megaOpen = false;
    window.location.href = link(path);
  }

  function link(path) {
    const [pathPart, queryPart = ""] = path.split("?");
    const query = queryPart ? `?${queryPart}` : "";
    if (pathPart === "/" || pathPart === "") return `index.html${query}`;
    if (pathPart === "/search") return `search.html${query}`;
    if (pathPart === "/compare") return `compare.html${query}`;
    if (pathPart === "/profile") return `profile.html${query}`;
    if (pathPart === "/exhibitor") return `exhibitor.html${query}`;
    if (pathPart === "/knowledge-hub") return `knowledge-hub.html${query}`;
    if (pathPart === "/about") return `about.html${query}`;
    if (pathPart === "/faq") return `faq.html${query}`;
    if (pathPart.startsWith("/product/")) {
      const id = encodeURIComponent(pathPart.split("/")[2] || "");
      return `product.html?id=${id}${queryPart ? `&${queryPart}` : ""}`;
    }
    if (pathPart.startsWith("/vendor/")) {
      const id = encodeURIComponent(pathPart.split("/")[2] || "");
      return `vendor.html?id=${id}${queryPart ? `&${queryPart}` : ""}`;
    }
    if (pathPart.startsWith("/article/")) {
      const id = encodeURIComponent(pathPart.split("/")[2] || "");
      return `article.html?id=${id}${queryPart ? `&${queryPart}` : ""}`;
    }
    return `index.html${query}`;
  }

  function productById(id) {
    return DATA.products.find((item) => item.id === id);
  }

  function vendorById(id) {
    return DATA.vendors.find((item) => item.id === id);
  }

  function articleById(id) {
    return DATA.articles.find((item) => item.id === id);
  }

  function ratingStars(rating) {
    const full = Math.round(Number(rating) || 0);
    return `<span class="star">${"&#9733;".repeat(Math.min(5, full))}</span><span class="text-muted-app">${"&#9733;".repeat(Math.max(0, 5 - full))}</span>`;
  }

  function icon(name, cls = "") {
    const base = `class="${esc(cls)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
    const paths = {
      search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4.2-4.2"></path>',
      menu: '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',
      heart: '<path d="M20.8 4.6c-1.8-1.8-4.8-1.8-6.6 0L12 6.8 9.8 4.6C8 2.8 5 2.8 3.2 4.6c-1.9 1.9-1.9 5 0 6.9L12 20l8.8-8.5c1.9-1.9 1.9-5 0-6.9z"></path>',
      compare: '<path d="M8 7h12"></path><path d="m17 4 3 3-3 3"></path><path d="M16 17H4"></path><path d="m7 14-3 3 3 3"></path>',
      chevron: '<path d="m6 9 6 6 6-6"></path>',
      arrow: '<path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path>',
      check: '<path d="M20 6 9 17l-5-5"></path>',
      x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
      activity: '<path d="M22 12h-4l-3 8-6-16-3 8H2"></path>',
      stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"></path><path d="M10 14v3a4 4 0 0 0 8 0v-2"></path><circle cx="18" cy="13" r="2"></circle>',
      siren: '<path d="M7 18h10"></path><path d="M7 14a5 5 0 0 1 10 0v4H7z"></path><path d="M12 2v2"></path><path d="m4 5 1.5 1.5"></path><path d="m20 5-1.5 1.5"></path>',
      scan: '<path d="M4 7V5a1 1 0 0 1 1-1h2"></path><path d="M17 4h2a1 1 0 0 1 1 1v2"></path><path d="M20 17v2a1 1 0 0 1-1 1h-2"></path><path d="M7 20H5a1 1 0 0 1-1-1v-2"></path><path d="M7 12h10"></path>',
      microscope: '<path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 0 0 7-7"></path><path d="m9 14 6-6"></path><path d="m7 12 5 5"></path><path d="m12 3 5 5"></path>',
      baby: '<circle cx="12" cy="10" r="5"></circle><path d="M8 14v2a4 4 0 0 0 8 0v-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path>',
      heartIcon: '<path d="M20.8 4.6c-1.8-1.8-4.8-1.8-6.6 0L12 6.8 9.8 4.6C8 2.8 5 2.8 3.2 4.6c-1.9 1.9-1.9 5 0 6.9L12 20l8.8-8.5c1.9-1.9 1.9-5 0-6.9z"></path>',
      bone: '<path d="M17 3a3 3 0 0 1 3 3 3 3 0 0 1-3 3L9 17a3 3 0 1 1-4-4l8-8a3 3 0 0 1 4-2z"></path>',
      brain: '<path d="M9 3a4 4 0 0 0-4 4v3a4 4 0 0 0 4 4"></path><path d="M15 3a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4"></path><path d="M9 14v7"></path><path d="M15 14v7"></path><path d="M9 7h6"></path>',
      pill: '<path d="m10.5 20.5 10-10a5 5 0 0 0-7-7l-10 10a5 5 0 0 0 7 7z"></path><path d="m8.5 8.5 7 7"></path>',
      scope: '<path d="M6 4h6v5H6z"></path><path d="M9 9v11"></path><path d="M5 20h8"></path><path d="M15 7h4v7a4 4 0 0 1-4 4"></path>',
      eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle>',
      bed: '<path d="M3 7v11"></path><path d="M21 12v6"></path><path d="M3 14h18"></path><path d="M7 11h4"></path><path d="M7 7h10a4 4 0 0 1 4 4v1"></path>',
      tool: '<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L3 18v3h3l6.1-6.1a4 4 0 0 0 5.6-5.6z"></path>',
      chair: '<path d="M7 10h10v6H7z"></path><path d="M9 16v5"></path><path d="M15 16v5"></path><path d="M8 10V5a4 4 0 0 1 8 0v5"></path>',
      box: '<path d="M21 8 12 3 3 8l9 5 9-5z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path>',
      building: '<path d="M4 21V5a2 2 0 0 1 2-2h8v18"></path><path d="M14 8h6v13"></path><path d="M8 7h2"></path><path d="M8 11h2"></path><path d="M8 15h2"></path>',
      monitor: '<rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8"></path><path d="M12 16v4"></path>',
      grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect>',
    };
    const resolved = paths[name] || paths.grid;
    return `<svg ${base}>${resolved}</svg>`;
  }

  function nav() {
    const shortlistCount = shortlist().size;
    const compareCount = compare().size;
    const grouped = DATA.categories.reduce((acc, cat) => {
      acc[cat.group] = acc[cat.group] || [];
      acc[cat.group].push(cat);
      return acc;
    }, {});
    const groups = Object.entries(grouped).map(([group, cats]) => `
      <div class="col-lg-3">
        <h3 class="mega-title">${esc(group)}</h3>
        <div class="d-grid gap-2">
          ${cats.map((cat) => `<a href="${link(`/search?category=${encodeURIComponent(cat.name)}`)}" class="small fw-semibold">${esc(cat.name)}</a>`).join("")}
        </div>
      </div>
    `).join("");

    return `
      <nav class="nav-shell">
        <div class="container-narrow">
          <div class="d-flex align-items-center justify-content-between gap-3 py-3">
            <a href="${link("/")}" class="nav-logo d-flex align-items-center gap-2" aria-label="Medicall home">
              <img src="assets/img/medicall-logo.png" alt="Medicall" />
              <span>Medi<span class="text-brand">call</span></span>
            </a>
            <form class="nav-search flex-grow-1 position-relative" data-form="global-search">
              <span class="search-icon">${icon("search", "w-20 h-20")}</span>
              <input class="form-control" name="q" type="search" placeholder="Search products, brands, or categories..." />
              <button class="btn btn-brand" type="submit">Search</button>
            </form>
            <div class="desktop-links d-none d-lg-flex align-items-center gap-3">
              <a href="${link("/search?expo=Chennai%202026")}" class="nav-link-app text-brand">Chennai 2026</a>
              <button class="nav-link-app d-inline-flex align-items-center gap-1" data-action="toggle-mega">Categories ${icon("chevron", "width-14")}</button>
              <a href="${link("/knowledge-hub")}" class="nav-link-app">K-Hub</a>
              <a href="${link("/about")}" class="nav-link-app">About</a>
              <a href="${link("/faq")}" class="nav-link-app">FAQ</a>
            </div>
            <div class="d-flex align-items-center gap-1">
              <button class="icon-button d-md-none" data-action="toggle-mobile" aria-label="Search and menu">${icon("menu", "width-22")}</button>
              <a href="${link("/profile?tab=shortlist")}" class="icon-button position-relative" title="Shortlist">
                ${icon("heart", "width-18")}
                ${shortlistCount ? `<span class="badge-count">${shortlistCount}</span>` : ""}
              </a>
              <a href="${link("/compare")}" class="icon-button position-relative" title="Compare">
                ${icon("compare", "width-18")}
                ${compareCount ? `<span class="badge-count">${compareCount}</span>` : ""}
              </a>
              <a href="${link("/exhibitor")}" class="btn btn-sm btn-outline-app d-none d-lg-inline-flex">Exhibitor Login</a>
              <a href="${link("/profile")}" class="avatar-pill">AR</a>
            </div>
          </div>
        </div>
        <div class="mega-menu ${ui.megaOpen ? "open" : ""}">
          <div class="container-narrow py-4">
            <div class="row g-4">${groups}</div>
            <div class="border-top mt-4 pt-3">
              <a href="${link("/search")}" class="fw-bold text-brand">View all categories ${icon("arrow", "width-16")}</a>
            </div>
          </div>
        </div>
        <div class="mobile-drawer ${ui.mobileOpen ? "open" : ""}">
          <div class="container-narrow py-3">
            <form class="position-relative mb-3" data-form="global-search">
              <span class="search-icon position-absolute" style="left:1rem;top:50%;transform:translateY(-50%);color:var(--muted)">${icon("search", "width-18")}</span>
              <input class="form-control rounded-pill ps-5" name="q" type="search" placeholder="Search products or exhibitors..." />
            </form>
            <div class="d-grid gap-2">
              <a href="${link("/search?expo=Chennai%202026")}" class="fw-bold text-brand">Medicall Chennai 2026</a>
              <a href="${link("/search")}" class="fw-semibold">Browse Products</a>
              <a href="${link("/search?tab=exhibitors")}" class="fw-semibold">Browse Exhibitors</a>
              <a href="${link("/knowledge-hub")}" class="fw-semibold">Knowledge Hub</a>
              <a href="${link("/about")}" class="fw-semibold">About Us</a>
              <a href="${link("/faq")}" class="fw-semibold">FAQ</a>
              <a href="${link("/exhibitor")}" class="fw-semibold text-brand">Exhibitor Login</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  function footer() {
    return `
      <footer class="footer section-pad">
        <div class="container-narrow">
          <div class="row g-4">
            <div class="col-lg-4">
              <a href="${link("/")}" class="nav-logo d-flex align-items-center gap-2 mb-3">
                <img src="assets/img/medicall-logo.png" alt="Medicall" />
                <span>Medi<span class="text-brand">call</span></span>
              </a>
              <p class="text-muted-app mb-0">India's largest medical expo discovery platform, built for hospitals, buyers, and verified exhibitors.</p>
            </div>
            <div class="col-sm-4 col-lg-2">
              <h3 class="h6 fw-bold">Explore</h3>
              <div class="d-grid gap-2 small">
                <a href="${link("/search")}">Products</a>
                <a href="${link("/search?tab=exhibitors")}">Exhibitors</a>
                <a href="${link("/knowledge-hub")}">Knowledge Hub</a>
              </div>
            </div>
            <div class="col-sm-4 col-lg-2">
              <h3 class="h6 fw-bold">Company</h3>
              <div class="d-grid gap-2 small">
                <a href="${link("/about")}">About</a>
                <a href="${link("/faq")}">FAQ</a>
                <a href="${link("/exhibitor")}">Exhibitor Login</a>
              </div>
            </div>
            <div class="col-sm-4 col-lg-4">
              <h3 class="h6 fw-bold">Upcoming</h3>
              <p class="small text-muted-app mb-2">Medicall Chennai 2026</p>
              <p class="small mb-0">Mar 13-15, 2026 at Chennai Trade Centre.</p>
            </div>
          </div>
        </div>
      </footer>
      <button class="help-button" data-action="open-help" aria-label="Help">${icon("heart", "width-22")}</button>
    `;
  }

  function sectionHeader(title, subtitle = "", dot = "orange", right = "") {
    return `
      <div class="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
        <div>
          <div class="section-kicker mb-0">
            <span class="dot ${dot === "yellow" ? "yellow" : ""}"></span>
            <h2>${esc(title)}</h2>
          </div>
          ${subtitle ? `<p class="section-subtitle ms-md-4 ps-md-3 mb-0">${esc(subtitle)}</p>` : ""}
        </div>
        ${right}
      </div>
    `;
  }

  function productCard(product, compact = false) {
    const sl = shortlist();
    const cmp = compare();
    const isShortlisted = sl.has(product.id);
    const isCompared = cmp.has(product.id);
    return `
      <article class="product-card app-card app-card-hover ${compact ? "compact" : ""}">
        <a href="${link(`/product/${product.id}`)}" class="product-visual" aria-label="${esc(product.name)}">
          ${icon("building")}
        </a>
        <div class="floating-actions">
          <button class="mini-action ${isShortlisted ? "active" : ""}" data-action="toggle-shortlist" data-id="${esc(product.id)}" title="Shortlist">${icon("heart", "width-16")}</button>
          <button class="mini-action ${isCompared ? "compare-active" : ""}" data-action="toggle-compare" data-id="${esc(product.id)}" title="Compare">${icon("compare", "width-16")}</button>
        </div>
        <div class="p-3 p-sm-4 d-flex flex-column flex-grow-1">
          <div class="d-flex justify-content-between gap-2 align-items-start mb-2">
            <span class="tag-soft">${esc(product.subCategory)}</span>
            ${product.badge ? `<span class="${product.badge === "Made in India" ? "tag-yellow" : "tag-brand"}">${esc(product.badge)}</span>` : ""}
          </div>
          <h3 class="h6 fw-bold mb-1"><a href="${link(`/product/${product.id}`)}">${esc(product.name)}</a></h3>
          <div class="d-flex justify-content-between gap-2 small mb-2">
            <a href="${link(`/vendor/${product.vendorId}`)}" class="text-muted-app">by ${esc(product.vendor)}</a>
            <span>${ratingStars(product.rating)} ${esc(product.rating)}</span>
          </div>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="tag-soft">${esc(product.hall)}</span>
            <span class="tag-yellow">Stall ${esc(product.stall)}</span>
          </div>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-sm flex-fill ${isCompared ? "btn-brand" : "btn-outline-app"}" data-action="toggle-compare" data-id="${esc(product.id)}">${isCompared ? "Added" : "Compare"}</button>
            <a class="btn btn-sm btn-dark-pill flex-fill text-center py-2" href="${link(`/product/${product.id}`)}">View</a>
          </div>
        </div>
      </article>
    `;
  }

  function vendorCard(vendor) {
    return `
      <a href="${link(`/vendor/${vendor.id}`)}" class="app-card app-card-hover p-4 d-block h-100">
        <div class="d-flex gap-3 align-items-start">
          <div class="vendor-avatar">${esc(vendor.name[0])}</div>
          <div class="min-w-0">
            <h3 class="h6 fw-bold mb-1 text-truncate">${esc(vendor.name)}</h3>
            <p class="small text-muted-app mb-1">${esc(vendor.type)}</p>
            <p class="small text-muted-app mb-2">${esc(vendor.location)} | since ${esc(vendor.since)}</p>
            <div class="d-flex flex-wrap gap-2">
              <span class="tag-soft">${esc(vendor.hall)}</span>
              <span class="tag-yellow">Stall ${esc(vendor.stall)}</span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  function brandMarquee(items) {
    const loop = [...items, ...items];
    return `
      <div class="brand-marquee">
        <div class="brand-track">
          ${loop.map((brand) => `
            <a class="brand-pill" href="${link(`/search?q=${encodeURIComponent(brand)}`)}">
              <span class="brand-initial">${esc(brand[0])}</span>
              <span>${esc(brand)}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  function homePage() {
    const newProducts = DATA.products.filter((item) => item.expo === "Chennai 2026").slice(0, 8);
    const categoryCards = DATA.categories.slice(0, 14).map((cat) => `
      <a href="${link(`/search?category=${encodeURIComponent(cat.name)}`)}" class="category-card app-card app-card-hover d-block">
        <span class="category-icon" style="background:${esc(cat.bg)};color:${esc(cat.color)}">${icon(cat.icon)}</span>
        <h3 class="h6 fw-bold mb-2">${esc(cat.name)}</h3>
        <span class="small text-muted-app">Browse ${esc(cat.subs.length)} groups</span>
      </a>
    `).join("");
    return `
      <div class="announce">
        <div class="container-narrow py-2 d-flex flex-wrap justify-content-center align-items-center gap-2 text-center">
          <span class="pill">UPCOMING</span>
          <span>Medicall Chennai 2026</span>
          <span class="opacity-75">Mar 13 | 14 | 15</span>
          <span class="opacity-75">Chennai Trade Centre</span>
          <a href="${link("/search?expo=Chennai%202026")}" class="text-white text-decoration-underline fw-bold">Browse Products</a>
          <a href="${link("/search?expo=Chennai%202026&tab=exhibitors")}" class="text-white text-decoration-underline fw-bold">Browse Exhibitors</a>
        </div>
      </div>
      <main>
        <section class="hero section-pad">
          <div class="container-narrow text-center">
            <h1>India's largest<br />medical expo <span class="online">now online.</span></h1>
            <p class="hero-subtitle">Find the right equipment for your hospital.</p>
            <form class="hero-search-panel" data-form="hero-search">
              <div class="row g-0 align-items-stretch">
                <div class="col-lg position-relative">
                  <span class="search-icon">${icon("search", "width-22")}</span>
                  <input class="form-control" name="q" placeholder="Search products, brands, or suppliers..." />
                </div>
                <div class="col-lg-3 border-start border-lg">
                  <select class="form-select" name="category">
                    <option value="">All categories</option>
                    ${DATA.categories.map((cat) => `<option value="${esc(cat.name)}">${esc(cat.name)}</option>`).join("")}
                  </select>
                </div>
                <div class="col-lg-2 border-start border-lg">
                  <select class="form-select" name="expo">
                    <option value="">Any edition</option>
                    ${DATA.expoEditions.map((expo) => `<option value="${esc(expo.name)}">${esc(expo.name)}</option>`).join("")}
                  </select>
                </div>
                <div class="col-lg-2">
                  <button class="btn btn-brand w-100 h-100 py-3" type="submit">${icon("search", "width-16")} Search</button>
                </div>
              </div>
            </form>
            <div class="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-4">
              <a href="${link("/search")}" class="btn-dark-pill">Browse all products ${icon("arrow", "width-17")}</a>
              <span class="dot" style="width:8px;height:8px"></span>
              <a href="${link("/search?tab=exhibitors")}" class="btn btn-outline-app px-4 py-2">Explore exhibitors</a>
            </div>
          </div>
        </section>
        <section class="scroll-stack pb-5">
          <div class="container-narrow">
            <div class="row g-4">
              ${[
                ["BEFORE THE SHOW", "Shortlist before you arrive", "Browse every exhibitor, save the ones you want to visit, and book meetings before you get there.", "#FFF6E2"],
                ["DURING THE SHOW", "Walk in with a plan", "Compare shortlisted exhibitors, attend your meetings, and make the most of every hour at the expo.", "#FFFBEF"],
                ["AFTER THE SHOW", "Stay connected after", "Send enquiries and revisit everyone you saved. Pick up conversations at your own pace.", "#FFEFD8"],
              ].map((card) => `
                <div class="col-lg-4">
                  <div class="stack-card h-100" style="background:${card[3]}">
                    <span class="tag">${esc(card[0])}</span>
                    <h3>${esc(card[1])}</h3>
                    <p class="text-muted-app mb-0">${esc(card[2])}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section-pad">
          <div class="container-narrow">
            ${sectionHeader("New at Medicall Chennai 2026", "Discover products from exhibitors at this year's edition", "orange", `<a href="${link("/search?expo=Chennai%202026")}" class="fw-bold text-brand">View all ${icon("arrow", "width-16")}</a>`)}
            <div class="horizontal-row">${newProducts.map((item) => productCard(item, true)).join("")}</div>
          </div>
        </section>
        <section class="section-pad bg-page">
          <div class="container-narrow">
            ${sectionHeader("Browse by category", "Find equipment across every specialty")}
            <div class="row g-3 g-md-4">
              ${categoryCards.split("</a>").filter(Boolean).map((markup) => `<div class="col-6 col-md-4 col-lg-3">${markup}</a></div>`).join("")}
            </div>
          </div>
        </section>
        <section class="section-pad">
          <div class="container-narrow mb-4">${sectionHeader("Explore top Indian brands", "", "yellow")}</div>
          ${brandMarquee(DATA.indianBrands)}
        </section>
        <section class="section-pad bg-page text-center">
          <div class="container-narrow">
            <h2 class="display-6 fw-medium">Medicall, always within your reach.</h2>
            <div class="display-1 fw-medium text-brand">24 / 7</div>
            <div class="d-flex flex-wrap justify-content-center gap-3 mt-4">
              ${["Medicall Verified Only", "Browse Past Editions Too", "Book Meetings, Not Just Inquiries"].map((text) => `<span class="chip active">${icon("check", "width-14")} ${esc(text)}</span>`).join("")}
            </div>
          </div>
        </section>
        <section class="trust-band section-pad">
          <div class="container-narrow">
            <div class="row g-4 text-center">
              ${[
                ["800+", "Verified suppliers"],
                ["20,000+", "Expo visitors annually"],
                ["20+", "Years running"],
                ["5", "Cities pan-India"],
              ].map((stat) => `<div class="col-6 col-md-3"><span class="stat-number">${esc(stat[0])}</span><span class="fw-semibold">${esc(stat[1])}</span></div>`).join("")}
            </div>
          </div>
        </section>
        <section class="section-pad">
          <div class="container-narrow mb-4">${sectionHeader("Explore international brands")}</div>
          ${brandMarquee(DATA.internationalBrands)}
        </section>
        <section class="section-pad bg-page">
          <div class="container-narrow">
            ${sectionHeader("Find exhibitors from every edition", "Browse all past and upcoming Medicall expos")}
            <div class="row g-4">
              ${DATA.expoEditions.map((expo) => `
                <div class="col-md-6 col-lg-4">
                  <article class="app-card app-card-hover p-4 h-100">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                      <span class="${expo.upcoming ? "tag-yellow" : "tag-soft"}">${expo.upcoming ? "UPCOMING" : "PAST"}</span>
                      <span class="small fw-bold text-muted-app">${esc(expo.exhibitors)} exhibitors</span>
                    </div>
                    <h3 class="h4 fw-medium">${esc(expo.name)}</h3>
                    <p class="fw-semibold mb-1">${esc(expo.date)}</p>
                    <p class="small text-muted-app">${esc(expo.venue)}</p>
                    <div class="d-flex flex-wrap gap-3 small fw-bold">
                      <a href="${link(`/search?expo=${encodeURIComponent(expo.name)}`)}" class="text-brand">Browse Products</a>
                      <a href="${link(`/search?expo=${encodeURIComponent(expo.name)}&tab=exhibitors`)}" class="text-brand">Browse Exhibitors</a>
                    </div>
                  </article>
                </div>
              `).join("")}
            </div>
          </div>
        </section>
        <section class="section-pad">
          <div class="container-narrow">
            ${sectionHeader("From the Knowledge Hub", "Buyer guides, stories, and industry trends", "yellow", `<a href="${link("/knowledge-hub")}" class="fw-bold text-brand">View all ${icon("arrow", "width-16")}</a>`)}
            <div class="row g-4">${DATA.articles.slice(0, 3).map(articleCard).join("")}</div>
          </div>
        </section>
      </main>
    `;
  }

  function articleCard(article) {
    return `
      <div class="col-md-4">
        <a href="${link(`/article/${article.id}`)}" class="app-card app-card-hover d-block h-100 overflow-hidden">
          <div class="article-cover">
            <span class="tag-brand">${esc(article.category)}</span>
          </div>
          <div class="p-4">
            <h3 class="h5 fw-bold">${esc(article.title)}</h3>
            <p class="small text-muted-app">${esc(article.excerpt)}</p>
            <p class="small text-muted-app mb-0">${esc(article.author)} | ${esc(article.date)}</p>
          </div>
        </a>
      </div>
    `;
  }

  function selectedList(params, key) {
    return params.getAll(key).filter(Boolean);
  }

  function productMatches(product, filters) {
    const q = filters.q.toLowerCase();
    const queryOk = !q || [product.name, product.vendor, product.category, product.subCategory].some((text) => text.toLowerCase().includes(q));
    const categoryOk = !filters.category || product.category === filters.category;
    const expoOk = filters.expos.length === 0 || filters.expos.includes(product.expo);
    const hallOk = filters.halls.length === 0 || filters.halls.includes(product.hall);
    const stateOk = filters.states.length === 0 || product.states.includes("Pan India") || filters.states.some((state) => product.states.includes(state));
    return queryOk && categoryOk && expoOk && hallOk && stateOk;
  }

  function vendorMatches(vendor, filters) {
    const q = filters.q.toLowerCase();
    const queryOk = !q || [vendor.name, vendor.type, vendor.location].some((text) => text.toLowerCase().includes(q));
    const categoryOk = !filters.category || DATA.products.some((product) => product.vendorId === vendor.id && product.category === filters.category);
    const expoOk = filters.expos.length === 0 || filters.expos.some((expo) => vendor.editions.includes(expo));
    const hallOk = filters.halls.length === 0 || filters.halls.includes(vendor.hall);
    const stateOk = filters.states.length === 0 || vendor.states.includes("Pan India") || filters.states.some((state) => vendor.states.includes(state));
    const typeOk = filters.types.length === 0 || filters.types.includes(vendor.type);
    const locationOk = filters.locations.length === 0 || filters.locations.includes(vendor.location);
    return queryOk && categoryOk && expoOk && hallOk && stateOk && typeOk && locationOk;
  }

  function searchPage(params) {
    const filters = {
      q: params.get("q") || "",
      category: params.get("category") || "",
      tab: params.get("tab") === "exhibitors" ? "exhibitors" : "products",
      page: Number(params.get("page") || "1"),
      expos: selectedList(params, "expo"),
      halls: selectedList(params, "hall"),
      states: selectedList(params, "state"),
      types: selectedList(params, "type"),
      locations: selectedList(params, "location"),
    };
    const products = DATA.products.filter((item) => productMatches(item, filters));
    const vendors = DATA.vendors.filter((item) => vendorMatches(item, filters));
    const activeTotal = filters.tab === "products" ? products.length : vendors.length;
    const pageSize = filters.tab === "products" ? 9 : 9;
    const totalPages = Math.max(1, Math.ceil(activeTotal / pageSize));
    filters.page = Math.min(Math.max(1, filters.page), totalPages);
    const pagedProducts = products.slice((filters.page - 1) * pageSize, filters.page * pageSize);
    const pagedVendors = vendors.slice((filters.page - 1) * pageSize, filters.page * pageSize);
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <div class="mb-4">
            <h1 class="display-6 fw-bold mb-1">${filters.q ? `Results for <span class="text-brand">"${esc(filters.q)}"</span>` : filters.category ? esc(filters.category) : "All products"}</h1>
            <p class="text-muted-app mb-0">${filters.tab === "products" ? `${products.length} products across Medicall editions` : `${vendors.length} exhibitors`}</p>
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div class="result-tabs">
              <button class="btn ${filters.tab === "products" ? "active" : ""}" data-action="set-tab" data-tab="products">Products <span class="opacity-75">${products.length}</span></button>
              <button class="btn ${filters.tab === "exhibitors" ? "active" : ""}" data-action="set-tab" data-tab="exhibitors">Exhibitors <span class="opacity-75">${vendors.length}</span></button>
            </div>
            <button class="btn btn-sm btn-outline-app" data-action="clear-filters">Clear filters</button>
          </div>
          <div class="chip-row mb-4">${activeChips(filters)}</div>
          <div class="row g-4">
            <aside class="col-lg-3">${filterSidebar(filters)}</aside>
            <section class="col-lg-9">
              ${filters.tab === "products"
                ? `<div class="row g-3 g-md-4">${pagedProducts.length ? pagedProducts.map((item) => `<div class="col-6 col-xl-4">${productCard(item)}</div>`).join("") : `<div class="col-12"><div class="empty-state">No products match your filters.</div></div>`}</div>`
                : `<div class="row g-3 g-md-4">${pagedVendors.length ? pagedVendors.map((item) => `<div class="col-md-6 col-xl-4">${vendorCard(item)}</div>`).join("") : `<div class="col-12"><div class="empty-state">No exhibitors match your filters.</div></div>`}</div>`}
              ${pagination(filters.page, totalPages)}
            </section>
          </div>
        </div>
      </main>
    `;
  }

  function activeChips(filters) {
    const chips = [];
    if (filters.category) chips.push(["category", filters.category]);
    filters.expos.forEach((item) => chips.push(["expo", item]));
    filters.halls.forEach((item) => chips.push(["hall", item]));
    filters.states.forEach((item) => chips.push(["state", item]));
    filters.types.forEach((item) => chips.push(["type", item]));
    filters.locations.forEach((item) => chips.push(["location", item]));
    if (filters.q) chips.push(["q", filters.q]);
    return chips.length
      ? chips.map(([key, value]) => `<button class="chip active" data-action="remove-filter" data-filter="${esc(key)}" data-value="${esc(value)}">${esc(value)} ${icon("x", "width-12")}</button>`).join("")
      : `<span class="chip">No filters selected</span>`;
  }

  function filterSidebar(filters) {
    const group = (title, key, items, selected, multi = true) => `
      <div class="filter-group">
        <div class="filter-label">${esc(title)}</div>
        <div class="d-grid">
          ${items.map((item) => {
            const value = typeof item === "string" ? item : item.name;
            const checked = multi ? selected.includes(value) : selected === value;
            return `
              <label class="check-row">
                <input type="${multi ? "checkbox" : "radio"}" name="${esc(key)}" data-filter="${esc(key)}" data-multi="${multi ? "true" : "false"}" value="${esc(value)}" ${checked ? "checked" : ""} />
                <span>${esc(value)}</span>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
    return `
      <div class="filter-sidebar">
        ${group("Product Category", "category", DATA.categories, filters.category, false)}
        ${group("Expo Edition Participated", "expo", DATA.expoEditions.map((item) => item.name), filters.expos)}
        ${group("State Serviced", "state", DATA.states, filters.states)}
        ${group("Hall Number", "hall", DATA.halls, filters.halls)}
        ${filters.tab === "exhibitors" ? group("Nature of Business", "type", DATA.vendorTypes, filters.types) : ""}
        ${filters.tab === "exhibitors" ? group("Location", "location", DATA.locations, filters.locations) : ""}
      </div>
    `;
  }

  function pagination(current, total) {
    if (total <= 1) return "";
    const pages = Array.from({ length: total }, (_, index) => index + 1);
    return `
      <nav class="mt-4" aria-label="Results pages">
        <div class="d-flex flex-wrap gap-2">
          ${pages.map((page) => `<button class="btn btn-sm ${page === current ? "btn-brand" : "btn-outline-app"}" data-action="set-page" data-page="${page}">${page}</button>`).join("")}
        </div>
      </nav>
    `;
  }

  function productPage(id) {
    const product = productById(id);
    if (!product) return notFoundPage();
    const vendor = vendorById(product.vendorId);
    const related = DATA.products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <a href="${link("/search")}" class="small fw-bold text-brand mb-4 d-inline-flex">${icon("arrow", "width-16")} Back to search</a>
          <div class="row g-4 align-items-start">
            <div class="col-lg-5">
              ${productCard(product)}
            </div>
            <div class="col-lg-7">
              <div class="d-flex flex-wrap gap-2 mb-3">
                <span class="tag-soft">${esc(product.category)}</span>
                <span class="tag-yellow">${esc(product.origin)}</span>
                <span class="tag-soft">${esc(product.expo)}</span>
              </div>
              <h1 class="display-5 fw-bold">${esc(product.name)}</h1>
              <p class="lead text-muted-app">by <a class="text-brand fw-bold" href="${link(`/vendor/${vendor.id}`)}">${esc(vendor.name)}</a></p>
              <p class="mb-4">${esc(vendor.summary)}</p>
              <div class="row g-3 mb-4">
                ${product.specs.map(([key, value]) => `<div class="col-sm-6"><div class="metric-card"><span class="small text-muted-app">${esc(key)}</span><strong class="h6 mb-0">${esc(value)}</strong></div></div>`).join("")}
              </div>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <button class="btn btn-brand" data-action="open-inquiry" data-id="${esc(product.id)}">Send inquiry</button>
                <button class="btn btn-outline-app px-4" data-action="open-meeting" data-id="${esc(product.id)}">Book meeting</button>
                <button class="btn btn-outline-app px-4" data-action="toggle-shortlist" data-id="${esc(product.id)}">Shortlist</button>
                <button class="btn btn-outline-app px-4" data-action="toggle-compare" data-id="${esc(product.id)}">Compare</button>
              </div>
              <div class="app-card p-4">
                <h2 class="h5 fw-bold">Key features</h2>
                <div class="row g-2 mt-2">
                  ${product.features.map((feature) => `<div class="col-sm-6"><span class="chip active">${icon("check", "width-14")} ${esc(feature)}</span></div>`).join("")}
                </div>
              </div>
            </div>
          </div>
          <section class="mt-5">
            ${sectionHeader("Related products", `More options in ${product.category}`)}
            <div class="row g-3 g-md-4">${related.map((item) => `<div class="col-6 col-lg-3">${productCard(item)}</div>`).join("")}</div>
          </section>
        </div>
      </main>
    `;
  }

  function vendorPage(id) {
    const vendor = vendorById(id);
    if (!vendor) return notFoundPage();
    const products = DATA.products.filter((item) => item.vendorId === vendor.id);
    const reviews = DATA.reviews.filter((item) => item.vendorId === vendor.id);
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <section class="profile-hero p-4 p-lg-5 mb-5">
            <div class="row g-4 align-items-center">
              <div class="col-lg-8">
                <div class="d-flex gap-3 align-items-start">
                  <div class="vendor-avatar">${esc(vendor.name[0])}</div>
                  <div>
                    <span class="tag-soft mb-2">${esc(vendor.type)}</span>
                    <h1 class="display-5 fw-bold mb-2">${esc(vendor.name)}</h1>
                    <p class="text-muted-app mb-2">${esc(vendor.summary)}</p>
                    <div class="d-flex flex-wrap gap-2">
                      <span class="tag-yellow">${esc(vendor.hall)} | Stall ${esc(vendor.stall)}</span>
                      <span class="tag-soft">${esc(vendor.location)}</span>
                      <span class="tag-green">${esc(vendor.rating)} rated</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="app-card p-4">
                  <div class="d-grid gap-2">
                    <button class="btn btn-brand" data-action="open-inquiry" data-vendor="${esc(vendor.id)}">Send inquiry</button>
                    <button class="btn btn-outline-app" data-action="open-meeting" data-vendor="${esc(vendor.id)}">Book meeting</button>
                    <a class="btn btn-outline-app" href="${link(`/search?tab=products&q=${encodeURIComponent(vendor.name)}`)}">View products</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="row g-4 mb-5">
            ${[
              ["Member since", vendor.since],
              ["Employees", vendor.employees],
              ["Turnover", vendor.turnover],
              ["Editions", vendor.editions.length],
            ].map((item) => `<div class="col-6 col-lg-3"><div class="metric-card"><span class="small text-muted-app">${esc(item[0])}</span><strong>${esc(item[1])}</strong></div></div>`).join("")}
          </div>
          ${sectionHeader("Products from this exhibitor", `${products.length} Medicall listed products`)}
          <div class="row g-3 g-md-4 mb-5">${products.map((item) => `<div class="col-6 col-lg-3">${productCard(item)}</div>`).join("")}</div>
          ${sectionHeader("Buyer reviews", "Verified meeting and inquiry feedback", "yellow")}
          <div class="row g-4">${reviews.length ? reviews.map(reviewCard).join("") : `<div class="col-12"><div class="empty-state">No reviews yet for this exhibitor.</div></div>`}</div>
        </div>
      </main>
    `;
  }

  function reviewCard(review) {
    return `
      <div class="col-md-6">
        <article class="app-card p-4 h-100">
          <div class="mb-2">${ratingStars(review.rating)} <span class="fw-bold">${esc(review.rating)}.0</span></div>
          <h3 class="h6 fw-bold">${esc(review.title)}</h3>
          <p class="small text-muted-app">${esc(review.text)}</p>
          <p class="small fw-bold mb-0">${esc(review.name)} | ${esc(review.org)}</p>
        </article>
      </div>
    `;
  }

  function comparePage() {
    const ids = Array.from(compare());
    const products = ids.map(productById).filter(Boolean);
    if (!products.length) {
      return `<main class="section-pad"><div class="container-narrow"><div class="empty-state"><h1 class="h3 fw-bold">No products in compare</h1><p>Add products from search to compare specs side by side.</p><a class="btn btn-brand" href="${link("/search")}">Browse products</a></div></div></main>`;
    }
    const rows = ["vendor", "category", "subCategory", "priceRange", "expo", "hall", "stall", "origin"];
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <div class="d-flex justify-content-between align-items-end gap-3 mb-4">
            <div><h1 class="display-6 fw-bold">Compare products</h1><p class="text-muted-app mb-0">${products.length} selected products</p></div>
            <a class="btn btn-outline-app" href="${link("/search")}">Add more</a>
          </div>
          <div class="table-responsive app-card">
            <table class="table mb-0 align-middle">
              <thead><tr><th>Specification</th>${products.map((p) => `<th>${esc(p.name)} <button class="btn btn-sm btn-link text-danger" data-action="remove-compare" data-id="${esc(p.id)}">Remove</button></th>`).join("")}</tr></thead>
              <tbody>
                ${rows.map((row) => `<tr><th class="text-capitalize">${esc(row.replace(/([A-Z])/g, " $1"))}</th>${products.map((p) => `<td>${esc(p[row])}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    `;
  }

  function profilePage(params) {
    const tab = params.get("tab") || "shortlist";
    const shortlisted = Array.from(shortlist()).map(productById).filter(Boolean);
    const tabs = [
      ["shortlist", "Shortlisted"],
      ["meetings", "Meetings"],
      ["inquiries", "Inquiries"],
      ["pending", "Pending Reviews"],
      ["reviews", "My Reviews"],
    ];
    const body = {
      shortlist: shortlisted.length ? `<div class="row g-3 g-md-4">${shortlisted.map((p) => `<div class="col-6 col-lg-3">${productCard(p)}</div>`).join("")}</div>` : `<div class="empty-state">Your shortlist is empty.</div>`,
      meetings: staticList(["Mindray demo - Chennai 2026 - Confirmed", "BPL Medical ECG discussion - Pending", "Sudar Medicals furniture review - Completed"]),
      inquiries: staticList(["Quote requested for Multiparameter Monitor", "AMC clarification sent to Philips Healthcare", "Delivery timeline requested from Mednob"]),
      pending: staticList(["Review BPL Medical after ECG inquiry", "Review Sudar Medicals after furniture demo"]),
      reviews: DATA.reviews.slice(0, 2).map(reviewCard).join(""),
    }[tab] || "";
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <section class="profile-hero p-4 p-lg-5 mb-4">
            <span class="avatar-pill mb-3">AR</span>
            <h1 class="display-6 fw-bold">Dr Anita Rao</h1>
            <p class="text-muted-app mb-0">Procurement profile, meetings, inquiries, and saved exhibitors.</p>
          </section>
          <div class="chip-row mb-4">${tabs.map(([id, label]) => `<a class="chip ${tab === id ? "active" : ""}" href="${link(`/profile?tab=${id}`)}">${esc(label)}</a>`).join("")}</div>
          ${tab === "reviews" ? `<div class="row g-4">${body}</div>` : body}
        </div>
      </main>
    `;
  }

  function staticList(items) {
    return `<div class="app-card p-3">${items.map((item) => `<div class="d-flex align-items-center justify-content-between border-bottom py-3"><span>${esc(item)}</span><span class="tag-soft">Medicall</span></div>`).join("")}</div>`;
  }

  function exhibitorPage(params) {
    const tab = params.get("tab") || "dashboard";
    const tabs = ["dashboard", "products", "inquiries", "meetings", "reviews", "profile"];
    const vendor = DATA.vendors[0];
    const products = DATA.products.filter((item) => item.vendorId === vendor.id);
    const content = {
      dashboard: `
        <div class="row g-4 mb-4">
          ${[["Product views", "1,284"], ["Inquiries", "42"], ["Meetings", "16"], ["Rating", "4.8"]].map((m) => `<div class="col-6 col-lg-3"><div class="metric-card"><span class="small text-muted-app">${m[0]}</span><strong>${m[1]}</strong></div></div>`).join("")}
        </div>
        <div class="app-card p-4"><h2 class="h5 fw-bold">Upcoming activity</h2>${staticList(["Demo with City Diagnostics Pune", "Inquiry from Apollo Hospitals Chennai", "Review response pending"])}</div>
      `,
      products: `<div class="row g-3 g-md-4">${products.map((item) => `<div class="col-6 col-lg-4">${productCard(item)}</div>`).join("")}</div>`,
      inquiries: staticList(["Multiparameter Monitor quote request", "PACS integration details requested", "Ventilator AMC discussion"]),
      meetings: staticList(["Chennai 2026 buyer meeting - Mar 14", "Delhi 2025 follow-up call", "Hospital group demo request"]),
      reviews: `<div class="row g-4">${DATA.reviews.filter((r) => r.vendorId === vendor.id).map(reviewCard).join("")}</div>`,
      profile: `<div class="app-card p-4"><h2 class="h5 fw-bold">${esc(vendor.name)}</h2><p>${esc(vendor.summary)}</p><p class="mb-0 text-muted-app">${esc(vendor.hall)} | Stall ${esc(vendor.stall)} | ${esc(vendor.location)}</p></div>`,
    }[tab] || "";
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <section class="dashboard-hero p-4 p-lg-5 mb-4">
            <span class="tag-soft mb-2">Exhibitor workspace</span>
            <h1 class="display-6 fw-bold">${esc(vendor.name)} dashboard</h1>
            <p class="text-muted-app mb-0">Manage listed products, buyer inquiries, meetings, and reviews.</p>
          </section>
          <div class="chip-row mb-4">${tabs.map((id) => `<a class="chip ${tab === id ? "active" : ""}" href="${link(`/exhibitor?tab=${id}`)}">${esc(id[0].toUpperCase() + id.slice(1))}</a>`).join("")}</div>
          ${content}
        </div>
      </main>
    `;
  }

  function knowledgePage() {
    return `
      <main class="section-pad">
        <div class="container-narrow">
          ${sectionHeader("Knowledge Hub", "Buyer guides, exhibitor stories, and practical procurement notes", "yellow")}
          <div class="row g-4">${DATA.articles.map(articleCard).join("")}</div>
        </div>
      </main>
    `;
  }

  function articlePage(id) {
    const article = articleById(id);
    if (!article) return notFoundPage();
    return `
      <main class="section-pad">
        <article class="container-narrow" style="max-width: 850px">
          <a href="${link("/knowledge-hub")}" class="small fw-bold text-brand">Back to Knowledge Hub</a>
          <div class="article-cover my-4"><span class="tag-brand">${esc(article.category)}</span></div>
          <h1 class="display-5 fw-bold">${esc(article.title)}</h1>
          <p class="text-muted-app">${esc(article.author)} | ${esc(article.date)} | ${esc(article.readTime)}</p>
          <p class="lead">${esc(article.excerpt)}</p>
          <p>Medicall helps buyers move from open-ended expo browsing to a more structured procurement workflow. Shortlist the right exhibitors, compare equipment details, and use meetings to clarify service coverage before commercial negotiation.</p>
          <p>For hospital teams, the most useful buying conversations are specific: category fit, service response time, installation readiness, training, warranty, and the availability of spares in the buyer's region.</p>
          <a class="btn btn-brand" href="${link("/search")}">Start shortlisting</a>
        </article>
      </main>
    `;
  }

  function aboutPage() {
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <section class="profile-hero p-4 p-lg-5 mb-5">
            <span class="tag-soft mb-3">About Medicall</span>
            <h1 class="display-4 fw-bold">India's medical expo, online.</h1>
            <p class="lead text-muted-app mb-0">Medicall brings product discovery, exhibitor context, meetings, and post-show follow-up into one buyer-friendly platform.</p>
          </section>
          <div class="row g-4">
            ${[
              ["Verified discovery", "Browse Medicall exhibitors and products from current and past editions."],
              ["Expo-ready planning", "Shortlist, compare, and book meetings before arriving at the show."],
              ["After-show continuity", "Keep inquiries and conversations organized after the expo closes."],
            ].map((item) => `<div class="col-md-4"><div class="app-card p-4 h-100"><h2 class="h5 fw-bold">${esc(item[0])}</h2><p class="text-muted-app mb-0">${esc(item[1])}</p></div></div>`).join("")}
          </div>
        </div>
      </main>
    `;
  }

  function faqPage() {
    const faqs = [
      ["Is Medicall only for Chennai 2026?", "No. You can browse current and past editions, including Delhi, Chennai, Hyderabad, and Kolkata."],
      ["Can buyers compare products?", "Yes. Add products to compare and review category, vendor, hall, origin, and expo participation side by side."],
      ["Can I book exhibitor meetings?", "Yes. Use the product or vendor page to send an inquiry or request a meeting."],
      ["Are all companies verified?", "The interface is designed around Medicall verified exhibitors and expo participation records."],
    ];
    return `
      <main class="section-pad">
        <div class="container-narrow" style="max-width: 900px">
          ${sectionHeader("FAQ", "Common questions about the Medicall discovery platform")}
          <div class="accordion app-card overflow-hidden" id="faqAccordion">
            ${faqs.map((item, index) => `
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button ${index ? "collapsed" : ""}" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${index}">
                    ${esc(item[0])}
                  </button>
                </h2>
                <div id="faq-${index}" class="accordion-collapse collapse ${index ? "" : "show"}" data-bs-parent="#faqAccordion">
                  <div class="accordion-body text-muted-app">${esc(item[1])}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </main>
    `;
  }

  function notFoundPage() {
    return `
      <main class="section-pad">
        <div class="container-narrow">
          <div class="empty-state">
            <h1 class="h3 fw-bold">Page not found</h1>
            <p>The page you are looking for is not available in this static Medicall build.</p>
            <a class="btn btn-brand" href="${link("/")}">Go home</a>
          </div>
        </div>
      </main>
    `;
  }

  function applyParams(mutator) {
    const current = route();
    const params = new URLSearchParams(current.params.toString());
    mutator(params);
    params.delete("page");
    const next = `${current.path}${params.toString() ? `?${params.toString()}` : ""}`;
    go(next);
  }

  function setParamList(params, key, values) {
    params.delete(key);
    values.forEach((value) => params.append(key, value));
  }

  function showToast(message) {
    document.getElementById("siteToastBody").textContent = message;
    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("siteToast"));
    toast.show();
  }

  function showModal(title, body) {
    document.getElementById("siteModalTitle").textContent = title;
    document.getElementById("siteModalBody").innerHTML = body;
    bootstrap.Modal.getOrCreateInstance(document.getElementById("siteModal")).show();
  }

  function inquiryModal(productId, vendorId) {
    const product = productById(productId);
    const vendor = vendorById(vendorId || product?.vendorId);
    showModal("Send inquiry", `
      <form data-form="modal-action">
        <p class="text-muted-app">Your inquiry will be prepared for ${esc(vendor?.name || "this exhibitor")}${product ? ` about ${esc(product.name)}` : ""}.</p>
        <div class="mb-3"><label class="form-label">Message</label><textarea class="form-control" rows="4" required>Need pricing, availability, installation timeline, and AMC details.</textarea></div>
        <button class="btn btn-brand w-100" type="submit">Submit inquiry</button>
      </form>
    `);
  }

  function meetingModal(productId, vendorId) {
    const product = productById(productId);
    const vendor = vendorById(vendorId || product?.vendorId);
    showModal("Book meeting", `
      <form data-form="modal-action">
        <p class="text-muted-app">Request a meeting with ${esc(vendor?.name || "this exhibitor")}${product ? ` for ${esc(product.name)}` : ""}.</p>
        <div class="row g-3">
          <div class="col-sm-6"><label class="form-label">Date</label><input class="form-control" type="date" required /></div>
          <div class="col-sm-6"><label class="form-label">Time</label><input class="form-control" type="time" required /></div>
        </div>
        <button class="btn btn-brand w-100 mt-3" type="submit">Request meeting</button>
      </form>
    `);
  }

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("form");
    if (!form) return;
    const type = form.dataset.form;
    if (!type) return;
    event.preventDefault();
    if (type === "global-search" || type === "hero-search") {
      const data = new FormData(form);
      const params = new URLSearchParams();
      const q = String(data.get("q") || "").trim();
      const category = String(data.get("category") || "");
      const expo = String(data.get("expo") || "");
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      if (expo) params.append("expo", expo);
      go(`/search${params.toString() ? `?${params.toString()}` : ""}`);
    }
    if (type === "modal-action") {
      bootstrap.Modal.getOrCreateInstance(document.getElementById("siteModal")).hide();
      showToast("Saved. The Medicall flow is ready for backend connection.");
    }
  });

  document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-filter]");
    if (!input) return;
    const key = input.dataset.filter;
    const value = input.value;
    const multi = input.dataset.multi === "true";
    applyParams((params) => {
      if (!multi) {
        if (input.checked && value) params.set(key, value);
        else params.delete(key);
        return;
      }
      const values = selectedList(params, key);
      const next = input.checked ? Array.from(new Set([...values, value])) : values.filter((item) => item !== value);
      setParamList(params, key, next);
    });
  });

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (anchor) {
      ui.mobileOpen = false;
      ui.megaOpen = false;
    }
    const actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    if (action !== "set-page") event.preventDefault();

    if (action === "toggle-mobile") {
      ui.mobileOpen = !ui.mobileOpen;
      ui.megaOpen = false;
      render(false);
    }
    if (action === "toggle-mega") {
      ui.megaOpen = !ui.megaOpen;
      ui.mobileOpen = false;
      render(false);
    }
    if (action === "toggle-shortlist") {
      const set = shortlist();
      const id = actionEl.dataset.id;
      set.has(id) ? set.delete(id) : set.add(id);
      saveSet(store.shortlist, set);
      showToast(set.has(id) ? "Added to shortlist." : "Removed from shortlist.");
      render(false);
    }
    if (action === "toggle-compare") {
      const set = compare();
      const id = actionEl.dataset.id;
      set.has(id) ? set.delete(id) : set.add(id);
      saveSet(store.compare, set);
      showToast(set.has(id) ? "Added to compare." : "Removed from compare.");
      render(false);
    }
    if (action === "remove-compare") {
      const set = compare();
      set.delete(actionEl.dataset.id);
      saveSet(store.compare, set);
      render(false);
    }
    if (action === "set-tab") {
      applyParams((params) => params.set("tab", actionEl.dataset.tab));
    }
    if (action === "set-page") {
      applyParams((params) => params.set("page", actionEl.dataset.page));
    }
    if (action === "clear-filters") {
      const current = route();
      go(current.path);
    }
    if (action === "remove-filter") {
      const key = actionEl.dataset.filter;
      const value = actionEl.dataset.value;
      applyParams((params) => {
        if (key === "q" || key === "category") params.delete(key);
        else setParamList(params, key, selectedList(params, key).filter((item) => item !== value));
      });
    }
    if (action === "open-inquiry") {
      inquiryModal(actionEl.dataset.id, actionEl.dataset.vendor);
    }
    if (action === "open-meeting") {
      meetingModal(actionEl.dataset.id, actionEl.dataset.vendor);
    }
    if (action === "open-help") {
      showModal("Medicall help", `<p class="text-muted-app mb-3">Use search, categories, shortlist, compare, and meetings to plan your expo workflow.</p><a class="btn btn-brand w-100" href="${link("/faq")}" data-bs-dismiss="modal">Read FAQ</a>`);
    }
  });

  function render(scrollTop) {
    const current = route();
    const path = current.path;
    let page = "";
    if (path === "/") page = homePage();
    else if (path === "/search") page = searchPage(current.params);
    else if (path.startsWith("/product/")) page = productPage(path.split("/")[2]);
    else if (path.startsWith("/vendor/")) page = vendorPage(path.split("/")[2]);
    else if (path === "/compare") page = comparePage();
    else if (path === "/profile") page = profilePage(current.params);
    else if (path === "/exhibitor") page = exhibitorPage(current.params);
    else if (path === "/knowledge-hub") page = knowledgePage();
    else if (path.startsWith("/article/")) page = articlePage(path.split("/")[2]);
    else if (path === "/about") page = aboutPage();
    else if (path === "/faq") page = faqPage();
    else page = notFoundPage();
    app.innerHTML = `${nav()}${page}${footer()}`;
    if (scrollTop) window.scrollTo(0, 0);
  }

  render(false);
})();
