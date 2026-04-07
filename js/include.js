async function loadComponent(id, file) {
    const response = await fetch(file);
    const text = await response.text();
    document.getElementById(id).innerHTML = text;
    
    
}

loadComponent("header", "/arctech/components/header.html");
loadComponent("footer", "/arctech/components/footer.html");