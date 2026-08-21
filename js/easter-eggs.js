/* ============================================
   JUNJIE AI LAB · easter-eggs.js
   彩蛋：主题色轮 / 实验室终端 / 粒子特效
   ============================================ */

/* ---------- 彩蛋 1：主题色相调节 ---------- */
(function hueWheel() {
  const btn = document.getElementById('hue-btn');
  const panel = document.getElementById('hue-panel');
  const slider = document.getElementById('hue-slider');
  const value = document.getElementById('hue-value');
  if (!btn || !panel || !slider) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target)) panel.classList.remove('open');
  });

  slider.addEventListener('input', () => {
    const hue = slider.value;
    document.documentElement.style.setProperty('--hue', hue);
    value.textContent = hue + '°';
  });
})();

/* ---------- 彩蛋 2：实验室终端 ---------- */
(function terminal() {
  const btn = document.getElementById('term-btn');
  const term = document.getElementById('terminal');
  const closeBtn = document.getElementById('term-close');
  const body = document.getElementById('term-body');
  const input = document.getElementById('term-input');
  if (!btn || !term) return;

  const commands = {
    help: `可用命令：
  ls projects   — 列出实验档案
  cat resume    — 打开简历（PDF）
  open github   — 打开 GitHub
  ls manual     — 查看学习轨迹
  particles on/off — 开启/关闭粒子特效
  theme         — 打开主题色调节
  whoami        — 查看身份
  clear         — 清空终端`,
    'ls projects': `./archives/
  001  lc-chat-chat      [rag]     已部署
  002  Campus-Trading    [java]    已交付
  003  VisionLab         [edge]    已交付
  004  spring-demo-1     [java]    已交付
  005  vibe-1            [collab]  已交付
  006  dsh-vision        [agent]   已交付
  007  lc-rag            [rag]     实验性`,
    'cat resume': '正在打开简历...',
    'open github': '正在打开 GitHub...',
    'ls manual': `./manual/
  transformer 源码研读  → 学习指南/
  rag 全链路部署        → Langchain-Chatchat-master/
  端侧部署实验          → 进行中`,
    whoami: '骆俊杰 · AI 应用开发师 · JUNJIE AI LAB 唯一负责人',
    theme: '已打开主题色调节（右下角 🎨）',
    particles: '用法：particles on / particles off',
    'particles on': '粒子特效已开启 ✨',
    'particles off': '粒子特效已关闭',
    clear: null
  };

  const print = (text, cls = '') => {
    const line = document.createElement('div');
    line.className = 'term-line ' + cls;
    line.textContent = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    print('junjie@lab:~$ ' + raw);
    if (cmd === 'clear') {
      body.innerHTML = '';
      return;
    }
    if (cmd in commands) {
      const out = commands[cmd];
      if (cmd === 'cat resume') {
        window.open('resume/简历.pdf', '_blank');
        print(out, 'ok');
        return;
      }
      if (cmd === 'open github') {
        window.open('https://github.com/defultljj', '_blank');
        print(out, 'ok');
        return;
      }
      if (cmd === 'theme') {
        document.getElementById('hue-btn').click();
        print(out, 'ok');
        return;
      }
      if (cmd === 'particles on') {
        const cv = document.getElementById('particles');
        cv.classList.add('on');
        print(out, 'ok');
        return;
      }
      if (cmd === 'particles off') {
        const cv = document.getElementById('particles');
        cv.classList.remove('on');
        print(out, 'ok');
        return;
      }
      print(out, out.startsWith('可用命令') ? 'info' : '');
      return;
    }
    print('命令未找到: ' + raw + '（输入 help 查看帮助）', 'err');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    term.classList.toggle('open');
    if (term.classList.contains('open')) input.focus();
  });
  closeBtn.addEventListener('click', () => term.classList.remove('open'));
  document.addEventListener('click', (e) => {
    if (!term.contains(e.target)) term.classList.remove('open');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
    }
  });
})();

/* ---------- 彩蛋 3：粒子连接网络 ---------- */
(function particles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], raf = null, running = false;

  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };

  const init = () => {
    resize();
    const count = Math.min(80, Math.floor(innerWidth / 16));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.6 + 0.6
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const hue = getComputedStyle(document.documentElement).getPropertyValue('--hue') || 210;
    ctx.strokeStyle = `hsla(${hue}, 90%, 60%, 0.18)`;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.fillStyle = `hsla(${hue}, 90%, 62%, 0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.lineWidth = (1 - dist / 130) * 1.1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  const start = () => { if (!running) { running = true; init(); draw(); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); };

  addEventListener('resize', () => { if (running) init(); });
  // 通过观察 CSS class 控制启停
  new MutationObserver(() => {
    canvas.classList.contains('on') ? start() : stop();
  }).observe(canvas, { attributes: true, attributeFilter: ['class'] });
})();
