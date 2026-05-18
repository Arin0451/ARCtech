// catalog.js
let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
    await loadProducts();
    renderProducts(allProducts);

    setupFilters();
    setupSorting();
    setupModal();
});

async function loadProducts() {
    try {
        const response = await fetch('./products.json');
        allProducts = await response.json();
    } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
    }
}

// ==================== РЕНДЕР КАРТОЧЕК ====================
function renderProducts(products) {
    const grid = document.querySelector(".catalog-grid");
    if (!grid) return;

    grid.innerHTML = '';

    products.forEach(product => {
        const cardHTML = `
            <div class="product-card" 
                 data-id="${product.id}"
                 data-type="${product.type}" 
                 data-price="${product.price}" 
                 data-stock="${product.stock}">
                
                <div class="product-card-img">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                
                <div class="product-card-bottom">
                    <div class="product-card-info">
                        <div class="product-card-info-item">
                            <div class="info-name">model</div>
                            <div class="info-value">${product.specs.model || product.name}</div>
                        </div>
                        <div class="product-card-info-item">
                            <div class="info-name">brand</div>
                            <div class="info-value">${product.specs.brand || product.specs.brend}</div>
                        </div>
                        <div class="product-card-info-item">
                            <div class="info-name">type</div>
                            <div class="info-value">${product.specs.type || product.type}</div>
                        </div>
                    </div>
                    <div class="product-card-action">
                        <div class="stock ${product.stock}">${product.stock === 'in' ? 'in stock' : 'out of stock'}</div>
                        <div class="price">
                            <div class="amount">${product.price}</div>
                            <div class="currency">$</div>
                        </div>
                        <div class="buy-btn">buy</div>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// ==================== ФИЛЬТРЫ ====================
function setupFilters() {
    const filters = document.querySelectorAll(".filter-item");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            const filterText = filter.textContent.toLowerCase().trim();

            const filtered = allProducts.filter(product => {
                if (filterText === "all") return true;
                if (filterText === "in stock") return product.stock === "in";
                return product.type === filterText;
            });

            renderProducts(filtered);
        });
    });
}

// ==================== СОРТИРОВКА ====================
function setupSorting() {
    const sortBtn = document.querySelector(".sort");
    let asc = true;

    sortBtn.addEventListener("click", () => {
        const cards = Array.from(document.querySelectorAll(".product-card"));

        cards.sort((a, b) => {
            const stockA = a.dataset.stock === "in" ? 1 : 0;
            const stockB = b.dataset.stock === "in" ? 1 : 0;
            if (stockA !== stockB) return stockB - stockA;

            const priceA = +a.dataset.price;
            const priceB = +b.dataset.price;
            return asc ? priceA - priceB : priceB - priceA;
        });

        asc = !asc;
        sortBtn.classList.toggle("active");

        const grid = document.querySelector(".catalog-grid");
        cards.forEach(card => grid.appendChild(card));
    });
}

// ==================== МОДАЛЬНОЕ ОКНО ====================
function setupModal() {
    const modal = document.getElementById("product-modal");
    if (!modal) return;

    let currentImages = [];
    let currentIndex = 0;

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".product-card");
        
        if (card && !e.target.closest(".buy-btn")) {
            const productId = parseInt(card.dataset.id);
            const product = allProducts.find(p => p.id === productId);
            if (product) openModal(product);
        }

        if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal")) {
            modal.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });

    function openModal(product) {
        // Главное изображение
        document.getElementById("modal-img").src = product.images[0];

        // Описание и цена
        document.querySelector(".modal-description").textContent = product.description || "";
        document.querySelector(".modal-price").textContent = `${product.price}$`;

        // Динамическое заполнение характеристик
        renderSpecs(product.specs);

        modal.classList.add("active");
        document.body.classList.add("no-scroll");

        // Карусель
        currentImages = product.images;
        currentIndex = 0;
    }

    // Динамическое создание списка specs
    function renderSpecs(specs) {
        const columns = document.querySelectorAll('.specs-column');
        columns.forEach(col => col.innerHTML = '');

        const entries = Object.entries(specs);
        const half = Math.ceil(entries.length / 2);

        entries.forEach(([key, value], index) => {
            const itemHTML = `
                <div class="product-card-info-item">
                    <div class="info-name">${key}</div>
                    <div class="info-value">${value}</div>
                </div>
            `;
            if (index < half) {
                columns[0].insertAdjacentHTML('beforeend', itemHTML);
            } else {
                columns[1].insertAdjacentHTML('beforeend', itemHTML);
            }
        });
    }

    // Стрелки карусели
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    const modalImg = document.getElementById("modal-img");

    if (leftArrow) leftArrow.onclick = () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex];
    };

    if (rightArrow) rightArrow.onclick = () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImg.src = currentImages[currentIndex];
    };
}