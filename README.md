# 【你的名字】个人作品集

> 基于 GitHub Pages 的个人作品集网站，访问地址：**https://defultljj.github.io**

## 📝 使用前必读（替换占位符）

网站目前使用 `【】` 占位符，部署前请替换 [index.html](index.html) 中的以下内容：

| 占位符 | 替换为 |
|--------|--------|
| `【你的名字】` | 你的真实姓名（3 处 + `<title>` + footer） |
| `【名字首字母】` | 你名字的缩写（导航栏 Logo） |
| `【大学名称】` | 你的大学 |
| `【专业，如：计算机科学与技术 / 人工智能】` | 你的专业 |
| `【入学年】—【预计毕业年】` | 你的在校时间，如 `2022—2026` |
| `【你的邮箱】` | 你的邮箱（mailto 链接） |

## 🔧 部署方式（已配置好，改完直接推送）

```bash
git add -A
git commit -m "更新个人信息"
git push origin main
```

推送后 1-2 分钟访问 `https://defultljj.github.io` 即可看到更新（可以在仓库 Settings → Pages 查看构建状态）。

## 📂 目录结构

```
├── index.html    # 主页面（个人信息、7 个项目卡片、技能、教育、联系）
├── style.css     # 深色现代主题样式（响应式）
├── resume/       # 简历目录（放 简历.pdf，页面上的"下载简历"按钮指向这里）
└── README.md
```

## ✨ 可扩展方向

- **项目演示页**：给每个项目建独立页面（如 `projects/lc-chat-chat.html`），或给每个仓库开 GitHub Pages
- **博客**：后续迁移到 Jekyll 写技术笔记（GitHub Pages 原生支持）
- **自定义域名**：在仓库 Settings → Pages 里绑定自己的域名

## 📄 版权

代码基于 MIT 许可，内容版权归本人所有。
