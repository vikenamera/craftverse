const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.product-card');
const priceValue = document.getElementById('price-value');

filters.forEach(filter => {
  filter.addEventListener('input', applyFilters);
});

function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('input[data-filter="category"]:checked')).map(cb => cb.value);
  const selectedColor = document.querySelector('select[data-filter="color"]').value;
  const maxPrice = document.getElementById('price-range').value;
  priceValue.textContent = `Up to $${maxPrice}`;

  cards.forEach(card => {
    const category = card.dataset.category;
    const color = card.dataset.color;
    const price = parseFloat(card.dataset.price);

    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchColor = !selectedColor || selectedColor === color;
    const matchPrice = price <= maxPrice;

    card.style.display = (matchCategory && matchColor && matchPrice) ? 'block' : 'none';
  });
}

// function toggleFilters() {
//   document.getElementById('filters').classList.toggle('collapsed');
// }

// function addToCart(title, price) {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   cart.push({ title, price });
//   localStorage.setItem('cart', JSON.stringify(cart));
//   window.location.href = 'cart.html';
// }

function addToCartFromCard(button) {
  const productMeta = button.closest('.product-meta');
  const title = productMeta.querySelector('.product-title')?.innerText.trim();
  const priceText = productMeta.querySelector('.product-price')?.innerText.trim();
  const price = parseFloat(priceText.replace('$', ''));

  // Get image by going up to .product-card and finding .product-image
  const productCard = button.closest('.product-card');
  const image = productCard.querySelector('.product-image')?.src || '';

  // Save to localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ title, price, imageSrc: image });
  localStorage.setItem('cart', JSON.stringify(cart));

  // Optional: redirect to cart page
  window.location.href = 'cart.html';
}