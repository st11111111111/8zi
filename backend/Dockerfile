# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖）
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner

WORKDIR /app

# 设置生产环境
ENV NODE_ENV=production

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 只安装生产依赖
RUN npm install --production

# 复制构建文件
COPY --from=builder /app/dist ./dist
COPY .env.example .env

# 暴露端口
EXPOSE 5000

# 启动命令
CMD ["node", "dist/server.js"] 