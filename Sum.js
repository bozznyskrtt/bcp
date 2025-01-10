function loadOrderSummary() {
    const summaryData = JSON.parse(localStorage.getItem('orderSummary')) || {};
    const summaryContainer = document.getElementById('orderSummary');
    summaryContainer.innerHTML = '';

    let totalItems = 0;
    for (const [item, quantity] of Object.entries(summaryData)) {
        if (quantity > 0) {
            const capitalizedItem = capitalize(item);
            const summaryItem = document.createElement('p');
            summaryItem.innerHTML = `<strong>${capitalizedItem}:</strong> ${quantity}`;
            summaryContainer.appendChild(summaryItem);
            totalItems += quantity;
        }
    }

    if (totalItems === 0) {
        summaryContainer.innerHTML = '<p>No items in the order.</p>';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function goBack() {
    window.location.href = 'index.html'; // Replace with your main page file name
}

// Load summary on page load
window.onload = loadOrderSummary;
