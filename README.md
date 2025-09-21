# 个人博客项目

## 项目概述
这是一个现代化的个人博客网站，使用React + TypeScript + Vite构建，展示个人介绍、技能、项目、时间线、旅行经历等内容。

## 功能特性
- 📝 个人简介页面
- 💼 项目展示页面
- 🎯 技能雷达图展示
- 📅 时间线展示个人经历
- ✈️ 旅行地图展示
- 📚 兴趣爱好展示
- 🔖 书签收藏管理
- 🎨 精美的3D地球动画
- 📱 响应式设计，支持移动端

## 技术栈
- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: Styled Components + CSS
- **3D图形**: Three.js + React Three Fiber
- **图表库**: Recharts
- **状态管理**: React Hooks

## 项目结构
```
rakel-blog/
├── public/           # 静态资源
├── src/
│   ├── components/   # 组件目录
│   │   ├── 3D/      # 3D组件
│   │   ├── Layout/  # 布局组件
│   │   ├── Pages/   # 页面组件
│   │   └── UI/      # UI组件
│   ├── data/        # 数据配置
│   ├── styles/      # 全局样式
│   ├── types/       # TypeScript类型定义
│   ├── App.tsx      # 主应用组件
│   └── main.tsx     # 应用入口
├── package.json     # 项目配置
└── vite.config.ts   # Vite配置
```

## 快速开始

### 安装依赖
```bash
cd rakel-blog
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:5173 查看网站

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 页面说明

### 1. 个人简介（Intro）
展示个人基本信息、头像、简短介绍和联系方式。

### 2. 技能展示（Skills）
使用雷达图可视化展示各项技能水平，包括前端、后端、数据库、DevOps等技术栈。

### 3. 项目展示（Projects）
展示个人参与或主导的项目，包括项目描述、技术栈、GitHub链接等。

### 4. 时间线（Timeline）
以时间轴形式展示教育经历、工作经历、重要成就等。

### 5. 旅行地图（Travel）
展示去过的地方，配合3D地球动画效果。

### 6. 兴趣爱好（Interests）
展示个人兴趣爱好，如编程、阅读、运动等。

### 7. 书签收藏（Bookmarks）
管理和展示收藏的网站、文章、工具等资源。

## 自定义配置

### 修改个人信息
编辑 `src/data/` 目录下的文件：
- `navigation.ts` - 导航配置
- `skills.ts` - 技能数据
- `projects.ts` - 项目数据
- `timeline.ts` - 时间线数据
- `travel.ts` - 旅行数据
- `interests.ts` - 兴趣爱好
- `bookmarks.ts` - 书签收藏

### 修改主题样式
编辑 `src/styles/theme.ts` 文件来自定义颜色、字体等主题配置。

## 部署说明

### 部署到 Vercel
1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`

### 部署到 GitHub Pages
1. 修改 `vite.config.ts` 中的 `base` 配置
2. 运行 `npm run build`
3. 将 `dist` 目录内容推送到 `gh-pages` 分支

## 常见问题

### 端口被占用
如果5173端口被占用，可以修改启动命令：
```bash
npm run dev -- --port 3000
```

### 依赖安装失败
清除缓存后重试：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 构建失败
检查TypeScript类型错误：
```bash
npm run build
```

## 更新日志
- v1.0.0 (2025-01) - 初始版本发布

## 许可证
MIT License

## 联系方式
如有问题或建议，请通过博客联系页面与我联系。