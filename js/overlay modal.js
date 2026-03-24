document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("product-modal");
  const openBtns = document.querySelectorAll(".details-btn");
  const closeBtn = document.querySelector(".modal-close");

  if (!modal || !closeBtn) {
    console.log("modal not found");
    return;
  }

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

    document.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
        document.getElementById("product-modal").classList.add("active");
    }
    });
});