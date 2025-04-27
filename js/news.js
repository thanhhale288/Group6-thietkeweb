// js/news.js

// 1. Mảng 4 bài báo (id chỉ để tracking, hiện tại chúng ta đều link về news.html)
export const posts = [
    {
      id: 'trump-rollsroyce',
      title: '🔥 Chấn Động: Trump Mua Rolls-Royce Tại NEU Auto!',
      date: '24 Tháng 4, 2025',
      excerpt: 'Một thương vụ khiến cả showroom Hà Nội phải trầm trồ khi ông Trump bất ngờ ghé qua và...',
      image: 'images/news1-1.png'
    },
    {
      id: 'ceo-wonyoung-rumor',
      title: '💥 Tin Đồn: CEO NEU Auto Hẹn Hò Wonyoung?',
      date: '25 Tháng 4, 2025',
      excerpt: 'Bức ảnh uống trà chanh cùng Jang Wonyoung lan truyền chóng mặt khiến cư dân mạng không khỏi...',
      image: 'images/news2-1.png'
    },
    {
      id: 'neu-auto-stock-surge',
      title: '📈 NEU Auto Tím Sàn Sau “Thương Vụ Trump”',
      date: '26 Tháng 4, 2025',
      excerpt: 'Giá cổ phiếu tăng vọt 150% sau khi ông Trump “chốt đơn” siêu xe Cullinan và...',
      image: 'images/news3-1.png'
    },
    {
      id: 'neu-auto-porsche-award',
      title: '🎓 CEO NEU Auto Tặng Porsche Cho Thủ Khoa!',
      date: '27 Tháng 4, 2025',
      excerpt: 'Tại lễ tốt nghiệp, thủ khoa NEU đã không tin vào mắt mình khi nhận phần thưởng là...',
      image: 'images/news4-1.png'
    }
];

document.addEventListener('DOMContentLoaded', () => {
  const mainGrid = document.getElementById('posts-grid');
  const sideGrid = document.getElementById('recent-grid');

  posts.forEach(p => {
    // ==== Main section ====
    const card = document.createElement('a');
    card.href = `news-data.html?id=${p.id}`;
    card.className = 'post-card';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="post-info">
        <h3>${p.title}</h3>
        <p class="date">${p.date}</p>
        <p class="excerpt">${p.excerpt}</p>
      </div>
    `;
    mainGrid.appendChild(card);

    // ==== Sidebar “Bài viết” ====
    const item = document.createElement('a');
    item.href = `news-data.html?id=${p.id}`;
    item.className = 'recent-card';
    item.setAttribute('data-id', p.id);
    item.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="recent-info">
        <p class="title">${p.title}</p>
        <p class="date">${p.date}</p>
      </div>
    `;
    sideGrid.appendChild(item);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // ... code hiện bài vào #posts-grid và #recent-grid ...

  // 1) Lấy danh sách các phần tử
  const postEls   = Array.from(document.querySelectorAll('.posts-grid .post-card'));
  const recentEls = Array.from(document.querySelectorAll('.recent-posts .recent-card'));

  // 2) Thêm animate với độ trễ
  postEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('animate'), 100 * (i + 1));
  });

  recentEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('animate'), 150 * (i + 1));
  });
});


