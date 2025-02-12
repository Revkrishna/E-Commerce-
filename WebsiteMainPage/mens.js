document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".addcart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".product-item");
            const product = {
                id: productElement.dataset.id || new Date().getTime(), // Unique ID
                name: productElement.querySelector("p").innerText,
                price: productElement.querySelector("span").innerText.replace("₹", "").trim(),
                image: productElement.querySelector("img").src,
                quantity: 1
            };

            // Retrieve cart from sessionStorage
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

            // Check if product exists in the cart
            let existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            // Save updated cart to sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.name} added to cart!`);
        });
    });
});
