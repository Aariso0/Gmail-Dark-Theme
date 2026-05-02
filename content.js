(function () {
  const ROOT_CLASS = "gdt-enabled";
  const STORAGE_KEY = "gmailDarkThemeEnabled";

  document.documentElement.classList.add(ROOT_CLASS);
  document.documentElement.dataset.gmailDarkTheme = "on";

  function setTheme(enabled) {
    document.documentElement.classList.toggle(ROOT_CLASS, enabled);
    document.documentElement.dataset.gmailDarkTheme = enabled ? "on" : "off";
  }

  chrome.storage.sync.get({ [STORAGE_KEY]: true }, (items) => {
    setTheme(Boolean(items[STORAGE_KEY]));
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync" || !changes[STORAGE_KEY]) return;
    setTheme(Boolean(changes[STORAGE_KEY].newValue));
  });
})();
