async function loadComponent(id, file) {
    const response = await fetch(file);
    const text = await response.text();
    document.getElementById(id).innerHTML = text;
    
    // 👇 ВСЁ, ЧТО РАБОТАЕТ С ХЕДЕРОМ, ПИШИ СЮДА
    if (id === "header") {
        const catalogMenus = document.querySelectorAll('.catalog-menu');
        catalogMenus.forEach(menu => {
            const toggle = menu.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('open');
                    console.log('я нажался');
                });
            }
        });
        
        document.addEventListener('click', () => {
            catalogMenus.forEach(menu => menu.classList.remove('open'));
        });
    }
}

loadComponent("header", "./components/header.html");
loadComponent("footer", "./components/footer.html");