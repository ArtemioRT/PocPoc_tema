// ============================================================
// PETSHOP THEME — JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ── Tab switching (Gatos / Perros) ──────────────────────
  window.switchTab = function (pet, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + pet).classList.add('active');
  };

  // ── Sticky header shrink ────────────────────────────────
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
    }
  });

  // ── Category cards entrance animation ──────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.category-card, .product-card, .benefit-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ── Add to cart feedback ────────────────────────────────
  document.querySelectorAll('.add-to-cart-mini, .product-quick-add').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.innerHTML;
      this.innerHTML = '✓';
      this.style.background = 'var(--forest)';
      setTimeout(() => { this.innerHTML = original; }, 1500);
    });
  });

});

// ── Cart AJAX ────────────────────────────────────────────
window.addToCart = function(variantId, btn) {
  const orig = btn ? btn.innerHTML : '';
  if (btn) { btn.innerHTML = '✓ Agregado'; btn.style.background = 'var(--forest)'; }
  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: variantId, quantity: 1 })
  }).then(r => r.json())
    .then(() => {
      if (btn) setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1500);
      updateCartCount();
    }).catch(console.error);
};

window.quickAdd = function(e, variantId) {
  e.preventDefault();
  addToCart(variantId, e.currentTarget);
};

window.toggleWishlist = function(e, btn) {
  e.preventDefault();
  btn.innerHTML = btn.innerHTML === '♡' ? '♥' : '♡';
  btn.style.color = btn.innerHTML === '♥' ? 'var(--terracotta)' : '';
};

function updateCartCount() {
  fetch('/cart.js').then(r => r.json()).then(cart => {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? 'flex' : 'none';
    }
  });
}
