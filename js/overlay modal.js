document.addEventListener("click", (e) => {
  const modal = document.getElementById("product-modal");

  if (!modal) return;

  const card = e.target.closest(".product-card");

  if (e.target.closest(".buy-btn")) return;
  if (card) {
    modal.classList.add("active");
    document.body.classList.add("no-scroll"); 
  }

  if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal")) {
    modal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const images = [
    "./src/images/keyboard.png",
    "./src/images/memb-keyboard.png",
    "./src/images/mouse.png"
  ];

  let current = 0;

  const img = document.getElementById("modal-img");
  const left = document.querySelector(".arrow.left");
  const right = document.querySelector(".arrow.right");

  if (!img || !left || !right) {
    console.log("❌ carousel elements not found");
    return;
  }

  left.onclick = () => {
    current = (current - 1 + images.length) % images.length;
    img.src = images[current];
  };

  right.onclick = () => {
    current = (current + 1) % images.length;
    img.src = images[current];
  };

});