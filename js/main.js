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

/* ---------- 滚动渐入 ---------- */
(function revealOnScroll() {
  const targets = document.querySelectorAll(
    '.section-title, .section-desc, .filter-bar, .archive, .ability-card, .tag-cloud, .wf-step, .tl-item, .contact-desc'
  );
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }
  // 错峰索引：同容器内按位置依次浮现
  targets.forEach(el => {
    const parent = el.parentElement;
    const idx = parent ? Array.from(parent.children).indexOf(el) : 0;
    el.style.setProperty('--order', String(idx % 10));
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        // 关键：双 rAF 确保浏览器先计算隐藏态样式，再过渡到可见态
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.target.classList.add('visible');
          });
        });
        io.unobserve(e.target);
        // 动画完成后移除 reveal 类，恢复卡片 hover/tilt 的正常交互
        setTimeout(() => e.target.classList.remove('reveal', 'visible'), 1200);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
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
