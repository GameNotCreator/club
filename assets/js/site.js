/* Small, dependency-free enhancements. Content and links remain useful without JavaScript. */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));
  const translations = window.LGF_TRANSLATIONS || { fr: {}, en: {} };
  const stored = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* Private browsing can deny storage. */
      }
    },
  };
  const url = new URL(location.href);
  const requestedLanguage = url.searchParams.get("lang");
  let language = ["fr", "en"].includes(requestedLanguage)
    ? requestedLanguage
    : stored.get("lgf-language") === "en"
      ? "en"
      : "fr";
  let theme = stored.get("lgf-theme") === "dark" ? "dark" : "light";
  let wavePaused = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const originalFrench = {};

  $$("[data-i18n]").forEach((element) => {
    originalFrench[element.dataset.i18n] = element.textContent;
  });
  $$("[data-i18n-aria]").forEach((element) => {
    originalFrench[element.dataset.i18nAria] =
      element.getAttribute("aria-label");
  });
  $$("[data-i18n-alt]").forEach((element) => {
    originalFrench[element.dataset.i18nAlt] = element.getAttribute("alt");
  });

  function text(key, values = {}) {
    let result =
      translations[language]?.[key] ??
      translations.fr?.[key] ??
      originalFrench[key] ??
      key;
    Object.entries(values).forEach(([name, value]) => {
      result = result.replaceAll(`{${name}}`, String(value));
    });
    return result;
  }

  const galleryItems = $$("[data-gallery-category]");
  const galleryFilters = $$("[data-filter]");
  let selectedFilter = "all";
  const dialog = $("#lightbox");
  let lightboxLinks = [];
  let lightboxIndex = 0;
  let lastLightboxTrigger = null;
  let previousOverflow = "";

  function updateGalleryStatus() {
    const count = galleryItems.filter((item) => !item.hidden).length;
    const status = $("#gallery-status");
    if (status)
      status.textContent = text(
        count === 1 ? "galleryCountOne" : "galleryCountMany",
        { count },
      );
  }

  function updateLightbox() {
    const link = lightboxLinks[lightboxIndex];
    if (!link || !dialog) return;
    const image = $("#lightbox-image");
    const thumbnail = $("img", link);
    image.src = link.href;
    image.alt = thumbnail?.alt || "";
    const captionKey = link.dataset.captionKey;
    $("#lightbox-caption").textContent = captionKey
      ? text(captionKey)
      : thumbnail?.alt || "";
    $("#lightbox-counter").textContent = text("lightboxCounter", {
      current: lightboxIndex + 1,
      total: lightboxLinks.length,
    });
    const onlyOneImage = lightboxLinks.length < 2;
    $("#lightbox-prev").disabled = onlyOneImage;
    $("#lightbox-next").disabled = onlyOneImage;
  }

  function updateWave() {
    const wave = $(".wave-art");
    const control = $("#wave-toggle");
    if (wave) wave.dataset.paused = String(wavePaused);
    if (control) {
      control.setAttribute("aria-pressed", String(wavePaused));
      control.setAttribute(
        "aria-label",
        text(wavePaused ? "wavePlay" : "wavePause"),
      );
      const label = $("[data-wave-label]", control);
      if (label)
        label.textContent = text(wavePaused ? "wavePlay" : "wavePause");
    }
  }

  function updateTheme() {
    document.body.dataset.theme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const toggle = $("#theme-toggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        text(theme === "dark" ? "themeToLight" : "themeToDark"),
      );
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
      toggle.title = text(theme === "dark" ? "themeToLight" : "themeToDark");
    }
    const themeColor = $('meta[name="theme-color"]');
    if (themeColor)
      themeColor.content = theme === "dark" ? "#151a16" : "#f7f8f5";
  }

  function applyLanguage(nextLanguage, persist = false) {
    language = nextLanguage;
    document.documentElement.lang = language;
    $$("[data-i18n]").forEach((element) => {
      element.textContent = text(element.dataset.i18n);
    });
    $$("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", text(element.dataset.i18nAria));
    });
    $$("[data-i18n-alt]").forEach((element) => {
      element.alt = text(element.dataset.i18nAlt);
    });
    document.title = text("pageTitle");
    const description = $('meta[name="description"]');
    if (description) description.content = text("pageDescription");
    const ogTitle = $('meta[property="og:title"]');
    const ogDescription = $('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = text("pageTitle");
    if (ogDescription) ogDescription.content = text("pageDescription");
    const languageToggle = $("#language-toggle");
    if (languageToggle) {
      languageToggle.textContent = language === "fr" ? "EN" : "FR";
      languageToggle.setAttribute("aria-label", text("languageLabel"));
      languageToggle.setAttribute("lang", language === "fr" ? "en" : "fr");
      languageToggle.title = text("languageLabel");
    }
    updateTheme();
    updateWave();
    if (menuToggle)
      menuToggle.setAttribute(
        "aria-label",
        text(
          menuToggle.getAttribute("aria-expanded") === "true"
            ? "menuClose"
            : "menuOpen",
        ),
      );
    updateGalleryStatus();
    if (dialog?.open) updateLightbox();
    if (persist) {
      stored.set("lgf-language", language);
      const currentUrl = new URL(location.href);
      currentUrl.searchParams.set("lang", language);
      history.replaceState(history.state, "", currentUrl);
    }
  }

  $("#language-toggle")?.addEventListener("click", () =>
    applyLanguage(language === "fr" ? "en" : "fr", true),
  );
  $("#theme-toggle")?.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    stored.set("lgf-theme", theme);
    updateTheme();
  });

  const navigation = $("#primary-nav");
  const menuToggle = $("#menu-toggle");
  function setMenu(open, restoreFocus = false) {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      text(open ? "menuClose" : "menuOpen"),
    );
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (restoreFocus) menuToggle.focus();
  }
  menuToggle?.addEventListener("click", () =>
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
  );
  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (
      menuToggle?.getAttribute("aria-expanded") === "true" &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    )
      setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle?.getAttribute("aria-expanded") === "true"
    )
      setMenu(false, true);
  });
  matchMedia("(min-width: 651px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  const projectTabs = $$("[data-project-tab]");
  function selectProject(project, focus = false) {
    if (!projectTabs.some((tab) => tab.dataset.projectTab === project)) return;
    projectTabs.forEach((tab) => {
      const active = tab.dataset.projectTab === project;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = $(`#panel-${tab.dataset.projectTab}`);
      if (panel) panel.hidden = !active;
      if (active && focus) tab.focus();
    });
  }
  projectTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectProject(tab.dataset.projectTab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % projectTabs.length;
      if (event.key === "ArrowLeft")
        next = (index - 1 + projectTabs.length) % projectTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = projectTabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectProject(projectTabs[next].dataset.projectTab, true);
      }
    });
  });
  $$("[data-open-project]").forEach((link) =>
    link.addEventListener("click", () =>
      selectProject(link.dataset.openProject),
    ),
  );
  if (projectTabs.length)
    selectProject(
      projectTabs.find((tab) => tab.getAttribute("aria-selected") === "true")
        ?.dataset.projectTab || projectTabs[0].dataset.projectTab,
    );

  galleryFilters.forEach((filter) =>
    filter.addEventListener("click", () => {
      selectedFilter = filter.dataset.filter;
      galleryFilters.forEach((button) =>
        button.setAttribute("aria-pressed", String(button === filter)),
      );
      galleryItems.forEach((item) => {
        item.hidden =
          selectedFilter !== "all" &&
          !item.dataset.galleryCategory.split(" ").includes(selectedFilter);
      });
      updateGalleryStatus();
    }),
  );

  function moveLightbox(direction) {
    if (lightboxLinks.length < 2) return;
    lightboxIndex =
      (lightboxIndex + direction + lightboxLinks.length) % lightboxLinks.length;
    updateLightbox();
  }
  if (dialog && typeof dialog.showModal === "function") {
    $$("[data-lightbox]").forEach((link) =>
      link.addEventListener("click", (event) => {
        if (
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        lightboxLinks = $$("[data-lightbox]").filter(
          (item) => !item.closest("[hidden]"),
        );
        lightboxIndex = lightboxLinks.indexOf(link);
        lastLightboxTrigger = link;
        updateLightbox();
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        $("#lightbox-close").focus();
      }),
    );
    $("#lightbox-close")?.addEventListener("click", () => dialog.close());
    $("#lightbox-prev")?.addEventListener("click", () => moveLightbox(-1));
    $("#lightbox-next")?.addEventListener("click", () => moveLightbox(1));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = previousOverflow;
      lastLightboxTrigger?.focus({ preventScroll: true });
    });
  }

  $("#wave-toggle")?.addEventListener("click", () => {
    wavePaused = !wavePaused;
    updateWave();
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
    "change",
    (event) => {
      wavePaused = event.matches;
      updateWave();
    },
  );

  if ("IntersectionObserver" in window && navigation) {
    const sectionLinks = $$('a[href^="#"]', navigation);
    const sectionMap = sectionLinks
      .map((link) => ({ link, section: $(link.getAttribute("href")) }))
      .filter((item) => item.section);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionMap.forEach(({ link, section }) => {
            if (section === entry.target)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sectionMap.forEach(({ section }) => observer.observe(section));
  }

  applyLanguage(language);
  document.documentElement.classList.add("js-ready");
})();
