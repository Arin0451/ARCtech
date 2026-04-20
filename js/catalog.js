const sortBtn = document.querySelector(".sort");
let ascending = true;

sortBtn.addEventListener("click", () => {
  ascending = !ascending;
  sortBtn.classList.toggle("active");

  const cards = Array.from(document.querySelectorAll(".product-card"));
  const grid = document.querySelector(".catalog-grid");

  cards.sort((a, b) => {
    const priceA = parseInt(a.querySelector(".amount").textContent);
    const priceB = parseInt(b.querySelector(".amount").textContent);

    return ascending ? priceA - priceB : priceB - priceA;
  });

  cards.forEach(card => grid.appendChild(card));
});

const filters = document.querySelectorAll(".filter-item");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    const type = filter.textContent.trim().toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {
      const cardType = card.dataset.type; // берем data-type

      if (type === "all" || cardType === type) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

  });
});