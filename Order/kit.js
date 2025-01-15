const orders = JSON.parse(localStorage.getItem('restaurantOrders')) || [];

function displayOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    if (orders.length === 0) {
        orderList.innerHTML = '<p>No orders in the kitchen.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';

        const items = order.items.map(item => `<li>${item.name} (x${item.quantity})</li>`).join('');

        orderDiv.innerHTML = `
            <h3>Table ${order.tableNumber}</h3>
            <p>Order Details:</p>
            <ul>${items}</ul>
            <button onclick="finishOrder(${index})">Finish</button>
        `;

        orderList.appendChild(orderDiv);
    });
}

function finishOrder(index) {
    orders.splice(index, 1);
    saveOrders();
    displayOrders();
}

function saveOrders() {
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
}

document.addEventListener('DOMContentLoaded', displayOrders);
