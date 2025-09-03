# GuiQiDe.Blog

一个基于 Astro 构建的现代化个人博客系统，支持多语言、搜索功能、数学公式渲染等特性。

## ✨ 特性

- 🚀 **Astro 5.3** - 现代化的静态站点生成器
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- ⚡ **Svelte 5** - 高性能的前端框架
- 🔍 **Pagefind** - 强大的全站搜索功能
- 📱 **响应式设计** - 支持移动端和桌面端
- 🌙 **深色模式** - 支持主题切换
- 📊 **RSS & Sitemap** - SEO 友好的站点地图
- 🔗 **Swup** - 平滑的页面过渡效果
- 📝 **Markdown 增强** - 支持数学公式、阅读时间等
- 🌍 **多语言支持** - 国际化支持

## 🛠️ 技术栈

### 核心框架
- **Astro** - 静态站点生成器
- **Svelte** - 前端组件框架
- **TypeScript** - 类型安全的 JavaScript

### 样式与 UI
- **Tailwind CSS** - CSS 框架
- **@tailwindcss/typography** - 排版插件
- **OverlayScrollbars** - 自定义滚动条

### 功能增强
- **@swup/astro** - 页面过渡效果
- **astro-pagefind** - 全站搜索
- **astro-icon** - 图标系统
- **rehype-katex** - 数学公式渲染
- **remark-reading-time** - 阅读时间计算

### 开发工具
- **Prettier** - 代码格式化
- **Commitizen** - 规范化提交信息
- **pnpm** - 包管理器

## 📦 安装

### 环境要求
- Node.js 18+ 
- pnpm 9.15.4+

### 安装依赖
```bash
# 克隆项目
git clone <your-repo-url>
cd guiqide.blog

# 安装依赖
pnpm install
```

## 🚀 开发

### 开发服务器
```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321
```

### 构建项目
```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 代码质量
```bash
# 代码格式化
pnpm prettier --write .

# 类型检查
pnpm astro check
```

## 📝 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Banner.astro    # 横幅组件
│   ├── Footer.astro    # 页脚组件
│   ├── NavBar.astro    # 导航栏
│   ├── PostCard.astro  # 文章卡片
│   └── widgets/        # 小部件组件
├── content/            # 内容文件
│   ├── posts/         # 博客文章
│   └── specs/         # 页面内容
├── layouts/            # 页面布局
│   ├── BaseLayout.astro
│   ├── MainLayout.astro
│   └── PostLayout.astro
├── pages/              # 页面路由
├── styles/             # 样式文件
└── utils/              # 工具函数
```

## 🌍 多语言支持

项目支持中英文双语，配置文件位于：
- `src/locales/languages/zh_cn.ts` - 中文配置
- `src/locales/languages/en.ts` - 英文配置

## 🔍 搜索功能

使用 Pagefind 提供全站搜索功能：
- 支持中文搜索
- 实时搜索结果
- 高亮匹配内容

## 📱 响应式设计

- 移动端优先设计
- 支持触摸手势
- 自适应布局

## 🚀 部署

### GitHub Pages 自动部署
项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. 推送到 `main` 分支自动触发构建
2. 使用 pnpm 安装依赖和构建
3. 自动部署到 `gh-pages` 分支

### 手动部署
```bash
# 构建项目
pnpm build

# 部署到 GitHub Pages
pnpm deploy
```

## 📚 内容管理

### 添加新文章
在 `src/content/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
tags: ["标签1", "标签2"]
---

文章内容...
```

### 支持的功能
- 数学公式渲染 (KaTeX)
- 代码高亮
- 目录生成
- 阅读时间计算
- 图片懒加载

## 🎨 自定义主题

### 颜色主题
- 支持浅色/深色模式切换
- 使用 CSS 变量管理主题色彩
- Tailwind CSS 配置支持

### 组件样式
- 使用 Tailwind CSS 类名
- 支持自定义 CSS 变量
- 响应式设计支持

## 🔧 配置

### Astro 配置
主要配置位于 `astro.config.mjs`：
- 集成插件配置
- Markdown 处理配置
- 站点设置

### Tailwind 配置
配置文件 `tailwind.config.mjs`：
- 深色模式配置
- 内容扫描路径
- 插件配置

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 提交规范
项目使用 Commitizen 规范化提交信息：
```bash
pnpm cz
```

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至 [guiqide@gmail.com]

---

**享受你的博客之旅！** 🎉