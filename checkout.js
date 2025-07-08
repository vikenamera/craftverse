let cart = JSON.parse(localStorage.getItem('cart')) || [];

function getTotal() {
  return cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
}

function updateTotal() {
  const totalEl = document.getElementById('total-amount');
  totalEl.textContent = `Totali: $${getTotal()}`;
}

function toggleCardFields() {
  const method = document.getElementById('payment-method').value;
  const cardFields = document.getElementById('card-fields');
  cardFields.classList.toggle('hidden', method !== 'card');
}

function formatCardNumber() {
  const input = document.getElementById('card-number');
  let value = input.value.replace(/\D/g, '').substring(0, 16);
  value = value.replace(/(.{4})/g, '$1 ').trim();
  input.value = value;
}

function handleBuy() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const payment = document.getElementById('payment-method').value;

  if (!name || !email || !address) {
    alert('Ju lutemi plotësoni të gjitha fushat.');
    return;
  }

  if (payment === 'card') {
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert('Ju lutemi plotësoni të gjitha të dhënat e kartës.');
      return;
    }
  }

  // Simulate transaction and reset cart
  localStorage.removeItem('cart');
  cart = [];

  document.getElementById('checkout-form').style.display = 'none';
  document.getElementById('thank-you').style.display = 'block';
}

function goToShop() {
  window.location.href = 'index.html'; // Update to your real shop page
}

// Initialize
updateTotal();
