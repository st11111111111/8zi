# 检查环境变量
if (-not (Test-Path .env)) {
    Write-Host "创建 .env 文件..."
    Copy-Item .env.example .env
    Write-Host "请在 .env 文件中配置你的 GEMINI_API_KEY"
}

# 安装依赖
Write-Host "安装依赖..."
npm install

# 启动服务器
Write-Host "启动服务器..."
npm run dev