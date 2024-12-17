const API_URL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

// Function to fetch cart items
const fetchCartItems = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const item = data.items[0]; // Get the first item
            const pricePerItem = item.presentment_price; // Price per item

            // Get the cart items container
            const cartItemsContainer = document.getElementById("cart-items");

            // Clear existing content
            cartItemsContainer.innerHTML = "";

            // Create table row
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="text-align: left;">
                    <img src="${item.image}" alt="${item.title}">
                </td>
                <td style="color:#9F9F9F;">${item.title}</td>
                <td style="color:#9F9F9F;">Rs ${pricePerItem.toFixed(2)}</td>
                <td>
                    <input 
                        type="text" 
                        value="1" 
                        id="quantity-input" 
                        min="1" 
                    />
                </td>
                <td id="subtotal-cell">Rs ${pricePerItem.toFixed(2)}</td>
                <td>
                    <img src="delete.png" alt="Delete" class="delete-icon">
                </td>
            `;
            cartItemsContainer.appendChild(row);

            // Add functionality for quantity input
            handleQuantityChange(pricePerItem);
        } else {
            console.error("No items found in the cart data.");
        }
    } catch (error) {
        console.error("Failed to fetch cart items:", error);
    }
};

// Function to handle quantity changes
const handleQuantityChange = (pricePerItem) => {
    const quantityInput = document.getElementById("quantity-input");
    const subtotalCell = document.getElementById("subtotal-cell");

    quantityInput.addEventListener("input", () => {
        // Ensure the input value is valid
        const quantity = Math.max(parseInt(quantityInput.value, 10) || 1, 1); // Default to 1 if invalid
        quantityInput.value = quantity; // Enforce valid value in input field

        // Calculate and update the subtotal
        const newSubtotal = pricePerItem * quantity;
        subtotalCell.innerText = `Rs ${newSubtotal.toFixed(2)}`;

        // Update totals in "Cart Totals" section
        updateCartTotals(newSubtotal);
    });
};

// Function to update cart totals
const updateCartTotals = (newSubtotal) => {
    const subtotalElement = document.querySelector(".Subtotal span");
    const totalElement = document.querySelector(".Total span");

    if (subtotalElement && totalElement) {
        subtotalElement.innerText = `Rs ${newSubtotal.toFixed(2)}`;
        totalElement.innerText = `Rs ${newSubtotal.toFixed(2)}`;
    } else {
        console.error("Subtotal or Total elements not found.");
    }
};

// Fetch items on page load
window.onload = fetchCartItems;
