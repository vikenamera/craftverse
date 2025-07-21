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


// // DOM Elements
// const filters = document.querySelectorAll('.filter');
// const cards = document.querySelectorAll('.product-card');
// const priceDisplay = document.getElementById('price-display');
// const minPriceInput = document.getElementById('min-price');
// const maxPriceInput = document.getElementById('max-price');
// const cartCountEl = document.getElementById('cart-count');

// // Debounce function for smoother filtering
// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// // Initialize filters with debounced event listeners
// const debouncedApplyFilters = debounce(applyFilters, 150);

// [minPriceInput, maxPriceInput, ...filters].forEach(el => {
//   if (el) {
//     if (el.type === 'range' || el.type === 'number') {
//       el.addEventListener('input', debouncedApplyFilters);
//     } else {
//       el.addEventListener('input', applyFilters);
//     }
//   }
// });

// // Set max price limit and initialize
// if (minPriceInput) {
//   minPriceInput.max = 5000;
//   if (!minPriceInput.value) minPriceInput.value = 0;
// }
// if (maxPriceInput) {
//   maxPriceInput.max = 5000;
//   if (!maxPriceInput.value) maxPriceInput.value = 5000;
// }

// // Apply filters function
// function applyFilters() {
//   const selectedCategories = Array.from(document.querySelectorAll('input[data-filter="category"]:checked'))
//     .map(cb => cb.value);
  
//   let minPrice = parseInt(minPriceInput?.value || 0);
//   let maxPrice = parseInt(maxPriceInput?.value || 5000);
  
//   // Ensure max price doesn't exceed 5000
//   maxPrice = Math.min(maxPrice, 5000);
//   minPrice = Math.max(minPrice, 0);
  
//   // Auto-correct if min > max
//   if (minPrice > maxPrice) {
//     [minPrice, maxPrice] = [maxPrice, minPrice];
//     if (minPriceInput) minPriceInput.value = minPrice;
//     if (maxPriceInput) maxPriceInput.value = maxPrice;
//   }
  
//   // Update price display
//   if (priceDisplay) {
//     const displayMax = maxPrice === 5000 ? '5000+' : maxPrice;
//     priceDisplay.textContent = `${minPrice} - ${displayMax} Lekë`;
//   }
  
//   // Filter cards with smooth animation
//   cards.forEach(card => {
//     const category = card.dataset.category;
//     const priceText = card.querySelector('.product-price')?.textContent || '0';
//     const price = parseInt(priceText.replace(/\D/g, '')) || 0;
    
//     const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
//     const matchPrice = price >= minPrice && (maxPrice === 5000 ? price >= minPrice : price <= maxPrice);
    
//     const shouldShow = matchCategory && matchPrice;
    
//     // Smooth show/hide animation
//     if (shouldShow) {
//       card.style.opacity = '0';
//       card.style.display = 'block';
//       card.style.transform = 'translateY(10px)';
      
//       // Trigger reflow
//       card.offsetHeight;
      
//       card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
//       card.style.opacity = '1';
//       card.style.transform = 'translateY(0)';
//     } else {
//       card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
//       card.style.opacity = '0';
//       card.style.transform = 'translateY(-10px)';
      
//       setTimeout(() => {
//         if (card.style.opacity === '0') {
//           card.style.display = 'none';
//         }
//       }, 200);
//     }
//   });
// }

// // Add to cart function (keeping your existing logic but removing localStorage)
// function addToCartFromCard(button) {
//   const productCard = button.closest('.product-card');
//   const title = productCard.querySelector('.product-title')?.textContent.trim();
//   const priceText = productCard.querySelector('.product-price')?.textContent || '0';
//   const price = parseInt(priceText.replace(/\D/g, '')) || 0;
//   const imageSrc = productCard.querySelector('img')?.getAttribute('src');
//   const quantityInput = productCard.querySelector('.product-quantity');
//   const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
  
//   // Using a global cart variable instead of localStorage
//   window.cart = window.cart || [];
  
//   const existingIndex = window.cart.findIndex(item =>
//     item.title === title && item.price === price && item.imageSrc === imageSrc
//   );
  
//   if (existingIndex !== -1) {
//     window.cart[existingIndex].quantity += quantity;
//   } else {
//     window.cart.push({ title, price, imageSrc, quantity });
//   }
  
//   updateCartCount();
//   showAlert('Produkti u shtua në shportë!');
// }

// // Update cart count
// function updateCartCount() {
//   const cart = window.cart || [];
//   const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
//   if (cartCountEl) cartCountEl.textContent = totalQty;
// }

// // Alert message with smoother animation
// function showAlert(message) {
//   const alertBox = document.getElementById('custom-alert');
//   if (!alertBox) return;
  
//   alertBox.textContent = message;
//   alertBox.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
//   alertBox.classList.remove('hidden');
  
//   // Trigger reflow
//   alertBox.offsetHeight;
  
//   alertBox.classList.add('show');
  
//   setTimeout(() => {
//     alertBox.classList.remove('show');
//     setTimeout(() => {
//       alertBox.classList.add('hidden');
//     }, 300);
//   }, 2500);
// }
// document.addEventListener('DOMContentLoaded', function() {
//   // Create filter toggle button if it doesn't exist
//   if (!document.querySelector('.filter-toggle')) {
//     const toggleBtn = document.createElement('button');
//     toggleBtn.className = 'filter-toggle';
//     toggleBtn.textContent = 'Filters';
    
//     const shopFilters = document.querySelector('.shop-filters');
//     if (shopFilters && shopFilters.parentNode) {
//       shopFilters.parentNode.insertBefore(toggleBtn, shopFilters);
//     }
//   }
  
//   // Toggle functionality
//   const toggleBtn = document.querySelector('.filter-toggle');
//   const shopFilters = document.querySelector('.shop-filters');
  
//   if (toggleBtn && shopFilters) {
//     toggleBtn.addEventListener('click', function() {
//       shopFilters.classList.toggle('filter-open');
//     });
    
//     // Close on clicking the X
//     shopFilters.addEventListener('click', function(e) {
//       const rect = shopFilters.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
      
//       if (window.innerWidth <= 768 && x > rect.width - 60 && y < 60) {
//         shopFilters.classList.remove('filter-open');
//       }
//     });
    
//     // Close on clicking outside
//     document.addEventListener('click', function(e) {
//       if (window.innerWidth <= 768 && 
//           shopFilters.classList.contains('filter-open') && 
//           !shopFilters.contains(e.target) && 
//           !toggleBtn.contains(e.target)) {
//         shopFilters.classList.remove('filter-open');
//       }
//     });
    
//     // Close on escape key
//     document.addEventListener('keydown', function(e) {
//       if (e.key === 'Escape' && shopFilters.classList.contains('filter-open')) {
//         shopFilters.classList.remove('filter-open');
//       }
//     });
//   }
// });
// // Initial load
// document.addEventListener('DOMContentLoaded', () => {
//   updateCartCount();
//   applyFilters();
  
//   // Add CSS for smooth transitions if not already present
//   if (!document.getElementById('filter-animations')) {
//     const style = document.createElement('style');
//     style.id = 'filter-animations';
//     style.textContent = `
//       .product-card {
//         transition: opacity 0.3s ease, transform 0.3s ease;
//       }
      
//       #custom-alert {
//         transition: opacity 0.3s ease, transform 0.3s ease;
//       }
      
//       #custom-alert.show {
//         opacity: 1;
//         transform: translateY(0);
//       }
      
//       #custom-alert.hidden {
//         opacity: 0;
//         transform: translateY(-20px);
//       }
//     `;
//     document.head.appendChild(style);
//   }
// });