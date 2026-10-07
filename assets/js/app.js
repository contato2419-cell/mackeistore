/**
 * MACKEI ✦ Moda Autoral & Peças por Encomenda
 * App JavaScript: Catálogo, Filtros, Quick View, Smart Cart & WhatsApp Checkout
 */

// Official WhatsApp Phone Number for the Store (Goiânia, GO)
const STORE_WHATSAPP_NUMBER = "5562999999999"; // Format: 55 + DDD + Número

// Product Catalog Data with real uploaded photos and made-to-order details
const PRODUCTS = [
  {
    id: 1,
    name: "Calça Baggy Cristais Cascata",
    category: "Denim Couture",
    price: 489.00,
    image: "assets/images/calca-cristais-cascata.png",
    badge: "Bestseller ✦ Feito à mão",
    badgeType: "badge-red",
    description: "Calça wide-leg em denim premium lavagem média, com aplicação manual e artesanal de cascata de cristais e strass facetados nos quadris e bolsos frontais. Modelagem solta, caimento impecável e brilho deslumbrante sob a luz.",
    sizes: ["36", "38", "40", "42", "44", "Sob Medida"],
    composition: "100% Algodão Premium + Cristais Sintéticos Lapidados",
    details: "Cós médio-alto, passantes reforçados, fechamento por zíper e botão metálico. Confecção artesanal sob encomenda."
  },
  {
    id: 2,
    name: "Calça Flare Rendada Sol",
    category: "Denim Couture",
    price: 449.00,
    image: "assets/images/calca-flare-renda-amarela.png",
    badge: "Edição Limitada",
    badgeType: "",
    description: "Calça flare em jeans vintage wash com fendas laterais inferiores que revelam nesgas amplas de renda guipir floral amarela manteiga, cós contrastante e aplicação de flores em renda nos bolsos posteriores. Peça autoral de movimento único.",
    sizes: ["34", "36", "38", "40", "42", "Sob Medida"],
    composition: "Denim 100% Algodão + Renda Guipir Floral Amarela Manteiga",
    details: "Modelagem flare ajustada no quadril com abertura ampla, recortes artesanais nas laterais e flores guipir nos bolsos traseiros."
  },
  {
    id: 3,
    name: "Top Frente Única Joia Strass",
    category: "Tops & Corsets",
    price: 389.00,
    image: "assets/images/top-frente-unica-joia.png",
    badge: "✦ Joia Vestível",
    badgeType: "badge-red",
    description: "Top lenço frente única em cetim estruturado preto fosco, com cravação exuberante de pedrarias cristais em degradê e franjas de pingentes lapidados que criam efeito cascata e balanço hipnótico ao caminhar. Fechamento ajustável no pescoço e costas.",
    sizes: ["PP", "P", "M", "G", "Sob Medida"],
    composition: "Cetim Encorpado com forro duplo de toque suave + Cristais de Vidro Lapidado",
    details: "Amarrações acetinadas reguláveis no pescoço e costas, franja de cristais com caimento pontiagudo em V."
  },
  {
    id: 4,
    name: "Bermuda Jorts Denim Rendada Vinho",
    category: "Shorts & Jorts",
    price: 369.00,
    image: "assets/images/bermuda-jorts-renda-vinho.png",
    badge: "Novo Drop",
    badgeType: "",
    description: "Bermuda jorts oversized em jeans azul clássico com barra desfiada artesanal e fendas laterais ousadas forradas em renda chantilly bordô vinho. Conforto urbano com contraste de texturas de alta costura.",
    sizes: ["36", "38", "40", "42", "44", "Sob Medida"],
    composition: "Denim 100% Algodão + Renda Francesa Chantilly Bordô",
    details: "Comprimento abaixo do joelho, fenda lateral profunda estruturada, acabamento desfiado manual."
  }
];

// App State Management
const state = {
  cart: [],
  activeFilter: 'all',
  selectedModalProduct: null,
  selectedModalSize: null,
  selectedCardSizes: {} // productId -> selected size
};

// DOM Element References
const DOM = {
  productsGrid: document.getElementById('productsGrid'),
  filterPills: document.querySelectorAll('.filter-pill'),
  cartBadge: document.getElementById('cartBadge'),
  cartOpenBtn: document.getElementById('cartOpenBtn'),
  cartCloseBtn: document.getElementById('cartCloseBtn'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItemsContainer: document.getElementById('cartItemsContainer'),
  cartItemsCountText: document.getElementById('cartItemsCountText'),
  summarySubtotal: document.getElementById('summarySubtotal'),
  summaryDiscount: document.getElementById('summaryDiscount'),
  summaryShipping: document.getElementById('summaryShipping'),
  summaryTotal: document.getElementById('summaryTotal'),
  shippingProgressBar: document.getElementById('shippingProgressBar'),
  shippingProgressText: document.getElementById('shippingProgressText'),
  
  // Checkout Form
  clientNameInput: document.getElementById('clientNameInput'),
  clientCityInput: document.getElementById('clientCityInput'),
  paymentMethodSelect: document.getElementById('paymentMethodSelect'),
  customNotesInput: document.getElementById('customNotesInput'),
  whatsappCheckoutBtn: document.getElementById('whatsappCheckoutBtn'),

  // Quick View Modal
  productModalOverlay: document.getElementById('productModalOverlay'),
  productModal: document.getElementById('productModal'),
  productModalContent: document.getElementById('productModalContent'),
  productModalCloseBtn: document.getElementById('productModalCloseBtn'),

  // Size Guide Modal
  sizeGuideOverlay: document.getElementById('sizeGuideOverlay'),
  sizeGuideModal: document.getElementById('sizeGuideModal'),
  sizeGuideCloseBtn: document.getElementById('sizeGuideCloseBtn'),
  openSizeGuideBtn: document.getElementById('openSizeGuideBtn'),
  closeSizeGuideModalBtn: document.getElementById('closeSizeGuideModalBtn'),

  // Mobile Drawer
  mobileMenuBtn: document.getElementById('mobileMenuBtn'),
  mobileDrawerCloseBtn: document.getElementById('mobileDrawerCloseBtn'),
  mobileDrawerOverlay: document.getElementById('mobileDrawerOverlay'),
  mobileNavDrawer: document.getElementById('mobileNavDrawer'),
  mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),

  // Search Modal
  searchTriggerBtn: document.getElementById('searchTriggerBtn'),
  searchModal: document.getElementById('searchModal'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  searchResultsBox: document.getElementById('searchResultsBox'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  initDefaultSizes();
  renderProducts();
  setupEventListeners();
  updateCartUI();
  initHeroSlider();
});

function initDefaultSizes() {
  PRODUCTS.forEach(p => {
    state.selectedCardSizes[p.id] = p.sizes[1] || p.sizes[0];
  });
}

// ==========================================================================
// RENDER PRODUCT CATALOG
// ==========================================================================
function renderProducts() {
  if (!DOM.productsGrid) return;

  const filtered = state.activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === state.activeFilter);

  DOM.productsGrid.innerHTML = '';

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    const pixPrice = (product.price * 0.95).toFixed(2).replace('.', ',');
    const formattedPrice = product.price.toFixed(2).replace('.', ',');
    const installmentPrice = (product.price / 3).toFixed(2).replace('.', ',');
    const currentSize = state.selectedCardSizes[product.id] || product.sizes[0];

    const sizeChipsHtml = product.sizes.map(size => `
      <button class="size-chip ${size === currentSize ? 'active' : ''}" 
              data-product-id="${product.id}" 
              data-size="${size}" 
              onclick="selectCardSize(${product.id}, '${size}', event)">
        ${size}
      </button>
    `).join('');

    card.innerHTML = `
      <div class="product-image-box">
        ${product.badge ? `<span class="product-tag-badge ${product.badgeType || ''}">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        
        <div class="product-card-actions">
          <button class="action-btn" onclick="openProductModal(${product.id})">
            Ver Detalhes
          </button>
          <button class="action-btn" onclick="quickAddToCart(${product.id})">
            + Sacola
          </button>
        </div>
      </div>

      <div class="product-details">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        
        <div class="product-pricing">
          <span class="price-main">R$ ${formattedPrice}</span>
          <span class="price-pix">R$ ${pixPrice} no PIX (5% OFF)</span>
          <span class="price-installments">ou 3x de R$ ${installmentPrice} sem juros</span>
        </div>

        <div class="product-size-chips">
          ${sizeChipsHtml}
        </div>
      </div>
    `;

    DOM.productsGrid.appendChild(card);
  });
}

// Select size on product card directly
window.selectCardSize = function(productId, size, event) {
  if (event) event.stopPropagation();
  state.selectedCardSizes[productId] = size;
  
  // Update chip active classes on this card
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    const chips = card.querySelectorAll('.size-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-size') === size) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }
};

// ==========================================================================
// CART LOGIC & PERSISTENCE
// ==========================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('mackei_cart');
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    state.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('mackei_cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

// Quick add from card
window.quickAddToCart = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = state.selectedCardSizes[productId] || product.sizes[0];
  addToCart(product, chosenSize, '');
};

function addToCart(product, size, customMeasures) {
  // Check if identical item with same size and measures already exists
  const existingIndex = state.cart.findIndex(item => 
    item.id === product.id && item.size === size && item.customMeasures === customMeasures
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      customMeasures: customMeasures || '',
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
  triggerBadgeAnimation();
  showToast(`✦ ${product.name} (${size}) adicionada à sacola!`);
}

function updateCartUI() {
  // Total Quantity for Badge
  const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartBadge.textContent = totalQty;
  DOM.cartItemsCountText.textContent = `(${totalQty} ${totalQty === 1 ? 'item' : 'itens'})`;

  // Render items in Drawer
  if (state.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h4 class="empty-cart-title">Sua sacola está vazia</h4>
        <p class="empty-cart-sub">Explore nossas criações autorais sob encomenda e personalize sua peça ideal.</p>
        <button class="btn btn-outline" onclick="closeCartDrawer(); window.location.href='#catalogo';">
          Explorar Peças
        </button>
      </div>
    `;
    
    // Reset calculations
    DOM.summarySubtotal.textContent = 'R$ 0,00';
    DOM.summaryDiscount.textContent = '- R$ 0,00';
    DOM.summaryTotal.textContent = 'R$ 0,00';
    DOM.shippingProgressBar.style.width = '0%';
    DOM.shippingProgressText.innerHTML = `Adicione mais <strong>R$ 600,00</strong> para <strong>Frete Grátis</strong>!`;
    return;
  }

  // Populate items
  DOM.cartItemsContainer.innerHTML = state.cart.map((item, index) => {
    const formattedItemPrice = (item.price * item.quantity).toFixed(2).replace('.', ',');

    return `
      <div class="cart-item" data-cart-index="${index}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        
        <div class="cart-item-content">
          <div class="cart-item-header">
            <h4 class="cart-item-title">${item.name}</h4>
            <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remover item">&times;</button>
          </div>

          <div class="cart-item-variant">Tamanho: <strong>${item.size}</strong></div>
          
          ${item.size === 'Sob Medida' ? `
            <div class="cart-item-measure-notes">
              ✂ Medidas: ${item.customMeasures ? item.customMeasures : 'Informar no campo abaixo'}
            </div>
          ` : ''}

          <div class="cart-item-footer">
            <div class="cart-qty-control">
              <button class="qty-btn" onclick="updateItemQuantity(${index}, -1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">R$ ${formattedItemPrice}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Calculations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isPixSelected = DOM.paymentMethodSelect.value.includes('PIX');
  const pixDiscount = isPixSelected ? subtotal * 0.05 : 0;
  const total = subtotal - pixDiscount;

  DOM.summarySubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  DOM.summaryDiscount.textContent = `- R$ ${pixDiscount.toFixed(2).replace('.', ',')}`;
  DOM.summaryTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

  // Free shipping progress (R$ 600 target)
  const freeShippingThreshold = 600;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  DOM.shippingProgressBar.style.width = `${progressPercent}%`;

  if (subtotal >= freeShippingThreshold) {
    DOM.shippingProgressText.innerHTML = `🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong> para todo o Brasil!`;
    DOM.summaryShipping.textContent = 'Grátis ✦';
  } else {
    const diff = (freeShippingThreshold - subtotal).toFixed(2).replace('.', ',');
    DOM.shippingProgressText.innerHTML = `Faltam <strong>R$ ${diff}</strong> para <strong>Frete Grátis</strong>!`;
    DOM.summaryShipping.textContent = 'Calculado no WhatsApp';
  }
}

window.updateItemQuantity = function(index, delta) {
  if (!state.cart[index]) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
};

window.removeCartItem = function(index) {
  if (!state.cart[index]) return;
  const removedName = state.cart[index].name;
  state.cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
  showToast(`Peça "${removedName}" removida da sacola.`);
};

function triggerBadgeAnimation() {
  DOM.cartBadge.classList.add('bounce');
  setTimeout(() => DOM.cartBadge.classList.remove('bounce'), 350);
}

// Drawer Open/Close
function openCartDrawer() {
  DOM.cartOverlay.classList.add('active');
  DOM.cartDrawer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  DOM.cartOverlay.classList.remove('active');
  DOM.cartDrawer.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================================================
// SMART WHATSAPP CHECKOUT GENERATOR
// ==========================================================================
function handleWhatsAppCheckout() {
  if (state.cart.length === 0) {
    showToast('Sua sacola está vazia! Adicione peças antes de finalizar.', 'error');
    return;
  }

  const clientName = DOM.clientNameInput.value.trim();
  const clientCity = DOM.clientCityInput.value.trim();
  const paymentMethod = DOM.paymentMethodSelect.value;
  const customNotes = DOM.customNotesInput.value.trim();

  // Highlight inputs if missing without native browser alerts!
  let hasError = false;
  if (!clientName) {
    DOM.clientNameInput.parentElement.classList.add('field-error');
    hasError = true;
  } else {
    DOM.clientNameInput.parentElement.classList.remove('field-error');
  }

  if (!clientCity) {
    DOM.clientCityInput.parentElement.classList.add('field-error');
    hasError = true;
  } else {
    DOM.clientCityInput.parentElement.classList.remove('field-error');
  }

  if (hasError) {
    showToast('Por favor, preencha seu Nome e Cidade/UF para a encomenda.', 'error');
    return;
  }

  // Calculate totals
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isPix = paymentMethod.includes('PIX');
  const pixDiscount = isPix ? subtotal * 0.05 : 0;
  const totalFinal = subtotal - pixDiscount;
  const isFreeShipping = subtotal >= 600;

  // Format Items Breakdown
  let itemsBreakdown = '';
  state.cart.forEach((item, i) => {
    const itemSubtotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
    itemsBreakdown += `▪ *${item.name}*\n`;
    itemsBreakdown += `  • Quantidade: ${item.quantity}x (R$ ${itemSubtotal})\n`;
    itemsBreakdown += `  • Tamanho: ${item.size}\n`;
    if (item.customMeasures) {
      itemsBreakdown += `  • Medidas informadas: ${item.customMeasures}\n`;
    }
    itemsBreakdown += `\n`;
  });

  // Construct Structured WhatsApp Message with Elegant Layout
  const message = 
`✨ *NOVO PEDIDO DE ENCOMENDA - MACKEI ATELIER* ✨
Olá Lia! Gostaria de encomendar as seguintes peças pelo site oficial da MACKEI:

📦 *PEÇAS SELECIONADAS:*
------------------------------------
${itemsBreakdown}------------------------------------
💰 *RESUMO DO PEDIDO:*
• Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}
• Forma de Pagamento: ${paymentMethod}
${isPix ? `• Desconto PIX (5%): - R$ ${pixDiscount.toFixed(2).replace('.', ',')}\n` : ''}• Frete: ${isFreeShipping ? 'Grátis (Pedido acima de R$ 600) ✦' : 'A calcular para meu CEP'}
• *TOTAL ESTIMADO: R$ ${totalFinal.toFixed(2).replace('.', ',')}*

📍 *DADOS DA CLIENTE:*
• Nome: ${clientName}
• Cidade / UF: ${clientCity}
${customNotes ? `• Observações / Medidas Gerais: ${customNotes}\n` : ''}
✦ Aguardo a confirmação do prazo de confecção e dados de pagamento!`;

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  showToast('Redirecionando para o WhatsApp do ateliê...', 'success');
  
  // Open WhatsApp in new tab
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 400);
}

// ==========================================================================
// QUICK VIEW PRODUCT MODAL
// ==========================================================================
window.openProductModal = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.selectedModalProduct = product;
  state.selectedModalSize = product.sizes[0];

  const formattedPrice = product.price.toFixed(2).replace('.', ',');
  const pixPrice = (product.price * 0.95).toFixed(2).replace('.', ',');
  const installmentPrice = (product.price / 3).toFixed(2).replace('.', ',');

  const sizeButtonsHtml = product.sizes.map((s, idx) => `
    <button class="modal-size-btn ${idx === 0 ? 'active' : ''}" 
            data-size="${s}" 
            onclick="setModalSelectedSize('${s}')">
      ${s}
    </button>
  `).join('');

  DOM.productModalContent.innerHTML = `
    <div class="modal-gallery">
      <img src="${product.image}" alt="${product.name}" class="modal-main-img">
    </div>

    <div class="modal-product-info">
      <div>
        <span class="modal-product-kicker">${product.category} • AUTORAL</span>
        <h2 class="modal-product-title">${product.name}</h2>
      </div>

      <div class="modal-pricing">
        <div class="modal-price-val">R$ ${formattedPrice}</div>
        <div class="modal-pix-val">R$ ${pixPrice} à vista no PIX (5% OFF)</div>
        <div class="price-installments">ou em até 3x de R$ ${installmentPrice} sem juros</div>
      </div>

      <p class="modal-desc">${product.description}</p>

      <div class="modal-options-block">
        <div class="modal-label">
          <span>Selecione seu Tamanho:</span>
          <span class="open-guide-link" onclick="openSizeGuideModal()">Ver Guia de Medidas ↗</span>
        </div>
        <div class="modal-size-grid" id="modalSizeGrid">
          ${sizeButtonsHtml}
        </div>
      </div>

      <div class="modal-custom-measure-box" id="modalCustomMeasureField" style="display: none;">
        <label style="display:block; font-size:0.75rem; font-weight:700; margin-bottom:4px; color: var(--accent-red);">
          ✂ Informar suas medidas corporais (Cintura, Quadril, Comprimento):
        </label>
        <input type="text" id="modalMeasureInput" placeholder="Ex: Cintura: 70cm, Quadril: 100cm, Altura: 1,68m">
      </div>

      <div class="modal-cta-group">
        <button class="btn btn-primary btn-block" onclick="addModalProductToCart()">
          <span>Adicionar à Sacola de Encomenda</span>
        </button>
      </div>

      <div class="about-features" style="margin-top: 10px; gap: 8px;">
        <div class="about-feature-item">
          <span class="af-icon">✂</span>
          <div>
            <strong>Confecção Manual</strong>
            <p style="font-size: 0.78rem;">Produzida individualmente no ateliê em Goiânia.</p>
          </div>
        </div>
        <div class="about-feature-item">
          <span class="af-icon">📦</span>
          <div>
            <strong>Envio Seguro para Todo o Brasil</strong>
            <p style="font-size: 0.78rem;">Rastreamento detalhado via Correios/Transportadora.</p>
          </div>
        </div>
      </div>

    </div>
  `;

  DOM.productModalOverlay.classList.add('active');
  DOM.productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.setModalSelectedSize = function(size) {
  state.selectedModalSize = size;
  
  const buttons = document.querySelectorAll('.modal-size-btn');
  buttons.forEach(b => {
    if (b.getAttribute('data-size') === size) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  const customField = document.getElementById('modalCustomMeasureField');
  if (customField) {
    if (size === 'Sob Medida') {
      customField.style.display = 'block';
    } else {
      customField.style.display = 'none';
    }
  }
};

window.addModalProductToCart = function() {
  if (!state.selectedModalProduct) return;

  const size = state.selectedModalSize || state.selectedModalProduct.sizes[0];
  const measureInput = document.getElementById('modalMeasureInput');
  const measures = measureInput ? measureInput.value.trim() : '';

  addToCart(state.selectedModalProduct, size, measures);
  closeProductModal();
};

function closeProductModal() {
  DOM.productModalOverlay.classList.remove('active');
  DOM.productModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================================================
// SIZE GUIDE MODAL
// ==========================================================================
function openSizeGuideModal() {
  DOM.sizeGuideOverlay.classList.add('active');
  DOM.sizeGuideModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSizeGuideModal() {
  DOM.sizeGuideOverlay.classList.remove('active');
  DOM.sizeGuideModal.classList.remove('active');
  if (!DOM.productModal.classList.contains('active') && !DOM.cartDrawer.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// SEARCH MODAL & INSTANT FILTER
// ==========================================================================
function openSearchModal() {
  DOM.searchModal.classList.add('active');
  DOM.searchInput.focus();
}

function closeSearchModal() {
  DOM.searchModal.classList.remove('active');
  DOM.searchInput.value = '';
  DOM.searchResultsBox.innerHTML = '<p class="search-hint">Digite para buscar peças da coleção autoral...</p>';
}

function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    DOM.searchResultsBox.innerHTML = '<p class="search-hint">Digite para buscar peças da coleção autoral...</p>';
    return;
  }

  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    DOM.searchResultsBox.innerHTML = `<p class="search-hint">Nenhuma peça encontrada para "${query}".</p>`;
    return;
  }

  DOM.searchResultsBox.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick="openProductModal(${p.id}); closeSearchModal();">
      <img src="${p.image}" alt="${p.name}" class="search-result-img">
      <div>
        <div class="search-result-title">${p.name}</div>
        <div class="search-result-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// TOAST NOTIFICATIONS (ZERO NATIVE ALERTS)
// ==========================================================================
function showToast(text, type = 'info') {
  if (!DOM.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span>${text}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3800);
}

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
  // Cart Drawer
  DOM.cartOpenBtn.addEventListener('click', openCartDrawer);
  DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  DOM.cartOverlay.addEventListener('click', closeCartDrawer);

  // Payment Method change updates summary
  DOM.paymentMethodSelect.addEventListener('change', updateCartUI);

  // WhatsApp Checkout Button
  DOM.whatsappCheckoutBtn.addEventListener('click', handleWhatsAppCheckout);

  // Category Filters
  DOM.filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      DOM.filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.getAttribute('data-category');
      renderProducts();
    });
  });

  // Desktop Nav Filter clicks
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link[data-filter]');
  desktopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      state.activeFilter = filter;
      DOM.filterPills.forEach(p => {
        if (p.getAttribute('data-category') === filter) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
      renderProducts();
    });
  });

  // Mobile Drawer
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.mobileNavDrawer.classList.add('active');
    DOM.mobileDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMobileNav = () => {
    DOM.mobileNavDrawer.classList.remove('active');
    DOM.mobileDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  DOM.mobileDrawerCloseBtn.addEventListener('click', closeMobileNav);
  DOM.mobileDrawerOverlay.addEventListener('click', closeMobileNav);

  DOM.mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      if (filter) {
        state.activeFilter = filter;
        DOM.filterPills.forEach(p => {
          if (p.getAttribute('data-category') === filter) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        renderProducts();
      }
      closeMobileNav();
    });
  });

  // Modals Close
  DOM.productModalCloseBtn.addEventListener('click', closeProductModal);
  DOM.productModalOverlay.addEventListener('click', closeProductModal);

  DOM.sizeGuideCloseBtn.addEventListener('click', closeSizeGuideModal);
  DOM.sizeGuideOverlay.addEventListener('click', closeSizeGuideModal);
  DOM.closeSizeGuideModalBtn.addEventListener('click', closeSizeGuideModal);
  if (DOM.openSizeGuideBtn) {
    DOM.openSizeGuideBtn.addEventListener('click', openSizeGuideModal);
  }

  // Search Modal
  DOM.searchTriggerBtn.addEventListener('click', openSearchModal);
  DOM.searchClearBtn.addEventListener('click', closeSearchModal);
  DOM.searchInput.addEventListener('input', handleSearchInput);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeProductModal();
      closeSizeGuideModal();
      closeSearchModal();
      closeMobileNav();
    }
  });
}

// ==========================================================================
// HERO SLIDER (HORIZONTAL TRACK SLIDE - NO FADE)
// ==========================================================================
function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const heroSec = document.getElementById('heroSection');
  
  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayTimer = null;

  function updateSlider() {
    // 3 slides in a 300% width container: slide 0 = 0%, slide 1 = -33.333333%, slide 2 = -66.666666%
    const offset = currentSlide * (100 / totalSlides);
    track.style.transform = `translateX(-${offset}%)`;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        currentSlide = idx;
        updateSlider();
        startAutoPlay();
      }
    });
  });

  if (heroSec) {
    heroSec.addEventListener('mouseenter', stopAutoPlay);
    heroSec.addEventListener('mouseleave', startAutoPlay);
  }

  updateSlider();
  startAutoPlay();
}
