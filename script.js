document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initAuthTabs();
    initAuthForms();
    initHomePreview();
    initArticlesPage();
    initEventsPage();
    initScrollReveal();
});

function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        if (!menu.classList.contains("open")) return;
        if (menu.contains(event.target) || toggle.contains(event.target)) return;
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(
        ".article-card, .event-card, .member-card, .about-content, .section-header, .category-block, .page-hero"
    );

    if (!elements.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

function initAuthTabs() {
    const tabs = document.querySelectorAll(".auth-tab");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const message = document.getElementById("auth-message");

    if (!tabs.length || !loginForm || !registerForm) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach((t) => {
                const isActive = t === tab;
                t.classList.toggle("active", isActive);
                t.setAttribute("aria-selected", String(isActive));
            });

            loginForm.classList.toggle("hidden", target !== "login");
            registerForm.classList.toggle("hidden", target !== "register");

            if (message) {
                message.classList.remove("visible", "success", "error");
                message.textContent = "";
            }
        });
    });
}

function initAuthForms() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const message = document.getElementById("auth-message");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            showAuthMessage(
                message,
                "Connexion en attente — branchement Supabase à venir.",
                "success"
            );
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const password = registerForm.querySelector('[name="password"]').value;
            const confirm = registerForm.querySelector('[name="confirm"]').value;

            if (password !== confirm) {
                showAuthMessage(message, "Les mots de passe ne correspondent pas.", "error");
                return;
            }

            showAuthMessage(
                message,
                "Inscription en attente — branchement Supabase à venir.",
                "success"
            );
        });
    }
}

function showAuthMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.classList.remove("success", "error");
    element.classList.add("visible", type);
}

/* ── Accueil : aperçu dynamique depuis data.js ── */

function initHomePreview() {
    const articlesGrid = document.getElementById("home-articles");
    const eventsGrid = document.getElementById("home-events");

    if (typeof ARTICLES === "undefined") return;

    if (articlesGrid) {
        articlesGrid.innerHTML = getRecentArticles(3).map(renderArticleCard).join("");
    }

    if (eventsGrid) {
        const upcoming = getUpcomingEvents().slice(0, 3);
        eventsGrid.innerHTML = upcoming.length
            ? upcoming.map(renderEventCard).join("")
            : '<p class="empty-state">Aucun événement à venir.</p>';
    }
}

/* ── Page Articles ── */

function initArticlesPage() {
    const filtersContainer = document.getElementById("category-filters");
    const articlesContainer = document.getElementById("articles-container");
    const emptyState = document.getElementById("articles-empty");

    if (!filtersContainer || !articlesContainer || typeof ARTICLES === "undefined") return;

    let activeCategory = "all";

    function renderFilters() {
        filtersContainer.innerHTML = CATEGORIES.map(
            (cat) => `
                <button
                    type="button"
                    class="filter-btn${cat.id === activeCategory ? " active" : ""}"
                    data-category="${cat.id}"
                    role="tab"
                    aria-selected="${cat.id === activeCategory}"
                >${cat.label}</button>
            `
        ).join("");

        filtersContainer.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                activeCategory = btn.dataset.category;
                renderFilters();
                renderArticles();
            });
        });
    }

    function renderArticles() {
        const filtered =
            activeCategory === "all"
                ? ARTICLES
                : ARTICLES.filter((a) => a.category === activeCategory);

        if (!filtered.length) {
            articlesContainer.innerHTML = "";
            emptyState.classList.remove("hidden");
            return;
        }

        emptyState.classList.add("hidden");

        if (activeCategory === "all") {
            const groups = groupArticlesByCategory(filtered);
            const categoryOrder = CATEGORIES.filter((c) => c.id !== "all").map((c) => c.id);

            articlesContainer.innerHTML = categoryOrder
                .filter((catId) => groups[catId]?.length)
                .map(
                    (catId) => `
                        <section class="category-block" id="cat-${catId}">
                            <h2 class="category-title">${getCategoryLabel(catId)}</h2>
                            <div class="articles-grid">
                                ${groups[catId].map(renderArticleCard).join("")}
                            </div>
                        </section>
                    `
                )
                .join("");
        } else {
            articlesContainer.innerHTML = `
                <div class="articles-grid">
                    ${filtered.map(renderArticleCard).join("")}
                </div>
            `;
        }

        initScrollReveal();
    }

    renderFilters();
    renderArticles();
}

function initEventsPage() {
    const upcomingContainer = document.getElementById("upcoming-events");
    const pastContainer = document.getElementById("past-events");
    const upcomingEmpty = document.getElementById("upcoming-empty");
    const pastEmpty = document.getElementById("past-empty");

    if (!upcomingContainer || typeof EVENTS === "undefined") return;

    const upcoming = getUpcomingEvents();
    const past = getPastEvents();

    if (upcoming.length) {
        upcomingContainer.innerHTML = upcoming.map(renderEventCard).join("");
        upcomingEmpty.classList.add("hidden");
    } else {
        upcomingContainer.innerHTML = "";
        upcomingEmpty.classList.remove("hidden");
    }

    if (past.length) {
        pastContainer.innerHTML = past.map((e) => renderEventCard(e, true)).join("");
        pastEmpty.classList.add("hidden");
    } else {
        pastContainer.innerHTML = "";
        pastEmpty.classList.remove("hidden");
    }

    initScrollReveal();
}

/* ── Templates HTML ── */

function renderArticleCard(article) {
    return `
        <article class="card article-card">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <span class="tag">${getCategoryLabel(article.category)}</span>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <p class="article-meta">${formatDate(article.date)} · ${article.readTime}</p>
            <a href="#" class="card-link">Lire la suite →</a>
        </article>
    `;
}

function renderEventCard(event, isPast = false) {
    const { day, month } = formatEventDateParts(event.date);
    const tagClass = event.online ? "tag tag-online" : "tag";
    const tagLabel = event.online ? "En ligne" : "Présentiel";

    return `
        <article class="card event-card${isPast ? " event-card-past" : ""}">
            <div class="event-date">
                <span class="event-day">${day}</span>
                <span class="event-month">${month}</span>
            </div>
            <div class="event-details">
                <span class="${tagClass}">${tagLabel}</span>
                <h3>${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <p class="event-meta">${formatDate(event.date)} · ${event.location}</p>
                ${
                    isPast
                        ? '<span class="event-badge-past">Terminé</span>'
                        : '<a href="#" class="card-link">S\'inscrire →</a>'
                }
            </div>
        </article>
    `;
}
