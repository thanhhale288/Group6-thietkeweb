// js/news-detail.js
import { articles } from './news-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id');
  const art    = articles.find(a => a.id === id);

  const heroEl   = document.getElementById('hero-detail');
  const contentEl= document.getElementById('article-content');

  if (!art) {
    heroEl.innerHTML = '<p>Bài viết không tồn tại</p>';
    return;
  }

  // render hero banner
  heroEl.style.backgroundImage = `url("${art.image}")`;
  heroEl.innerHTML = `
    <div class="hero-overlay">
      <h1>${art.title}</h1>
      <div class="meta">
        <span>By ${art.author}</span> ／ 
        <span>${art.date}</span> ／ 
        <span>${art.category}</span>
      </div>
    </div>`;

  // render nội dung (có thể include <img> trong art.content)
  contentEl.innerHTML = art.content;
});

