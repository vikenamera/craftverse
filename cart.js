// let cart = JSON.parse(localStorage.getItem('cart')) || [];
// const cartContainer = document.getElementById('cart-items');
// const cartTotal = document.getElementById('cart-total');

// function renderCart() {
//   cartContainer.innerHTML = '';
//   let total = 0;

//   if (cart.length === 0) {
//     cartContainer.innerHTML = '<p>Shporta është bosh.</p>';
//     cartTotal.textContent = '';
//     return;
//   }

//   cart.forEach((item, index) => {
//     total += parseFloat(item.price);
//     const itemEl = document.createElement('div');
//     itemEl.className = 'cart-item';

//     itemEl.innerHTML = `
//       <div class="cart-details">
//         <img src="${item.imageSrc}" alt="${item.title}">
//         <div class="cart-info">
//           <span>${item.title}</span>
//           <span class="cart-price">$${item.price}</span>
//         </div>
//       </div>
//       <button class="remove-btn" onclick="removeItem(${index})">✖</button>
//     `;
//     cartContainer.appendChild(itemEl);
//   });

//   cartTotal.textContent = `Totali: $${total.toFixed(2)}`;
// }

// function removeItem(index) {
//   cart.splice(index, 1);
//   localStorage.setItem('cart', JSON.stringify(cart));
//   renderCart();
//   updateCartCount();
// }

// function clearCart() {
//   cart = [];
//   localStorage.removeItem('cart');
//   renderCart();
//   updateCartCount();
// }
// function checkout() {
//   if (cart.length === 0) {
//     alert('Shporta është bosh. Shto produkte para se të vazhdosh.');
//     return;
//   }
//   window.location.href = 'checkout.html';
// }
// function updateCartCount() {
//   const cartCountEl = document.getElementById('cart-count');
//   if (cartCountEl) {
//     cartCountEl.textContent = cart.length;
//   }
// }
// function checkout() {
//   if (cart.length === 0) {
//     alert('Shporta është bosh. Shto produkte para se të vazhdosh.');
//     return;
//   }
//   window.location.href = 'checkout.html';
// }
// renderCart();
// updateCartCount();


// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Render cart on page
function renderCart() {
  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Shporta është bosh.</p>';
    cartTotal.textContent = '';
    return;
  }

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';

    itemEl.innerHTML = `
      <div class="cart-details">
        <img src="${item.imageSrc}" alt="${item.title}" class="cart-thumbnail">
        <div class="cart-info">
          <span class="cart-title">${item.title}</span>
          <span class="cart-price">$${item.price}</span>
        </div>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">✖</button>
    `;

    cartContainer.appendChild(itemEl);
  });

  cartTotal.textContent = `Totali: $${total.toFixed(2)}`;
}

// Add product from product card
function addToCartFromCard(button) {
  const productCard = button.closest('.product-card');
  const title = productCard.querySelector('.product-title').textContent;
  const price = productCard.querySelector('.product-price').textContent.replace('$', '').trim();
  const imageSrc = productCard.querySelector('img').getAttribute('src');

  const item = {
    title,
    price,
    imageSrc
  };

  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Produkti u shtua në shportë!');
}

// Remove one item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Clear all items
function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();
}

// Go to checkout
function checkout() {
  if (cart.length === 0) {
    alert('Shporta është bosh. Shto produkte para se të vazhdosh.');
    return;
  }
  window.location.href = 'checkout.html';
}

// Update cart count (used in navbar/icon/etc)
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = cart.length;
  }
}

// Call on load
renderCart();
updateCartCount();
