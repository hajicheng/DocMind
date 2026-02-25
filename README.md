# DocMind - AI 驱动的医疗文档与问诊平台

一个基于 AI 的驱动的医疗文档与问诊平台，集成 DeepSeek AI 助手，提供文档管理、智能对话、内容分享等功能。

## 技术栈

### 后端
- **框架**: NestJS
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT (Passport)
- **AI 集成**: LangChain + DeepSeek
- **密码加密**: bcrypt

### 前端
- **框架**: React 19
- **构建工具**: Vite
- **状态管理**: Zustand
- **路由**: React Router DOM
- **UI 组件**: Radix UI + Tailwind CSS
- **HTTP 客户端**: Axios
- **页面缓存**: react-activation

## 项目结构

```
DocMind/
├── backend/
│   └── server/
│       ├── prisma/           # 数据库模型和迁移
│       ├── src/
│       │   ├── ai/          # AI 相关模块
│       │   ├── auth/        # 认证模块
│       │   ├── posts/       # 文章/帖子模块
│       │   └── prisma/      # Prisma 服务
│       └── uploads/         # 上传文件存储
└── frontend/
    └── client/
        ├── mock/            # Mock 数据
        ├── public/          # 静态资源
        └── src/
            ├── api/         # API 接口
            ├── components/  # React 组件
            ├── hooks/       # 自定义 Hooks
            ├── layouts/     # 页面布局
            └── pages/       # 页面组件
```

## 主要功能

- 用户注册与登录
- AI 智能对话 (基于DeepSeek)
- 文章发布与管理
- 评论与点赞系统
- 标签分类
- 文件上传 (图片、头像)
- 内容搜索
- 个人中心

## 核心特色

### AI 智能驱动
- 集成 DeepSeek 大语言模型，提供智能对话能力
- 基于 LangChain 框架，支持复杂的 AI 应用场景
- 智能搜索与内容推荐，提升用户体验

### 社交互动
- 支持嵌套评论，构建深度讨论
- 点赞功能，增强用户参与感
- 用户个人主页，展示创作与互动历史

### 现代化架构
- 前后端分离，易于扩展与维护
- RESTful API 设计，接口规范清晰
- TypeScript 全栈类型安全
- 响应式设计，支持多端访问 - 完美适配移动端和桌面端

### 安全可靠
- JWT 身份认证机制
- bcrypt 密码加密存储
- 数据库级联删除保护
- Prisma ORM 防止 SQL 注入
- 智能知识库 - RAG 检索增强生成，个性化问答

## 快速开始

### 环境要求
- Node.js >= 18
- PostgreSQL 数据库
- pnpm (推荐)

### 后端设置

```bash
cd backend/server

# 安装依赖
pnpm install

# 配置环境变量
# 创建 .env 文件并设置以下变量:
DATABASE_URL="postgresql://user:password@localhost:5432/docmind"
JWT_SECRET="your-jwt-secret"
DEEPSEEK_API_KEY="your-deepseek-api-key"

# 运行数据库迁移
pnpm prisma migrate dev

# 启动开发服务器
pnpm start:dev
```

### 前端设置

```bash
cd frontend/client

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 数据库模型

项目使用 Prisma ORM，主要数据模型包括：

- **User**: 用户信息
- **Post**: 文章/帖子
- **Comment**: 评论 (支持嵌套回复)
- **Tag**: 标签
- **PostTag**: 文章标签关联
- **UserLikePost**: 用户点赞
- **Avatar**: 用户头像
- **File**: 文件附件

## API 接口

### 认证
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册

### AI
- `POST /ai/chat` - AI 对话
- `POST /ai/search` - AI 搜索

### 文章
- `GET /posts` - 获取文章列表
- `POST /posts` - 创建文章
- `GET /posts/:id` - 获取文章详情

### 代码规范

- 组件: PascalCase
- 文件: camelCase
- 常量: UPPER_SNAKE_CASE
- 遵循 DRY 原则
- 使用 TypeScript 严格模式

### Git 提交规范

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- refactor: 代码重构

## 开发命令

### 后端
```bash
pnpm build          # 构建项目
pnpm start:dev      # 开发模式
pnpm start:prod     # 生产模式
pnpm lint           # 代码检查
pnpm test           # 运行测试
```

### 前端
```bash
pnpm dev            # 开发模式
pnpm build          # 构建项目
pnpm preview        # 预览构建
pnpm lint           # 代码检查
```

## 许可证

UNLICENSED

## 联系方式

- 创建 Issue
- 提交 Pull Request
- 联系开发团队

---