# JUNJIE AI LAB · 个人作品集

> 骆俊杰（defultljj）的个人作品集网站，托管于 GitHub Pages：**https://defultljj.github.io**

## 🎨 站点设定

**「JUNJIE AI LAB — AI 应用实验室」**：项目以"实验档案"形式呈现（编号 + 状态 + 数据指标），踩坑记录是"失败实验存档"，学习轨迹是"实验手册"。

## ✨ 彩蛋功能

| 彩蛋 | 触发方式 |
|------|---------|
| 🎨 主题色相调节 | 右下角 🎨 按钮，拖动滑块全站换色 |
| ❯_ 实验室终端 | 右下角 ❯_ 按钮，输入 `help` 查看命令 |
| ✨ 粒子特效 | 终端输入 `particles on` 开启 |
| 💬 今日一言 | Hero 下方，点击换一句 |
| 💻 首载终端动画 | 页面打开时自动播放 |

## 📂 目录结构

```
├── index.html          # 单页结构（人设 + 全部区块）
├── css/
│   ├── base.css        # 主题色变量、重置、通用组件
│   ├── layout.css      # 区块布局（nav/hero/archives/abilities/workflow/manual/contact）
│   └── effects.css     # 动效（loading/背景/粒子/彩蛋 UI）
├── js/
│   ├── main.js         # 打字机、滚动渐入、档案筛选、一言、tilt
│   └── easter-eggs.js  # 主题色轮、终端、粒子
├── resume/简历.pdf
└── README.md
```

## 🔧 更新与部署

```bash
git add -A
git commit -m "更新内容"
git push origin main
```

推送后 1-2 分钟自动生效。纯静态零依赖，无构建步骤。

## 📝 待办

- [ ] 重点项目封面换真实截图
- [ ] 学习笔记链接到博客/文档
