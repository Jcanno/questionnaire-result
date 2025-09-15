# 问卷系统 (Questionnaire System)

一个基于 React + TypeScript + Vite + Ant Design 构建的现代化问卷管理系统。

## 🚀 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具
- **Ant Design 5** - 企业级 UI 设计语言和组件库
- **@ant-design/icons** - Ant Design 图标库

## 📦 项目特性

- ✅ 现代化开发环境 (Vite + TypeScript)
- ✅ 企业级 UI 组件库 (Ant Design)
- ✅ 响应式设计，支持移动端
- ✅ 中文本地化支持
- ✅ 完整的布局系统
- ✅ 丰富的组件示例

## 🛠️ 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 📥 安装依赖

```bash
npm install
```

## 🚀 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

## 📦 构建生产版本

```bash
npm run build
```

## 🔍 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
questionnaire-result/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件目录
│   ├── pages/            # 页面组件
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript 类型定义
│   ├── App.tsx           # 主应用组件
│   ├── App.css           # 全局样式
│   ├── main.tsx          # 应用入口
│   └── index.css         # 基础样式
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── README.md            # 项目说明
```

## 🎨 功能特性

### 已实现功能
- 🏠 响应式侧边栏导航
- 📊 数据统计概览
- 🔍 搜索功能
- 📋 数据表格展示
- 🎨 现代化 UI 设计
- 📱 移动端适配

### 计划功能
- 📝 问卷创建和编辑
- 📈 数据分析和报表
- 👥 用户权限管理
- 🔔 消息通知系统
- 📤 数据导入导出

## 🎯 组件说明

### 主要组件
- **Layout**: 整体布局组件，包含侧边栏、头部和内容区域
- **Menu**: 侧边栏导航菜单
- **Card**: 信息卡片组件
- **Table**: 数据表格组件
- **Form**: 表单组件
- **Button**: 按钮组件

### 图标使用
项目使用了 `@ant-design/icons` 提供的丰富图标库：
- `HomeOutlined` - 首页
- `FileTextOutlined` - 问卷管理
- `BarChartOutlined` - 数据分析
- `TeamOutlined` - 用户管理
- `SettingOutlined` - 系统设置
- `UserOutlined` - 用户头像

## 🌐 国际化支持

项目已配置中文本地化支持，所有 Ant Design 组件都会显示中文界面。

## 📱 响应式设计

- 桌面端：完整布局展示
- 平板端：自适应网格布局
- 移动端：侧边栏自动收起，优化触摸操作

## 🔧 自定义配置

### Ant Design 主题定制
可以在 `src/main.tsx` 中的 `ConfigProvider` 组件中自定义主题：

```tsx
<ConfigProvider
  locale={zhCN}
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
  <App />
</ConfigProvider>
```

## 📄 许可证

MIT License

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件

---

⭐ 如果这个项目对你有帮助，请给它一个星标！