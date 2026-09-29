let currentCategory = "coffee";
let allProducts = [];

async function loadProducts() {
  const response = await fetch("src/js/products.json");
  if (!response.ok)
    throw new Error("Не удалось загрузить products.json: " + response.status);
  allProducts = await response.json();
}

function renderProducts(category) {
  const container = document.getElementById("items");
  if (!container) return;

  const products = allProducts.filter((p) => p.category === category);
  const counters = {};

  container.innerHTML = products
    .map((product) => {
      const globalIndex = allProducts.indexOf(product);
      counters[category] = (counters[category] || 0) + 1;
      const imageClass = `${category}-${counters[category]}`;

      return `
      <div class="item" data-index="${globalIndex}" tabindex="0">
        <div class="${imageClass}"></div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h3>$${product.price}</h3>
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

/* ---------- Модалка ---------- */
const modal = document.getElementById("productModal");

function openProductModal(product) {
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPrice").textContent = `$${product.price}`;

  const sameCategory = allProducts.filter(
    (p) => p.category === product.category,
  );
  const n = sameCategory.indexOf(product) + 1;

  const img = document.getElementById("modalImage");
  img.className = "modal-image";
  img.classList.add(`${product.category}-${n}`);

  modal.showModal();
}

function initModal() {
  const items = document.getElementById("items");
  const closeBtn = document.getElementById("modalClose");

  items.addEventListener("click", (e) => {
    const card = e.target.closest(".item");
    if (!card) return;
    openProductModal(allProducts[Number(card.dataset.index)]);
  });

  items.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".item");
    if (!card) return;
    e.preventDefault();
    openProductModal(allProducts[Number(card.dataset.index)]);
  });

  closeBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
}

/* ---------- Init ---------- */
async function init() {
  try {
    await loadProducts();
    initTabs();
    renderProducts(currentCategory);
    initModal();
  } catch (e) {
    console.error(e);
  }
}

init();
