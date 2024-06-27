document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements
    const itemsContainer = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    
    // Event delegation for dynamic elements (like, delete, quantity +/-)
    itemsContainer.addEventListener('click', function(event) {
        const target = event.target;
        
        // Handling like button
        if (target.classList.contains('btn-like')) {
            target.classList.toggle('liked');
        }
        
        // Handling delete button
        if (target.classList.contains('btn-delete')) {
            const item = target.closest('.item');
            item.remove();
            updateTotalPrice();
        }
        
        // Handling quantity buttons
        if (target.classList.contains('btn-minus') || target.classList.contains('btn-plus')) {
            const itemQuantityElement = target.parentNode.querySelector('.item-quantity');
            let currentQuantity = parseInt(itemQuantityElement.textContent);
            
            if (target.classList.contains('btn-minus')) {
                if (currentQuantity > 1) {
                    currentQuantity--;
                }
            } else if (target.classList.contains('btn-plus')) {
                currentQuantity++;
            }
            
            itemQuantityElement.textContent = currentQuantity;
            updateTotalPrice();
        }
    });
    
    // Function to update total price
    function updateTotalPrice() {
        let totalPrice = 0;
        const items = itemsContainer.querySelectorAll('.item');
        
        items.forEach(function(item) {
            const itemPriceString = item.querySelector('.item-price').textContent;
            const itemPrice = parseFloat(itemPriceString.replace('$', ''));
            const itemQuantity = parseInt(item.querySelector('.item-quantity').textContent);
            totalPrice += itemPrice * itemQuantity;
        });
        
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
});