(function () {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;
  const button = document.getElementById("theme_button");

  const darkMQL = window.matchMedia
    ? window.matchMedia("(prefers-theme: dark)")
    : null;

  // Текущая активная тема
  const getScheme = () => root.getAttribute("data-theme") || "light";

  // Применить тему + синхронизировать переключатель
  const applyScheme = (scheme, persist = false) => {
    root.setAttribute("data-theme", scheme);
    if (persist) localStorage.setItem(STORAGE_KEY, scheme);

    if (button) {
      const isDark = scheme === "dark";
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute(
        "aria-label",
        isDark ? "Включить светлую тему" : "Включить тёмную тему"
      );
      // Если внутри кнопки есть текст/иконка — обновим
      button.textContent = isDark ? "☀️" : "🌙";
    }
  };

  // Первичная синхронизация состояния кнопки с уже применённой темой
  applyScheme(getScheme(), false);

  // Переключатель
  if (button) {
    button.addEventListener("click", () => {
      const next = getScheme() === "dark" ? "light" : "dark";
      applyScheme(next, true); // сохраняем выбор пользователя
    });
  }

  // Если пользователь ещё не выбирал вручную — реагируем на системную тему
  if (darkMQL) {
    const onSystemChange = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyScheme(e.matches ? "dark" : "light", false);
      }
    };
    // addEventListener с фолбэком на старый API
    if (darkMQL.addEventListener) darkMQL.addEventListener("change", onSystemChange);
    else if (darkMQL.addListener) darkMQL.addListener(onSystemChange);
  }
})();