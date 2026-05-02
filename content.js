(function () {
  const ROOT_CLASS = "gdt-enabled";
  const COLLAPSED_RAIL_CLASS = "gdt-rail-collapsed";
  const STORAGE_KEY = "gmailDarkThemeEnabled";

  document.documentElement.classList.add(ROOT_CLASS);
  document.documentElement.dataset.gmailDarkTheme = "on";

  function setTheme(enabled) {
    document.documentElement.classList.toggle(ROOT_CLASS, enabled);
    document.documentElement.dataset.gmailDarkTheme = enabled ? "on" : "off";
  }

  function syncCollapsedRailState() {
    const rail = document.querySelector(".aeN");
    const isCollapsed = Boolean(rail && rail.getBoundingClientRect().width <= 120);
    document.documentElement.classList.toggle(COLLAPSED_RAIL_CLASS, isCollapsed);
  }

  chrome.storage.sync.get({ [STORAGE_KEY]: true }, (items) => {
    setTheme(Boolean(items[STORAGE_KEY]));
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync" || !changes[STORAGE_KEY]) return;
    setTheme(Boolean(changes[STORAGE_KEY].newValue));
  });

  const railObserver = new MutationObserver(syncCollapsedRailState);
  railObserver.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
  });

  window.addEventListener("resize", syncCollapsedRailState, { passive: true });
  document.addEventListener("DOMContentLoaded", syncCollapsedRailState);
  syncCollapsedRailState();
})();
