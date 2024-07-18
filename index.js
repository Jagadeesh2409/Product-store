var toggle = document.querySelector(".toggle-button");
var menu = document.querySelector("nav ul");
var searchbar = document.getElementById("search");
var grid_display = document.getElementById("product-grid");
var no_items = document.getElementById("no-items");
var button = document.querySelector("form button");

toggle.addEventListener("click", () => {
    menu.classList.toggle("menu");
});

fetch('https://dummyjson.com/products?limit=100')
    .then(response => response.json())
    .then(data => {
        var products = data.products;
        display(products);

        button.addEventListener("click", () => {
            var searchvalue = searchbar.value.toLowerCase();
            var filtered = products.filter(product => 
                product.title.toLowerCase().includes(searchvalue)
            );
            display(filtered);
        });
        searchbar.addEventListener("input", () => {
            var searchvalue = searchbar.value.toLowerCase();
            var filtered = products.filter(product => 
                product.title.toLowerCase().includes(searchvalue)
            );
            display(filtered);
        });
    })
    .catch(error => console.error('Error in fetching products:', error));

function display(products) {
    if (products.length === 0) {
        no_items.style.display = 'block';
        grid_display.innerHTML = '';
    } else {
        no_items.style.display = 'none';
        grid_display.innerHTML = products.map(product => `
            <div class="product">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            </div>
        `).join('');
    }
}
