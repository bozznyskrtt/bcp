const quantities = {
    pizza: 0,
    burger: 0,
    cola: 0,
    juice: 0
};

function updateQuantity(item, change) {
    quantities[item] = Math.max(0, quantities[item] + change);
    document.getElementById(`${item}Quantity`).textContent = quantities[item];
    updateOrderSummary();
}

function updateOrderSummary() {
    const summaryContainer = document.getElementById('summaryItems');
    summaryContainer.innerHTML = '';
    for (const [item, quantity] of Object.entries(quantities)) {
        if (quantity > 0) {
            const capitalizedItem = capitalize(item);
            const summaryItem = document.createElement('p');
            summaryItem.innerHTML = `<strong>${capitalizedItem}:</strong> ${quantity}`;
            summaryContainer.appendChild(summaryItem);
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function submitOrder() {
    alert('Order submitted successfully!');
}
