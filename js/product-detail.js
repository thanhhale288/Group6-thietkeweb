// js/product-detail.js
import { products } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  const params    = new URLSearchParams(location.search);
  const id        = params.get('id');
  const prod      = products.find(p => p.id === id);

  const wrapper   = document.getElementById('detail-wrapper');
  const imgEl     = document.getElementById('main-image');
  const titleEl   = document.getElementById('product-title');
  const overviewEl= document.getElementById('product-overview');
  const priceEl   = document.getElementById('product-price');
  const specsEl   = document.getElementById('product-specs');

  if (!prod) {
    wrapper.innerHTML = `<p style="text-align:center; padding:50px;">Xin lỗi, sản phẩm không tồn tại.</p>`;
    return;
  }

  // Gán dữ liệu
  imgEl.src            = prod.mainImg;
  imgEl.alt            = prod.title;
  titleEl.textContent  = prod.title;
  overviewEl.textContent = 
    `${prod.overview.year} • ${prod.overview.kilometers} • ${prod.overview.category} • ${prod.overview.fuel}`;
  priceEl.textContent  = prod.price;

  specsEl.innerHTML = Object.entries(prod.specs)
    .map(([k,v]) => `<div><span>${k}:</span><span>${v}</span></div>`)
    .join('');
    setTimeout(() => {
      document.querySelector('.detail-image')?.classList.add('enter');
      document.querySelector('.detail-info')?.classList.add('enter');
    }, 50);
  });
// trong scripts.js (sau khi DOM đã load)
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
// product-detail.js hoặc scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.chat-button');
  if (btn) {
    btn.addEventListener('click', () => {
      window.open('https://www.facebook.com/thanhhale2808', '_blank', 'noopener');
    });
  }
});
