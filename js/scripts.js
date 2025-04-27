document.addEventListener('DOMContentLoaded', () => {
  // hãy bỏ hẳn dòng sessionStorage.removeItem('username');

  const overlay  = document.getElementById('overlay');
  const modal    = document.getElementById('login-modal');
  const btnOpen  = document.getElementById('nav-login');
  const btnClose = document.getElementById('close-modal');
  const btnLogin = document.getElementById('btn-login');

  // Nếu thiếu phần tử nào, log ra để debug
  if (!overlay || !modal || !btnOpen || !btnClose || !btnLogin) {
    console.error('Missing element:', { overlay, modal, btnOpen, btnClose, btnLogin });
    return;
  }

  // scroll navbar
  window.addEventListener('scroll', () => {
    document.querySelector('nav')
      .classList.toggle('scrolled', window.scrollY > 50);
  });

  // show / hide modal
  function showModal() {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 20);
  }
  function hideModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }, 400);
  }

  // cập nhật nav khi đã login
  function updateNav() {
    const user = sessionStorage.getItem('username');
    if (user) {
      btnOpen.textContent = user;
      btnOpen.href = '#';
    }
  }

  // bật modal khi click login (nếu chưa login)
  btnOpen.addEventListener('click', e => {
    if (!sessionStorage.getItem('username')) {
      e.preventDefault();
      showModal();
    }
  });

  btnClose.addEventListener('click', hideModal);
  overlay.addEventListener('click', hideModal);

  // toggle password
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = btn.previousElementSibling;
      if (inp.type === 'password') {
        inp.type = 'text';
        btn.textContent = '🙈';
      } else {
        inp.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });
  document.querySelectorAll('nav a').forEach(a => {
    if (a.href.includes(location.pathname.split('/').pop()))
      a.classList.add('active');
  });
  

  // xử lý login
  btnLogin.addEventListener('click', () => {
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    if (!user || !pass) {
      alert('Vui lòng nhập tên và mật khẩu.');
      return;
    }
    sessionStorage.setItem('username', user);
    hideModal();
    updateNav();
  });

  // gọi lần đầu khi load page
  updateNav();
});

// ===== About‑Us Carousel =====
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.about-slider');
  if (!slider) return;

  const slidesEl = slider.querySelector('.slides');
  const slides = Array.from(slidesEl.children);
  const dotsCon = slider.querySelector('.dots');
  let idx = 0, timer;

  // Khởi tạo dots
  dotsCon.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.addEventListener('click', () => goTo(i));
    dotsCon.appendChild(btn);
  });
  const dots = Array.from(dotsCon.children);

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  function next() {
    goTo(idx + 1);
  }

  // Bật autoplay
  goTo(0);
  timer = setInterval(next, 4000);

  // Dừng khi hover, tiếp tục khi mouse leave
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => timer = setInterval(next, 4000));

  // Prev/Next buttons
  slider.querySelector('.prev').addEventListener('click', () => {
    clearInterval(timer);
    goTo(idx - 1);
  });
  slider.querySelector('.next').addEventListener('click', () => {
    clearInterval(timer);
    goTo(idx + 1);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 1) Dữ liệu mẫu cho 4 job (bạn bổ sung tương tự jobs[1])
  const jobs = {
    1: {
      title: 'Trợ lý điều hành CEO Auto Showroom',
      salary: 'Thỏa thuận',
      location: 'NEU Auto chi nhánh Hà Nội',
      experience: '1 năm',
      deadline: '09/05/2025',
      description: `
        <h3>🧾 MÔ TẢ CÔNG VIỆC – TRỢ LÝ CEO AUTO SHOWROOM</h3>
        <p><strong>📌 Chức danh:</strong> Trợ lý điều hành CEO</p>
        <p><strong>📍 Làm việc tại:</strong> NEU Auto – 207 Giải Phóng, Hà Nội</p>
        <p><strong>🕐 Thời gian làm việc:</strong> Full-time (8h00 – 17h30, nghỉ CN)</p>
  
        <h4>💼 MÔ TẢ CÔNG VIỆC</h4>
        <ul>
          <li>Hỗ trợ CEO trong công việc hàng ngày: sắp xếp lịch họp, quản lý lịch trình, chuẩn bị tài liệu, nhắc nhở công việc quan trọng.</li>
          <li>Giao tiếp & kết nối với các bộ phận nội bộ và khách hàng/đối tác thay mặt CEO.</li>
          <li>Theo dõi tiến độ các dự án kinh doanh, marketing, vận hành showroom, hỗ trợ CEO trong việc quản lý hiệu quả đội ngũ.</li>
          <li>Tiếp nhận và xử lý thông tin nhanh chóng, tổng hợp báo cáo định kỳ theo yêu cầu của CEO.</li>
          <li>Tham gia họp chiến lược, hội nghị khách hàng, sự kiện đặc biệt, ghi biên bản và báo cáo lại.</li>
          <li>Hỗ trợ CEO xây dựng hình ảnh cá nhân/truyền thông (nếu có hoạt động công khai hoặc trên mạng xã hội).</li>
        </ul>
  
        <h4>🎯 YÊU CẦU ỨNG VIÊN</h4>
        <ul>
          <li>Nữ từ 22–30 tuổi, ngoại hình ưa nhìn, phong thái chuyên nghiệp, lịch thiệp, chưa có người yêu.</li>
          <li>Tốt nghiệp Đại học các ngành: Quản trị kinh doanh, Kinh tế, Marketing, Ngoại ngữ,…</li>
          <li>Có ít nhất 1 năm kinh nghiệm làm trợ lý / thư ký / điều phối hoặc các công việc văn phòng tương đương.</li>
          <li>Kỹ năng giao tiếp và xử lý tình huống tốt. Khả năng tổ chức công việc và quản lý thời gian khoa học.</li>
          <li>Thành thạo Tin học văn phòng, Google Workspace, có thể viết email, tổng hợp báo cáo tốt.</li>
          <li>Chủ động, trung thực, bảo mật thông tin, có khả năng làm việc độc lập và chịu áp lực cao.</li>
          <li>Ưu tiên ứng viên có kinh nghiệm trong lĩnh vực ô tô / showroom / môi trường bán hàng cao cấp.</li>
        </ul>
  
        <h4>🎁 QUYỀN LỢI ĐƯỢC HƯỞNG</h4>
        <ul>
          <li>Mức lương cạnh tranh (Lương cơ bản + thưởng KPI + hỗ trợ ăn trưa)</li>
          <li>Môi trường làm việc chuyên nghiệp, hiện đại, cơ hội tiếp xúc với nhiều đối tác cao cấp.</li>
          <li>Cơ hội phát triển thành Trợ lý cấp cao / Thư ký Hội đồng / Giám sát điều hành.</li>
          <li>Được đào tạo về kỹ năng giao tiếp, vận hành showroom, ngành ô tô cao cấp.</li>
          <li>Du lịch, thưởng Lễ – Tết, chế độ BHXH đầy đủ theo quy định.</li>
        </ul>
      `,
      company: {
        logo: 'images/company1.png',
        name: 'CÔNG TY TNHH NEU AUTO VIỆT NAM',
        size: '250 nhân viên',
        industry: 'Bán Ô tô cao cấp & dịch vụ chăm sóc xe',
        address: '207 Giải Phóng, Hà Nội - Trụ sở chính',
        website: 'https://facebook.com/thanhahle2808'
      }
    },
    2: {
        title: 'Lễ tân Auto Showroom',
        salary: 'Thỏa thuận',
        location: 'NEU Auto chi nhánh Hà Nội',
        experience: '0–1 năm',
        deadline: '09/05/2025',
        description: `
          <h3>🧾 MÔ TẢ CÔNG VIỆC – LỄ TÂN AUTO SHOWROOM</h3>
          <p><strong>📌 Chức danh:</strong> Nhân viên Lễ tân Showroom</p>
          <p><strong>📍 Làm việc tại:</strong> NEU Auto – 207 Giải Phóng, Hà Nội</p>
          <p><strong>🕐 Thời gian làm việc:</strong> Full-time (8h00 – 17h30, nghỉ Chủ nhật hoặc xoay ca linh hoạt)</p>
      
          <h4>💼 MÔ TẢ CÔNG VIỆC</h4>
          <ul>
            <li>Đón tiếp và hướng dẫn khách hàng đến showroom một cách chuyên nghiệp, thân thiện và chu đáo.</li>
            <li>Trực tại khu vực lễ tân / quầy thông tin, tạo ấn tượng tốt ban đầu cho mọi khách đến tham quan hoặc giao dịch.</li>
            <li>Trả lời điện thoại, chuyển máy, ghi nhận thông tin khách hàng hoặc lịch hẹn cho bộ phận kinh doanh.</li>
            <li>Phối hợp với nhân viên sale để mời nước, giới thiệu sơ lược về sản phẩm/dịch vụ, mời khách ngồi chờ.</li>
            <li>Quản lý khu vực lễ tân gọn gàng, ngăn nắp, chuẩn bị brochure, danh thiếp, catalogue đầy đủ.</li>
            <li>Hỗ trợ công việc hành chính nhẹ như: đặt nước, văn phòng phẩm, theo dõi giấy tờ ký duyệt, chuyển phát nhanh.</li>
            <li>Hỗ trợ các hoạt động sự kiện, hội thảo, chương trình ra mắt xe mới tổ chức tại showroom.</li>
          </ul>
      
          <h4>🎯 YÊU CẦU ỨNG VIÊN</h4>
          <ul>
            <li>Nữ từ 20–27 tuổi, ngoại hình ưa nhìn, tác phong chuyên nghiệp, giao tiếp tốt.</li>
            <li>Tốt nghiệp Trung cấp / Cao đẳng / Đại học các ngành: Lễ tân, Du lịch, Thư ký văn phòng, Hành chính…</li>
            <li>Kỹ năng giao tiếp, ứng xử tình huống linh hoạt. Luôn giữ thái độ tích cực, hòa nhã với khách hàng.</li>
            <li>Thành thạo tin học văn phòng cơ bản (Word, Excel), biết sử dụng điện thoại bàn, ghi chép lịch trình.</li>
            <li>Có kinh nghiệm lễ tân là lợi thế, đặc biệt trong môi trường cao cấp như showroom xe, spa, khách sạn,…</li>
            <li>Ưu tiên người cẩn thận, tỉ mỉ, đúng giờ và giữ hình ảnh tốt cho công ty.</li>
          </ul>
      
          <h4>🎁 QUYỀN LỢI ĐƯỢC HƯỞNG</h4>
          <ul>
            <li>Thu nhập cạnh tranh: Lương cứng + thưởng lễ tết + thưởng dịch vụ.</li>
            <li>Môi trường làm việc hiện đại, sang trọng, chuyên nghiệp.</li>
            <li>Được đào tạo kỹ năng giao tiếp, dịch vụ khách hàng trong ngành xe cao cấp.</li>
            <li>Có cơ hội học hỏi và phát triển lên các vị trí: Thư ký, Trợ lý điều hành, Chuyên viên chăm sóc khách VIP.</li>
            <li>Tham gia các chương trình nội bộ, team building, du lịch định kỳ.</li>
          </ul>
        `,
        company: {
          logo: 'images/company1.png',
          name: 'CÔNG TY TNHH NEU AUTO VIỆT NAM',
          size: '250 nhân viên',
          industry: 'Bán Ô tô cao cấp & dịch vụ chăm sóc xe',
          address: '207 Giải Phóng, Hà Nội- Trụ sở chính',
          website: 'https://facebook.com/thanhahle2808'
        }
      },
    3: {
      title: 'Chuyên viên Kinh doanh Ô tô',
      salary: 'Thu nhập từ 15–30 triệu/tháng',
      location: 'NEU Auto Chi nhánh Đà Nẵng',
      experience: 'Không yêu cầu / Ưu tiên có kinh nghiệm',
      deadline: '09/05/2025',
      description: `
        <h3>🧾 MÔ TẢ CÔNG VIỆC – CHUYÊN VIÊN KINH DOANH Ô TÔ</h3>
        <p><strong>📌 Chức danh:</strong> Sales Executive</p>
        <p><strong>📍 Làm việc tại:</strong> NEU Auto – 207 Giải Phóng, Hà Nội</p>
        <p><strong>🕐 Thời gian làm việc:</strong> Full-time (8h00 – 17h30, nghỉ Chủ nhật)</p>
    
        <h4>💼 MÔ TẢ CÔNG VIỆC</h4>
        <ul>
          <li>Tư vấn khách hàng lựa chọn dòng xe phù hợp với nhu cầu và khả năng tài chính.</li>
          <li>Thực hiện các quy trình bán hàng: báo giá, hợp đồng, thủ tục trả góp, giao xe…</li>
          <li>Chăm sóc khách hàng trước, trong và sau bán hàng, xây dựng mối quan hệ lâu dài.</li>
          <li>Tìm kiếm và khai thác khách hàng tiềm năng thông qua mạng xã hội, gọi điện, sự kiện...</li>
          <li>Phối hợp cùng bộ phận kỹ thuật, đăng ký, bảo hiểm để hoàn tất thủ tục giao xe.</li>
          <li>Tham gia các hoạt động truyền thông, lái thử, sự kiện do showroom tổ chức.</li>
        </ul>
    
        <h4>🎯 YÊU CẦU ỨNG VIÊN</h4>
        <ul>
          <li>Nam/Nữ từ 20–30 tuổi, ngoại hình ưa nhìn, giao tiếp tốt.</li>
          <li>Không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản; ưu tiên ứng viên từng làm sale ô tô, bất động sản, bảo hiểm.</li>
          <li>Đam mê ô tô, có định hướng phát triển lâu dài trong lĩnh vực kinh doanh xe hơi.</li>
          <li>Chủ động, linh hoạt, có kỹ năng xử lý tình huống và làm việc theo nhóm.</li>
          <li>Biết sử dụng máy tính, Word, Excel cơ bản và các nền tảng mạng xã hội (Facebook, Zalo, TikTok...)</li>
        </ul>
    
        <h4>🎁 QUYỀN LỢI ĐƯỢC HƯỞNG</h4>
        <ul>
          <li>Lương cơ bản + % hoa hồng hấp dẫn + thưởng doanh số hàng tháng.</li>
          <li>Thu nhập trung bình từ 15–30 triệu/tháng (không giới hạn theo năng lực).</li>
          <li>Được đào tạo bài bản về sản phẩm, kỹ năng tư vấn, nghiệp vụ bán hàng ô tô.</li>
          <li>Môi trường trẻ trung, năng động, có cơ hội thăng tiến rõ ràng.</li>
          <li>Thưởng lễ, Tết, team building, du lịch định kỳ, chế độ BHXH đầy đủ theo luật.</li>
        </ul>
      `,
      company: {
        logo: 'images/company1.png',
        name: 'CÔNG TY TNHH NEU AUTO VIỆT NAM',
        size: '250 nhân viên',
        industry: 'Bán Ô tô cao cấp & dịch vụ chăm sóc xe',
        address: '207 Giải Phóng, Hà Nội - Trụ sở chính',
        website: 'https://facebook.com/thanhahle2808'
      }
    },    
    4: {
      title: 'Chuyên viên Kinh doanh Ô tô',
      salary: 'Thu nhập từ 15–30 triệu/tháng',
      location: 'NEU Auto Chi nhánh Tp. Hồ Chí Minh',
      experience: 'Không yêu cầu / Ưu tiên có kinh nghiệm',
      deadline: '09/05/2025',
      description: `
        <h3>🧾 MÔ TẢ CÔNG VIỆC – TIKTOKER / CONTENT CREATOR SHOWROOM Ô TÔ</h3>
    <p><strong>📌 Chức danh:</strong> TikToker – Content Creator</p>
    <p><strong>📍 Làm việc tại:</strong> NEU Auto – 207 Giải Phóng, Hà Nội</p>
    <p><strong>🕐 Thời gian làm việc:</strong> Full-time / Linh hoạt theo lịch quay nội dung</p>

    <h4>💼 MÔ TẢ CÔNG VIỆC</h4>
    <ul>
      <li>Tham gia xây dựng nội dung video ngắn (TikTok, Reels, Shorts) về xe, showroom, khách hàng, hoạt động nổi bật.</li>
      <li>Trực tiếp quay video, lên ý tưởng, bắt trend, thực hiện các dạng nội dung như: review xe, so sánh, vlog trải nghiệm, hậu trường...</li>
      <li>Tham gia các sự kiện truyền thông, chương trình lái thử, ra mắt sản phẩm mới và tạo nội dung xoay quanh các hoạt động này.</li>
      <li>Hợp tác với bộ phận marketing để triển khai chiến dịch sáng tạo hình ảnh thương hiệu.</li>
      <li>Tương tác với người xem, trả lời comment, giúp tăng reach và xây dựng cộng đồng fanpage/showroom trên TikTok.</li>
    </ul>

    <h4>🎯 YÊU CẦU ỨNG VIÊN</h4>
    <ul>
      <li>Nữ từ 18-23 tuổi, chưa có người yêu, ngoại hình ưa nhìn, phong thái tự tin, năng động, cao trên 1m65, biết nhảy dance cover.</li>
      <li>Có khả năng quay dựng video cơ bản, biết sử dụng app edit như CapCut, VN, Premiere (cơ bản).</li>
      <li>Yêu thích công việc sáng tạo nội dung, bắt trend nhanh, không ngại xuất hiện trước ống kính.</li>
      <li>Có kinh nghiệm làm TikTok cá nhân hoặc từng làm content là một lợi thế lớn.</li>
      <li>Có hiểu biết cơ bản hoặc đam mê với lĩnh vực ô tô là điểm cộng mạnh.</li>
    </ul>

    <h4>🎁 QUYỀN LỢI ĐƯỢC HƯỞNG</h4>
    <ul>
      <li>Thu nhập từ 10 – 20 triệu/tháng + thưởng theo hiệu suất và lượt tương tác.</li>
      <li>Làm việc trong môi trường trẻ, sáng tạo, được hỗ trợ phương tiện quay và hậu kỳ.</li>
      <li>Cơ hội trở thành gương mặt đại diện thương hiệu, phát triển hình ảnh cá nhân.</li>
      <li>Được dẫn dắt bởi team marketing chuyên nghiệp, học hỏi kỹ năng dựng video – storytelling – xây dựng thương hiệu cá nhân.</li>
      <li>Chế độ thưởng lễ, Tết, du lịch, team building định kỳ, BHXH đầy đủ.</li>
    </ul>
      `,
      company: {
        logo: 'images/company1.png',
        name: 'CÔNG TY TNHH NEU AUTO VIỆT NAM',
        size: '250 nhân viên',
        industry: 'Bán Ô tô cao cấp & dịch vụ chăm sóc xe',
        address: '207 Giải Phóng, Hà Nội - Trụ sở chính',
        website: 'https://facebook.com/thanhahle2808'
      }
    },
    
  };

  // 2) Lấy ID job từ query string, mặc định 1 nếu không hợp lệ
  const params = new URLSearchParams(window.location.search);
  const jobId  = params.get('job') || '1';
  const data   = jobs[jobId] || jobs[1];

  // 3) Tách selector ra biến + guard
  const titleEl       = document.querySelector('.job-title');
  const salaryEl      = document.querySelector('.salary');
  const locationEl    = document.querySelector('.location');
  const expEl         = document.querySelector('.experience');
  const deadlineEl    = document.querySelector('.deadline-date');
  const descEl        = document.querySelector('.description');

  if (titleEl)    titleEl.textContent      = data.title;
  if (salaryEl)   salaryEl.textContent     = data.salary;
  if (locationEl) locationEl.textContent   = data.location;
  if (expEl)      expEl.textContent        = data.experience;
  if (deadlineEl) deadlineEl.textContent    = data.deadline;
  if (descEl)     descEl.innerHTML         = data.description;

  const cmp = data.company || {};
  const logoEl    = document.querySelector('.company-logo');
  const nameEl    = document.querySelector('.company-name');
  const sizeEl    = document.querySelector('.company-size');
  const indEl     = document.querySelector('.company-industry');
  const addrEl    = document.querySelector('.company-address');
  const linkEl    = document.querySelector('.btn-link');

  if (logoEl) { logoEl.src = cmp.logo || ''; logoEl.alt = cmp.name || ''; }
  if (nameEl) nameEl.textContent        = cmp.name    || '';
  if (sizeEl) sizeEl.textContent        = cmp.size    || '';
  if (indEl)  indEl.textContent         = cmp.industry|| '';
  if (addrEl) addrEl.textContent        = cmp.address || '';
  if (linkEl) linkEl.href               = cmp.website || '#';

  // 4) Animation
  const jobDetailEl = document.querySelector('.job-detail');
  const companyEl   = document.querySelector('.company-info');
  setTimeout(() => {
    jobDetailEl?.classList.add('enter-up');
    companyEl?.classList.add('enter-right');
  }, 150);

  // 5) Modal “Ứng tuyển”
  const applyBtn   = document.querySelector('.apply-btn');
  const modalOv    = document.getElementById('apply-modal');
  const modalClose = modalOv?.querySelector('.modal-close');
  const applyForm  = document.getElementById('apply-form');

  if (applyBtn && modalOv && modalClose && applyForm) {
    applyBtn.addEventListener('click', e => {
      e.preventDefault();
      modalOv.classList.remove('hidden');
    });
    modalClose.addEventListener('click', () => modalOv.classList.add('hidden'));
    modalOv.addEventListener('click', e => {
      if (e.target === modalOv) modalOv.classList.add('hidden');
    });
    applyForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(applyForm);
      alert(`Cảm ơn ${fd.get('applicantName')}! Chúng tôi đã nhận hồ sơ.`);
      applyForm.reset();
      modalOv.classList.add('hidden');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const filterItems = document.querySelectorAll('.car-filters li');
  const carCards    = document.querySelectorAll('.car-card');

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // 1. Active state
      document.querySelector('.car-filters li.active')
              .classList.remove('active');
      item.classList.add('active');

      // 2. Lọc
      const filter = item.dataset.filter;
      carCards.forEach(card => {
        const brand = card.dataset.brand;
        if (filter === 'all' || brand === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const filterItems = document.querySelectorAll('.car-filters li');
  const carCards    = document.querySelectorAll('.car-card');
  const viewMoreBtn = document.getElementById('view-more');

  // Hàm ẩn hiện lại cards với giới hạn 6 khi filter="all"
  function applyShowAll(limit = 6) {
    carCards.forEach((card, idx) => {
      if (idx < limit) card.classList.remove('hidden');
      else              card.classList.add('hidden');
    });
    viewMoreBtn.style.display = 'block';
  }
  // Hàm show tất cả
  function showAll() {
    carCards.forEach(card => card.classList.remove('hidden'));
    viewMoreBtn.style.display = 'none';
  }

  // Khởi tạo: chỉ show 6
  applyShowAll();

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // Active state
      document.querySelector('.car-filters li.active')
              .classList.remove('active');
      item.classList.add('active');

      const filter = item.dataset.filter;

      // Nếu filter="all"
      if (filter === 'all') {
        applyShowAll();
      } else {
        // Hiện tất cả matching, ẩn phần còn lại
        carCards.forEach(card => {
          if (card.dataset.brand === filter) card.classList.remove('hidden');
          else                                card.classList.add('hidden');
        });
        viewMoreBtn.style.display = 'none';
      }
    });
  });

  // Xem thêm
  viewMoreBtn.addEventListener('click', () => {
    showAll();
  });
});
// js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // === Login Modal + Navbar Scroll (giữ nguyên) ===
  // …

  // === INDEX PAGE: FILTER + GRID + VIEW MORE ===
  const grid = document.getElementById('cars-grid');
  if (grid) {
    const filters = document.querySelectorAll('.car-filters li');
    const viewMoreBtn = document.getElementById('view-more');
    let currentFilter = 'all';
    let showingAll = false;

    // render cars vào grid (hàm chung)
    function renderCars(list) {
      grid.innerHTML = list.map(p => `
        <a href="product-detail.html?id=${p.id}"
           class="car-card"
           data-brand="${p.brand}">
          <img src="${p.mainImg}" alt="${p.title}">
          <div class="card-info">
            <h3>${p.title}</h3>
            <p class="price">${p.price}</p>
          </div>
        </a>
      `).join('');
    }

    // khi bấm filter
    filters.forEach(li => {
      li.addEventListener('click', () => {
        filters.forEach(x=>x.classList.remove('active'));
        li.classList.add('active');
        currentFilter = li.dataset.filter;
        showingAll = false;

        let filtered = currentFilter === 'all'
          ? products
          : products.filter(p => p.brand === currentFilter);

        renderCars(filtered.slice(0,6));
        viewMoreBtn.style.display = filtered.length > 6 ? 'inline-block' : 'none';
      });
    });

    // view more click
    viewMoreBtn.addEventListener('click', () => {
      showingAll = true;
      let filtered = currentFilter === 'all'
        ? products
        : products.filter(p => p.brand === currentFilter);
      renderCars(filtered);
      viewMoreBtn.style.display = 'none';
    });

    // init: show 6 all
    renderCars(products.slice(0,6));
    viewMoreBtn.style.display = products.length > 6 ? 'inline-block' : 'none';
  }

  // === PRODUCT DETAIL PAGE ===
  const detailContainer = document.getElementById('product-container');
  if (detailContainer) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const prod = products.find(p => p.id === id);

    if (!prod) {
      detailContainer.innerHTML = '<p>Sản phẩm không tồn tại</p>';
      return;
    }

    // render chi tiết
    detailContainer.innerHTML = `
      <nav class="breadcrumb">
        <a href="index.html">Trang chủ</a> &raquo;
        <a href="#filter-cars">Danh sách xe</a> &raquo;
        <span>${prod.title}</span>
      </nav>
      <div class="detail-wrapper">
        <div class="detail-image">
          <img src="${prod.mainImg}" alt="${prod.title}">
        </div>
        <div class="detail-info">
          <h1>${prod.title}</h1>
          <p class="overview">
            ${prod.overview.year} • ${prod.overview.kilometers} • ${prod.overview.category} • ${prod.overview.fuel}
          </p>
          <div class="price">${prod.price}</div>
          <div class="info-box">
            ${Object.entries(prod.specs).map(([k,v]) =>
              `<div><span>${k}:</span><span>${v}</span></div>`
            ).join('')}
          </div>
          <button class="chat-button">Chat với Tư vấn viên</button>
        </div>
      </div>
    `;
  }
});

