const storageKey = 'casa-azahar-demo-cart';
const phone = '34673998497';
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

const productMeta = {
  alba: { name: 'Ramo Alba', price: 42, sprite: 'sprite-1' },
  tulipanes: { name: 'Tulipanes de Abril', price: 34, sprite: 'sprite-2' },
  'luz-blanca': { name: 'Luz Blanca', price: 48, sprite: 'sprite-3' },
  jardin: { name: 'Jardín Silvestre', price: 38, sprite: 'sprite-4' },
  carmin: { name: 'Ramo Carmín', price: 52, sprite: 'sprite-5' },
  calma: { name: 'Calma', price: 46, sprite: 'sprite-6' }
};

let cart = {};
try { cart = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { cart = {}; }

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const cartDrawer = $('[data-cart]');
const overlay = $('[data-overlay]');
const cartItems = $('[data-cart-items]');
const cartEmpty = $('[data-cart-empty]');
const cartFooter = $('[data-cart-footer]');
const toast = $('[data-toast]');
let toastTimer;

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function cartQuantity() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.classList.add('cart-open');
  $('[data-cart-close]', cartDrawer)?.focus();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.classList.remove('cart-open');
}

function changeQuantity(id, amount) {
  cart[id] = (cart[id] || 0) + amount;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  const entries = Object.entries(cart).filter(([id, quantity]) => productMeta[id] && quantity > 0);
  const count = cartQuantity();
  $$('[data-cart-count]').forEach(element => element.textContent = count);
  cartEmpty.hidden = entries.length > 0;
  cartFooter.hidden = entries.length === 0;
  cartItems.hidden = entries.length === 0;
  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = productMeta[id];
    return `<article class="cart-item">
      <div class="cart-thumb sprite ${product.sprite}" aria-hidden="true"></div>
      <div><h3>${product.name}</h3><p>${euro.format(product.price)}</p><div class="quantity"><button type="button" data-quantity="-1" data-id="${id}" aria-label="Quitar una unidad">−</button><span>${quantity}</span><button type="button" data-quantity="1" data-id="${id}" aria-label="Añadir una unidad">+</button></div></div>
      <button class="remove" type="button" data-remove data-id="${id}">Quitar</button>
    </article>`;
  }).join('');

  const total = entries.reduce((sum, [id, quantity]) => sum + productMeta[id].price * quantity, 0);
  $('[data-cart-total]').textContent = euro.format(total);
}

$$('[data-add]').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  showToast(`${button.dataset.product} añadido a la cesta`);
}));

cartItems.addEventListener('click', event => {
  const quantityButton = event.target.closest('[data-quantity]');
  const removeButton = event.target.closest('[data-remove]');
  if (quantityButton) changeQuantity(quantityButton.dataset.id, Number(quantityButton.dataset.quantity));
  if (removeButton) {
    delete cart[removeButton.dataset.id];
    saveCart();
    renderCart();
  }
});

$$('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
$$('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });

$('[data-checkout]').addEventListener('click', () => {
  const lines = Object.entries(cart).map(([id, quantity]) => `• ${quantity} × ${productMeta[id].name} — ${euro.format(productMeta[id].price * quantity)}`);
  const total = Object.entries(cart).reduce((sum, [id, quantity]) => sum + productMeta[id].price * quantity, 0);
  const message = [
    'Hola, he preparado este pedido de demostración en Casa Azahar:',
    '',
    ...lines,
    '',
    `Subtotal: ${euro.format(total)}`,
    '',
    'Sé que es una demo y quiero información sobre una web similar para mi negocio.'
  ].join('\n');
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

let activeFilter = 'todos';
const searchInput = $('[data-search]');
function applyFilters() {
  const search = searchInput.value.trim().toLocaleLowerCase('es');
  let visible = 0;
  $$('.product-card').forEach(card => {
    const categoryMatch = activeFilter === 'todos' || card.dataset.category === activeFilter;
    const searchMatch = card.dataset.name.toLocaleLowerCase('es').includes(search);
    card.hidden = !(categoryMatch && searchMatch);
    if (!card.hidden) visible += 1;
  });
  $('[data-no-results]').hidden = visible > 0;
}

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  $$('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
  applyFilters();
}));
searchInput.addEventListener('input', applyFilters);

$$('[data-occasion]').forEach(link => link.addEventListener('click', () => {
  activeFilter = link.dataset.occasion;
  $$('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeFilter));
  applyFilters();
}));

const menuToggle = $('[data-menu-toggle]');
const nav = $('[data-nav]');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('a', nav).forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

$('[data-year]').textContent = new Date().getFullYear();
renderCart();
