let currentCategory = "coffee";
let allProducts = [];

async function loadProducts() {
  const response = await fetch("src/js/products.json");
  if (!response.ok) {
    throw new Error("Не удалось загрузить products.json: " + response.status);
  }
  allProducts = await response.json();
}

function renderProducts(category) {
  const container = document.getElementById("items");
  if (!container) {
    console.error("Элемент #items не найден");
    return;
  }

  const products = allProducts.filter((p) => p.category === category);

  const counters = {};

  container.innerHTML = products
    .map((product) => {
      const { name, description, price, category } = product;

      counters[category] = (counters[category] || 0) + 1;
      const imageClass = `${category}-${counters[category]}`;

      return `
        <div class="item">
          <div class="${imageClass}"></div>
          <h3>${name}</h3>
          <p>${description}</p>
          <h3>$${price}</h3>
        </div>
      `;
    })
    .join("");
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab_menu");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("checked"));
      tab.classList.add("checked");
      currentCategory = tab.dataset.category;
      renderProducts(currentCategory);
    });
  });
}

async function init() {
  try {
    await loadProducts();
    initTabs();
    renderProducts(currentCategory);
  } catch (e) {
    console.error(e);
  }
}

init();
