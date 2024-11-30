# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 安装生产依赖
COPY package*.json ./
RUN npm install --production

# 复制构建文件
COPY --from=builder /app/dist ./dist
COPY .env.example .env

EXPOSE 5000

CMD ["node", "dist/server.js"] 