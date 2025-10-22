/* script.js
   Toàn bộ logic cho index.html (Typed.js, GSAP, ScrollReveal, Dark Mode, Loader, Render posts/projects, Form)
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================
     LOADER
     Hide loader after window load (or 1s fallback)
  ========================== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 600);
    }
  });
  // Fallback hide after 2s if load event didn't fire
  setTimeout(() => { if (loader) loader.remove(); }, 2000);


  /* ==========================
     TYPED.JS — hero typing
  ========================== */
  if (document.querySelector('#typing') && typeof Typed !== 'undefined') {
    new Typed('#typing', {
      strings: ['Full Stack Developer', 'AI Enthusiast', 'Tech Blogger'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
      showCursor: true,
    });
  }


  /* ==========================
     DARK MODE + persistence
  ========================== */
  const darkToggle = document.getElementById('darkModeToggle');
  const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light'
  if (savedTheme === 'dark') document.body.classList.add('dark');

  function updateDarkIcon() {
    if (!darkToggle) return;
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }
  updateDarkIcon();

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      updateDarkIcon();
    });
  }


  /* ==========================
     RENDER PROJECTS & BLOG (dynamic)
  ========================== */
  const projects = [
    {
      id: 'p-ai',
      name: 'AI Chatbot Support',
      desc: 'Hệ thống hỗ trợ khách hàng tự động bằng NLP & Machine Learning.',
      img: 'https://i.ibb.co/pbQF2hz/project1.jpg',
      link: '#'
    },
    {
      id: 'p-task',
      name: 'TaskFlow App',
      desc: 'Ứng dụng quản lý công việc nhóm thời gian thực với WebSocket.',
      img: 'https://i.ibb.co/k1bfDfL/project2.jpg',
      link: '#'
    },
    {
      id: 'p-dataviz',
      name: 'DataViz Dashboard',
      desc: 'Bảng điều khiển trực quan hóa dữ liệu bằng D3.js và Flask API.',
      img: 'https://i.ibb.co/0n8pYxd/project3.jpg',
      link: '#'
    }
  ];

  const posts = [
    {
      id: 'b-ai-vs-dev',
      title: 'AI có thay thế lập trình viên?',
      excerpt: 'Góc nhìn cá nhân sau 1 năm ứng dụng AI trong công việc lập trình.',
      img: 'https://i.ibb.co/0hkYvpx/blog1.jpg',
      link: 'post.html?id=1'
    },
    {
      id: 'b-flask-api',
      title: 'REST API với Flask trong 30 phút',
      excerpt: 'Hướng dẫn tạo API RESTful nhanh gọn bằng Python Flask.',
      img: 'https://i.ibb.co/x8CZzGp/blog2.jpg',
      link: 'post.html?id=2'
    },
    {
      id: 'b-dark-mode',
      title: 'Dark Mode trong UX hiện đại',
      excerpt: 'Lý do vì sao dark mode là tiêu chuẩn UI mới.',
      img: 'https://i.ibb.co/FxgpbSb/blog3.jpg',
      link: 'post.html?id=3'
    }
  ];

  // render projects
  const projectContainer = document.getElementById('projectContainer');
  if (projectContainer) {
    projectContainer.innerHTML = projects.map(p => `
      <div class="project-card" data-id="${p.id}">
        <img src="${p.img}" alt="${escapeHtml(p.name)}">
        <div class="project-info">
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.desc)}</p>
          <a href="${p.link}" class="btn-small">Xem chi tiết</a>
        </div>
      </div>
    `).join('');
  }

  // render blog posts
  const blogContainer = document.getElementById('blogContainer');
  if (blogContainer) {
    blogContainer.innerHTML = posts.map(b => `
      <article class="blog-card">
        <img src="${b.img}" alt="${escapeHtml(b.title)}">
        <div class="blog-info">
          <h3>${escapeHtml(b.title)}</h3>
          <p>${escapeHtml(b.excerpt)}</p>
          <a class="read-more" href="${b.link}">Đọc thêm →</a>
        </div>
      </article>
    `).join('');
  }

  // search filter for blog
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
      if (blogContainer) {
        blogContainer.innerHTML = filtered.map(b => `
          <article class="blog-card">
            <img src="${b.img}" alt="${escapeHtml(b.title)}">
            <div class="blog-info">
              <h3>${escapeHtml(b.title)}</h3>
              <p>${escapeHtml(b.excerpt)}</p>
              <a class="read-more" href="${b.link}">Đọc thêm →</a>
            </div>
          </article>
        `).join('');
      }
    });
  }


  /* ==========================
     FORM HANDLER (simulated)
  ========================== */
  window.handleContact = function (evt) {
    evt.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const status = document.getElementById('contactStatus');

    if (!name || !email || !message) {
      status.textContent = 'Vui lòng điền đầy đủ thông tin.';
      status.style.color = '#e63946';
      return;
    }
    status.textContent = 'Đang gửi...';
    status.style.color = '';

    // simulate network delay
    setTimeout(() => {
      status.textContent = '✅ Tin nhắn đã gửi! Cảm ơn bạn — mình sẽ trả lời trong vòng vài ngày.';
      status.style.color = '#16a34a';
      document.getElementById('contactForm').reset();
    }, 900);
  };


  /* ==========================
     SCROLL, BackToTop, smooth helpers
  ========================== */
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // show/hide backToTop based on scroll
  const backToTop = document.getElementById('backToTop');
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (backToTop) backToTop.style.display = (y > 500 ? 'inline-block' : 'none');

    // header compact on scroll
    if (header) {
      if (y > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  });


  /* ==========================
     MOBILE MENU TOGGLE (simple)
  ========================== */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav .nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }


  /* ==========================
     GSAP & ScrollReveal Animations
  ========================== */
  // hero avatar parallax (requires gsap & ScrollTrigger)
  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      const heroAvatar = document.querySelector('.hero-avatar');
      if (heroAvatar) {
        gsap.to(heroAvatar, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }
    }
  } catch (err) {
    // ignore if ScrollTrigger not available
    // console.warn('GSAP/ScrollTrigger error', err);
  }

  // ScrollReveal for sections
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ distance: '40px', duration: 800, easing: 'ease-out', reset: false });
    sr.reveal('.hero-right', { origin: 'right', delay: 200 });
    sr.reveal('.hero-left', { origin: 'left', delay: 300 });
    sr.reveal('.project-card', { interval: 120, origin: 'bottom' });
    sr.reveal('.blog-card', { interval: 120, origin: 'bottom' });
    sr.reveal('.contact-card, .contact-info', { origin: 'bottom', interval: 120 });
  }


  /* ==========================
     SMALL UI HELPERS
  ========================== */
  // downloadCV function (open cv.pdf if exists)
  window.downloadCV = function () {
    const url = 'cv.pdf'; // replace with your actual CV path or external link
    // Try to open; if not exist, show alert
    fetch(url, { method: 'HEAD' })
      .then(res => {
        if (res.ok) window.open(url, '_blank');
        else alert('CV chưa được upload — vui lòng chỉnh sửa script.js để gắn link tới file CV.');
      })
      .catch(() => alert('CV chưa được upload — vui lòng chỉnh sửa script.js để gắn link tới file CV.'));
  };

  // small html escape helper
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  /* ==========================
     INIT: subtle entrance for main elements (GSAP)
  ========================== */
  if (typeof gsap !== 'undefined') {
    gsap.from('.site-header', { y: -30, opacity: 0, duration: 0.6 });
    gsap.from('.hero-right h1', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });
    gsap.from('.hero-right h2', { y: 20, opacity: 0, duration: 0.8, delay: 0.35 });
    gsap.from('.hero-right p', { y: 8, opacity: 0, duration: 0.8, delay: 0.45 });
    gsap.from('.hero-ctas button, .hero-ctas a', { scale: 0.95, opacity: 0, stagger: 0.08, duration: 0.45, delay: 0.6 });
  }

}); // end DOMContentLoaded
// ===== Hiệu ứng động thanh kỹ năng (Progress Bar Animation) =====
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar div");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power3.out"
        });
        observer.unobserve(bar); // Chạy 1 lần duy nhất
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
});

// Hiệu ứng khi cuộn đến phần giới thiệu
const animatedEls = document.querySelectorAll('[data-animate]');
window.addEventListener('scroll', () => {
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});
