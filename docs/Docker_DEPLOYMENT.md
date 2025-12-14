# Docker 部署指南

本项目支持使用 Docker 进行容器化部署，以下是详细的部署说明。

## 快速开始

### 1. 构建并运行容器

```bash
# 构建并启动容器（后台运行）
docker-compose up -d

# 查看容器日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 2. 环境变量配置

在运行 Docker Compose 之前，需要配置环境变量。创建 `.env` 文件：

```bash
# .env 文件示例
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email@gmail.com
SMTP_TO=admin@yourcompany.com
NEXT_PUBLIC_SITE_URL=http://your-domain.com
```

### 3. 手动构建镜像

如果需要手动构建 Docker 镜像：

```bash
# 构建镜像
docker build -t website-ui .

# 运行容器
docker run -d -p 3000:3000 --env-file .env website-ui
```

## 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `SMTP_HOST` | SMTP 服务器地址 | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP 服务器端口 | `587` |
| `SMTP_USER` | SMTP 用户名 | - |
| `SMTP_PASSWORD` | SMTP 密码 | - |
| `SMTP_FROM` | 发送邮件的地址 | - |
| `SMTP_TO` | 接收邮件的地址 | - |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | `http://localhost:3000` |

### 端口映射

- 容器内端口 `3000` 映射到主机端口 `3000`

## 部署到生产环境

### 1. 使用 Docker Compose

```bash
# 在生产环境服务器上
docker-compose up -d --build
```

### 2. 使用反向代理

在生产环境中，建议使用 Nginx 等反向代理服务器：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 健康检查

Docker Compose 配置了健康检查，会定期检查容器的运行状态。

## 故障排除

### 常见问题

1. **容器启动失败**
   - 检查环境变量是否正确配置
   - 查看容器日志 `docker-compose logs website-ui`

2. **邮件发送失败**
   - 检查 SMTP 配置是否正确
   - 确保防火墙允许相应端口的出站连接

3. **构建失败**
   - 确保 Docker daemon 正在运行
   - 检查 Dockerfile 语法

### 查看日志

```bash
# 查看所有服务的日志
docker-compose logs

# 查看特定服务的日志
docker-compose logs website-ui
```

## 更新镜像

当代码有更新时：

```bash
# 拉取最新代码
git pull

# 重新构建并启动容器
docker-compose up -d --build
```