const sortBtn = document.querySelector(".sort");
const grid = document.querySelector(".catalog-grid");
const params = new URLSearchParams(window.location.search);
const typeFromUrl = params.get("type");

let asc = true;

sortBtn.addEventListener("click", () => {

  const cards = Array.from(document.querySelectorAll(".product-card"));

  cards.sort((a, b) => {
    const stockA = a.dataset.stock === "in" ? 1 : 0;
    const stockB = b.dataset.stock === "in" ? 1 : 0;

    // сначала наличие
    if (stockA !== stockB) {
      return stockB - stockA;
    }

    // потом цена
    const priceA = +a.dataset.price;
    const priceB = +b.dataset.price;

    return asc ? priceA - priceB : priceB - priceA;
  });

  asc = !asc;
  sortBtn.classList.toggle("active");

  cards.forEach(card => grid.appendChild(card));
});

const filters = document.querySelectorAll(".filter-item");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    const type = filter.textContent.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {

      const cardType = card.dataset.type;
      const stock = card.dataset.stock;

      if (type === "all") {
        card.style.display = "flex";
      } 
      else if (type === "in stock") {
        card.style.display = stock === "in" ? "flex" : "none";
      }
      else {
        card.style.display = cardType === type ? "flex" : "none";
      }

    });

  });
});

if (typeFromUrl) {
  filters.forEach(filter => {
    const text = filter.textContent.toLowerCase();

    if (
      text === typeFromUrl ||
      (typeFromUrl === "in-stock" && text === "in stock")
    ) {
      filter.click(); // имитируем клик
    }
  });
}