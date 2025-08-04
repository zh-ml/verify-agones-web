# TheNinth - 游戏服务器部署平台

一个现代化的游戏服务器部署和管理平台，基于 React + TypeScript + Vite 构建。

## 🎮 项目简介

TheNinth 是一个专为游戏开发者和运营商设计的服务器部署平台，提供简单易用的游戏服务器管理、部署和监控功能。平台支持多种游戏类型，包括生存游戏、射击游戏、策略游戏等。

## ✨ 主要功能

### 🔐 用户认证系统
- 用户注册和登录
- JWT 认证机制
- 受保护的路由访问
- 用户状态持久化

### 🎯 游戏管理
- 游戏库浏览和搜索
- 游戏详情查看
- 游戏分类和筛选
- 游戏评分和评论

### 🛒 购物车系统
- 游戏添加到购物车
- 购物车商品管理
- 购买流程处理
- 订单状态跟踪

### 🚀 服务器部署
- 一键游戏服务器部署
- 服务器配置管理
- 实时状态监控
- 部署历史记录

### 📊 控制台面板
- 服务器性能监控
- 资源使用统计
- 用户活动分析
- 系统健康检查

### 👤 用户中心
- 个人资料管理
- 密码修改
- 游戏库管理
- 订单历史

## 🛠️ 技术栈

- **前端框架**: React 18
- **类型系统**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design
- **样式方案**: Styled Components
- **路由管理**: React Router DOM
- **状态管理**: React Context API
- **图标库**: Ant Design Icons
- **代码规范**: ESLint + TypeScript ESLint

## 📦 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

## 🎯 演示账号

为了方便测试，平台提供了以下演示账号：

**管理员账号**
- 邮箱: admin@theninth.com
- 密码: admin123

**普通用户账号**
- 邮箱: user@example.com
- 密码: user123

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Footer.tsx      # 页脚组件
│   ├── GameCard.tsx    # 游戏卡片组件
│   ├── Layout.tsx      # 布局组件
│   ├── Navbar.tsx      # 导航栏组件
│   └── ProtectedRoute.tsx # 受保护路由组件
├── contexts/           # React Context
│   ├── AuthContext.tsx # 认证上下文
│   └── CartContext.tsx # 购物车上下文
├── pages/              # 页面组件
│   ├── About/          # 关于我们
│   ├── Cart/           # 购物车
│   ├── Dashboard/      # 控制台
│   ├── Games/          # 游戏库
│   ├── Home/           # 首页
│   ├── Login/          # 登录页面
│   ├── Profile/        # 用户中心
│   └── ...
├── styles/             # 样式文件
│   ├── GlobalStyles.ts # 全局样式
│   └── theme.ts        # 主题配置
├── utils/              # 工具函数
│   └── mockData.ts     # 模拟数据
└── App.tsx             # 应用入口
```

## 🌟 核心特性

### 响应式设计
- 适配桌面端和移动端
- 流畅的用户体验
- 现代化的 UI 设计

### 安全性
- JWT 认证机制
- 路由访问控制
- 用户状态加密存储

### 性能优化
- Vite 快速构建
- 组件懒加载
- 代码分割优化

### 开发体验
- TypeScript 类型安全
- ESLint 代码规范
- 热重载开发

## 🚀 部署说明

### Netlify 部署
1. 构建项目: `npm run build`
2. 上传 `dist` 目录到 Netlify
3. 配置重定向规则（已包含 `_redirects` 文件）

### Vercel 部署
1. 连接 GitHub 仓库
2. 设置构建命令: `npm run build`
3. 设置输出目录: `dist`

## 📄 许可证

MIT License

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

---

**TheNinth** - 让游戏服务器部署变得简单高效 🎮
