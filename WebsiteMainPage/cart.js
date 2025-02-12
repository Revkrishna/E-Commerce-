document.addEventListener("DOMContentLoaded", function () {
    const cartTableBody = document.querySelector("tbody");
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
        return;
    }

    let totalPrice = 0;

    cart.forEach(product => {
        let subtotal = product.quantity * parseFloat(product.price);
        totalPrice += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.image}" width="50"></td>
            <td>${product.name}</td>
            <td>₹ ${product.price}</td>
            <td><input type="number" value="${product.quantity}" min="1" class="quantity-input" data-id="${product.id}"></td>
            <td>₹ ${subtotal}</td>
            <td><a href="#" class="remove-item" data-id="${product.id}"><i class="fa-regular fa-trash-can"></i></a></td>
        `;

        cartTableBody.appendChild(row);
    });

    // Update cart total
    document.querySelector(".carttotal table").innerHTML = `
        <tr><td>Cart Subtotal</td><td>₹ ${totalPrice}</td></tr>
        <tr><td>Shipping</td><td>Free</td></tr>
        <tr><td><strong>Total</strong></td><td>₹ ${totalPrice}</td></tr>
    `;

    // Remove item from cart
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.dataset.id;
            cart = cart.filter(item => item.id !== productId);
            sessionStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    // Update quantity
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", function () {
            const productId = this.dataset.id;
            const newQuantity = parseInt(this.value);
            if (newQuantity < 1) return;

            let product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity = newQuantity;
                sessionStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        });
    });
});
