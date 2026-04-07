const catalogMenus = document.querySelectorAll('.catalog-menu');

catalogMenus.forEach(menu => {
    const toggle = menu.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
});