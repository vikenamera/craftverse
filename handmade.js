// DOM Elements
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.product-card');
const priceDisplay = document.getElementById('price-display');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const cartCountEl = document.getElementById('cart-count');

// Initialize filters
[minPriceInput, maxPriceInput, ...filters].forEach(el => {
  if (el) el.addEventListener('input', applyFilters);
});

// Apply filters
function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('input[data-filter="category"]:checked'))
    .map(cb => cb.value);

  let minPrice = parseInt(minPriceInput.value);
  let maxPrice = parseInt(maxPriceInput.value);

  if (minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  priceDisplay.textContent = `${minPrice} - ${maxPrice}+ Lekë`;

  cards.forEach(card => {
    const category = card.dataset.category;
    const priceText = card.querySelector('.product-price').textContent;
    const price = parseInt(priceText.replace(/\D/g, '')) || 0;

    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchPrice = price >= minPrice && price <= maxPrice;

    card.style.display = (matchCategory && matchPrice) ? 'block' : 'none';
  });
}

// Add to cart
function addToCartFromCard(button) {
  const productCard = button.closest('.product-card');
  const title = productCard.querySelector('.product-title').textContent.trim();
  const priceText = productCard.querySelector('.product-price').textContent;
  const price = parseInt(priceText.replace(/\D/g, '')) || 0;
  const imageSrc = productCard.querySelector('img').getAttribute('src');
  const quantityInput = productCard.querySelector('.product-quantity');
  const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(item =>
    item.title === title && item.price === price && item.imageSrc === imageSrc
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ title, price, imageSrc, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showAlert('Produkti u shtua në shportë!');
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountEl) cartCountEl.textContent = totalQty;
}

// Alert message
function showAlert(message) {
  const alertBox = document.getElementById('custom-alert');
  if (!alertBox) return;

  alertBox.textContent = message;
  alertBox.classList.remove('hidden');
  alertBox.classList.add('show');

  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 300);
  }, 2500);
}


// Initial load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  applyFilters();
});
