/* ============================================
   JUNJIE AI LAB · main.js
   首载 loading / 打字机 / 滚动渐入 / 档案筛选 / 一言 / tilt
   ============================================ */

/* ---------- 首载 Loading ---------- */
(function bootSequence() {
  const boot = document.getElementById('boot');
  const bootText = document.getElementById('boot-text');
  const lines = [
    '> JUNJIE AI LAB v1.0 初始化中...',
    '> 加载 RAG 模块 ........ OK',
    '> 加载 Agent 引擎 ...... OK',
    '> 加载端侧推理 ......... OK',
    '> 加载实验档案 007 份 .. OK',
    '> 系统就绪，欢迎访问 🤖'
  ];
  let i = 0;
  const typeLine = () => {
    if (i >= lines.length) {
      setTimeout(() => boot.classList.add('hidden'), 500);
      setTimeout(() => boot.remove(), 1200);
      return;
    }
    bootText.textContent += lines[i] + '\n';
    i++;
    setTimeout(typeLine, 130);
  };
  // 页面加载完成后开始（避免白屏闪烁）
  window.addEventListener('load', () => setTimeout(typeLine, 350));
})();

/* ---------- 打字机 ---------- */
(function typewriter() {
  const el = document.getElementById('typing');
  const roles = [
    'AI 应用开发师',
    'RAG 系统实践者',
    'Agent 工程爱好者',
    '端侧 AI 探索者',
    'Java 全栈开发者'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  const tick = () => {
    const word = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 90);
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
      setTimeout(tick, 40);
    }
  };
  tick();
})();

/* ---------- GSAP 全套动效（opening + 滚动进场 + parallax） ---------- */
(function gsapAnimations() {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Opening Animation：首屏强视觉进场（boot 结束后）
  const bootTl = gsap.timeline({ delay: 1.9, defaults: { ease: 'power3.out' } });
  bootTl
    .from('.avatar-wrap', { scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(1.6)' })
    .from('.hero-name', { y: 110, opacity: 0, duration: 1.0 }, '-=0.7')
    .from('.hero-typing', { y: 46, opacity: 0, duration: 0.7, filter: 'blur(8px)' }, '-=0.6')
    .from('.hero-slogan', { y: 64, opacity: 0, duration: 0.9, filter: 'blur(14px)' }, '-=0.7')
    .from('.hero-meta', { y: 30, opacity: 0, duration: 0.6 }, '-=0.5')
    .from('.hero-actions .btn', { y: 36, opacity: 0, stagger: 0.1, duration: 0.55 }, '-=0.4')
    .from('.daily-quote', { opacity: 0, duration: 0.6 }, '-=0.2');

  // 2. 每个模块：英文标题大幅进场 → 中文标题遮罩揭开 → 描述跟进
  gsap.utils.toArray('.section').forEach((section) => {
    const en = section.querySelector('.section-en');
    const zh = section.querySelector('.section-title');
    const desc = section.querySelector('.section-desc, .contact-desc');
    const filterBar = section.querySelector('.filter-bar');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', once: true }
    });
    if (en) tl.from(en, { y: 70, x: -20, opacity: 0, duration: 0.85 }, 0);
    if (zh) tl.from(zh, { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.8, ease: 'power4.inOut' }, '-=0.7');
    if (desc) tl.from(desc, { y: 28, opacity: 0, duration: 0.65 }, '-=0.5');
    if (filterBar) tl.from(filterBar, { y: 40, opacity: 0, duration: 0.6 }, '-=0.4');
  });

  // 3. 卡片依次出现（ScrollTrigger.batch 官方方案，快节奏）
  const animItems = gsap.utils.toArray('.archive, .ability-card, .wf-step, .tl-item, .cloud-tag, .contact-links');
  gsap.set(animItems, { y: 56, opacity: 0 });
  ScrollTrigger.batch(animItems, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
      clearProps: 'transform,opacity'
    })
  });

  // 4. 档案封面：clip-path 遮罩揭开 + 轻微 parallax
  gsap.utils.toArray('.archive-cover').forEach((cover) => {
    const img = cover.querySelector('.cover-img');
    if (!img) return;
    gsap.fromTo(img,
      { clipPath: 'inset(0% 0% 100% 0%)', yPercent: -6 },
      {
        clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0,
        duration: 1.1, ease: 'power3.inOut',
        scrollTrigger: { trigger: cover, start: 'top 90%', once: true }
      }
    );
    gsap.to(img, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });
  });
})();

/* ---------- 档案筛选 ---------- */
(function archiveFilter() {
  const bar = document.getElementById('filter-bar');
  const cards = document.querySelectorAll('.archive');
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || cats.includes(filter);
      if (show) {
        card.classList.remove('hidden-card');
        // 清除 GSAP 残留的 inline 样式，避免卡片保持透明/偏移
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
        card.classList.remove('fade-in');
        void card.offsetWidth; // 触发重排以重启动画
        card.classList.add('fade-in');
      } else {
        card.classList.add('hidden-card');
      }
    });
  });
})();

/* ---------- 今日一言 ---------- */
(function dailyQuote() {
  const el = document.getElementById('daily-quote');
  const quotes = [
    '“RAG 的终点不是检索到文档，而是生成对答案。”',
    '“模型决定上限，工程决定下限。”',
    '“把 Bad Case 收集起来，模型才会成长。”',
    '“评估集不是可选项，是工程的底线。”',
    '“端侧 AI 的浪漫：把智能装进口袋。”',
    '“Prompt 是面向模型的 API 设计。”',
    '“先让系统可用，再让系统完美。”',
    '“每一个 failed experiment 都是有效数据。”'
  ];
  let idx = 0;
  el.addEventListener('click', () => {
    idx = (idx + 1) % quotes.length;
    el.textContent = quotes[idx];
  });
})();

/* ---------- 触屏设备：点击卡片切换技术细节 ---------- */
(function moreOnTouch() {
  if (!matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.archive').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      card.classList.toggle('more-open');
    });
  });
})();

/* ---------- 重点项目 tilt 效果（桌面端） ---------- */
(function tiltCards() {
  const isTouch = matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;
  const cards = document.querySelectorAll('.archive');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
