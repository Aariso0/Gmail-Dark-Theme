const STORAGE_KEY = "gmailDarkThemeEnabled";
const enabledInput = document.getElementById("enabled");

chrome.storage.sync.get({ [STORAGE_KEY]: true }, (items) => {
  enabledInput.checked = Boolean(items[STORAGE_KEY]);
});

enabledInput.addEventListener("change", () => {
  chrome.storage.sync.set({ [STORAGE_KEY]: enabledInput.checked });
});
