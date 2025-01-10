const stock = JSON.parse(localStorage.getItem('restaurantStock')) || {};

function displayStock() {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = '';

    for (const [item, details] of Object.entries(stock)) {
        const stockItem = document.createElement('div');
        stockItem.className = 'item';

        stockItem.innerHTML = `
            <img src="${details.image}" alt="${capitalize(item)}">
            <div class="item-content">
                <h3>${capitalize(item)}</h3>
                <p>${details.description}</p>
                <p>Quantity: <strong>${details.quantity}</strong></p>
            </div>
            <div class="controls">
                <button onclick="updateStock('${item}', 1)">+</button>
                <button onclick="updateStock('${item}', -1)">-</button>
                <button onclick="removeItem('${item}')">Remove</button>
            </div>
        `;

        stockList.appendChild(stockItem);
    }

    if (Object.keys(stock).length === 0) {
        stockList.innerHTML = '<p>No items in stock.</p>';
    }
}

document.getElementById('addItemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newItemName = document.getElementById('newItemName').value.trim().toLowerCase();
    const newItemQuantity = parseInt(document.getElementById('newItemQuantity').value, 10);
    const newItemDescription = document.getElementById('newItemDescription').value.trim();
    const newItemImage = document.getElementById('newItemImage').files[0];

    if (newItemName && newItemQuantity > 0 && newItemDescription && newItemImage) {
        const reader = new FileReader();
        reader.onload = function(event) {
            stock[newItemName] = {
                quantity: newItemQuantity,
                description: newItemDescription,
                image: event.target.result,
            };
            saveStock();
            displayStock();
        };
        reader.readAsDataURL(newItemImage);
    }

    e.target.reset();
});

function updateStock(item, change) {
    if (stock[item] !== undefined) {
        stock[item].quantity = Math.max(0, stock[item].quantity + change);
        if (stock[item].quantity === 0) delete stock[item];
        saveStock();
        displayStock();
    }
}

function removeItem(item) {
    delete stock[item];
    saveStock();
    displayStock();
}

function saveStock() {
    localStorage.setItem('restaurantStock', JSON.stringify(stock));
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', displayStock);
