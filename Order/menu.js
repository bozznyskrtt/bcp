// menu.js

document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value.trim();
    const itemDescription = document.getElementById('itemDescription').value.trim();
    const itemPrice = document.getElementById('itemPrice').value.trim();
    const itemImage = document.getElementById('itemImage').files[0];

    if (!itemName || !itemDescription || !itemPrice || !itemImage) {
        alert('Please fill out all fields and upload an image.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const item = {
            name: itemName,
            description: itemDescription,
            price: parseFloat(itemPrice).toFixed(2),
            image: e.target.result
        };

        // Save to local storage
        let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
        menuItems.push(item);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));

        alert('Item added successfully!');
        document.getElementById('addItemForm').reset();
    };

    reader.readAsDataURL(itemImage);
});
