# 爱情评分系统 - 李祥浩的表现评分应用

这是一个专为情侣设计的评分应用，让您可以记录和跟踪伴侣的每日表现，查看评分历史趋势，并添加备注说明。

## 功能特点

- 💖 为伴侣的每日表现打分（支持任意数值，包括负数）
- 📊 可视化历史评分趋势图表
- 📝 添加评分备注和说明
- 💾 本地存储评分记录
- 🎨 精美的UI设计和动画效果
- 🌓 响应式布局，适配各种设备

## 快速开始

### 本地开发

1. 确保已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)
2. 克隆仓库
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
3. 安装依赖
   ```bash
   pnpm install
   ```
4. 启动开发服务器
   ```bash
   pnpm dev
   ```
5. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
pnpm build
```

构建后的文件将生成在 `dist` 目录中。

## 如何将代码推送到GitHub仓库

如果您下载的是zip包，并想将代码推送到GitHub仓库，请按照以下步骤操作：

1. **解压zip包**
   ```bash
   # Windows (使用文件资源管理器或PowerShell)
   Expand-Archive -Path .\project_template_react.zip -DestinationPath .\your-project-name
   
   # macOS/Linux
   unzip project_template_react.zip -d your-project-name
   
   # 进入项目目录
   cd your-project-name
   ```

2. **初始化Git仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **在GitHub上创建新仓库**
   - 访问 [GitHub](https://github.com/) 并登录您的账号
   - 点击右上角的 "+" 按钮，选择 "New repository"
   - 填写仓库名称，选择公开或私有，不要勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

4. **关联本地仓库和远程仓库**
   ```bash
   # 替换 <your-username> 和 <your-repository-name> 为您的GitHub用户名和仓库名
   git remote add origin https://github.com/<your-username>/<your-repository-name>.git
   ```

5. **推送代码到GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

6. **验证推送**
   刷新GitHub仓库页面，您应该能看到您的代码已成功推送。

## 部署指南

### Vercel 部署

1. 访问 [Vercel官网](https://vercel.com/) 并登录
2. 点击 "New Project"
3. 选择 "Import Git Repository" 并连接您的GitHub仓库
4. 在配置页面：
   - 构建命令：`pnpm build`
   - 发布目录：`dist`
5. 点击 "Deploy" 按钮

### Netlify 部署

1. 访问 [Netlify官网](https://www.netlify.com/) 并登录
2. 点击 "Add new site" > "Import an existing project"
3. 选择 "GitHub" 并连接您的仓库
4. 在构建选项中设置：
   - 构建命令：`pnpm build`
   - 发布目录：`dist`
5. 点击 "Deploy site"

### GitHub Pages 部署

1. 确保您的 `vite.config.ts` 文件中配置了正确的 `base` 路径
2. 创建 `.github/workflows/deploy.yml` 文件，添加以下内容：
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: pnpm/action-setup@v2
           with:
             version: latest
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```
3. 推送更改并等待GitHub Actions完成部署

### Cloudflare Pages 部署

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/) 并登录
2. 点击 "Create a project" > "Connect to Git"
3. 选择您的GitHub仓库并点击 "Begin setup"
4. 在项目设置中配置：
   - 构建命令：`pnpm build`
   - 发布目录：`dist`
5. 点击 "Save and Deploy"

## 技术栈

- **前端框架**: React 18+
- **编程语言**: TypeScript
- **构建工具**: Vite
- **样式系统**: Tailwind CSS
- **路由**: React Router
- **状态管理**: React Context API (轻量级)
- **动画**: Framer Motion
- **图表**: Recharts
- **图标**: Lucide React
- **通知**: Sonner
- **数据验证**: Zod
- **实用工具**: clsx, tailwind-merge

## 项目结构

```
src/
├── components/        # 可复用组件
│   ├── Empty.tsx      # 空状态组件
│   ├── NotFound.tsx   # 404页面组件
│   └── StarRating.tsx # 星级评分组件
├── contexts/          # React Context
│   └── authContext.ts # 认证上下文
├── hooks/             # 自定义Hook
│   └── useTheme.ts    # 主题切换Hook
├── lib/               # 工具函数
│   └── utils.ts       # 通用工具函数
├── pages/             # 页面组件
│   ├── Home.tsx       # 首页
│   └── LoveRatingPage.tsx # 爱情评分页面
├── App.tsx            # 应用入口组件
├── index.css          # 全局样式
└── main.tsx           # 应用渲染入口
```

## License

MIT License