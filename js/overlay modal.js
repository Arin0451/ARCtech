document.addEventListener("click", (e) => {
  const modal = document.getElementById("product-modal");

  if (!modal) return;

  // открыть
  if (e.target.classList.contains("details-btn")) {
    modal.classList.add("active");
  }

  // закрыть по крестику
  if (e.target.classList.contains("modal-close")) {
    modal.classList.remove("active");
  }

  // закрыть по фону
  if (e.target.classList.contains("modal")) {
    modal.classList.remove("active");
  }
});