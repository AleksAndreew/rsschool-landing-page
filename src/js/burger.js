document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const burger = document.querySelector(".circle_m");
  const navMenu = document.querySelector(".nav_menu");
  const body = document.body;
  const html = document.documentElement;

  function addMenu() {
    if (!navMenu) return;
    if (navMenu.querySelector('a[href="menu.html"]')) return;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = "Menu";
    a.href = "menu.html";
    li.appendChild(a);
    navMenu.appendChild(li);
  }
  function removeMenu() {
    const link = navMenu.querySelector('a[href="menu.html"]');
    if (link) link.closest("li").remove();
  }

  // Открыть/закрыть меню
  function toggleMenu() {
    const isOpen = header.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", isOpen);
    body.classList.toggle("no-scroll", isOpen);
    html.classList.toggle("no-scroll", isOpen);
    if (isOpen) {
      addMenu();
    } else {
      removeMenu();
    }
  }

  // Закрыть меню
  function closeMenu() {
    header.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
    html.classList.remove("no-scroll");
    removeMenu();
  }

  // Клик по бургеру
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Клик по ссылкам внутри меню — закрываем
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      closeMenu();
    }
  });

  // Клик по затемнению (header::after) — закрываем
  header.addEventListener("click", (e) => {
    if (header.classList.contains("menu-open") && e.target === header) {
      closeMenu();
    }
  });

  // Escape — закрываем
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("menu-open")) {
      closeMenu();
    }
  });

  // При ресайзе, если ширина больше планшетной, убираем открытое состояние
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      // замените 768 на ваш брейкпоинт из maedia-tablet
      closeMenu();
    }
  });
});
