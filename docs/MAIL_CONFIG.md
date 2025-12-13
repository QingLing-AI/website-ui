# 环境变量配置

要使用联系表单的邮件发送功能，需要配置以下环境变量：

## SMTP 邮件发送配置

```env
# SMTP 服务器主机地址 (如: smtp.gmail.com)
SMTP_HOST=smtp.gmail.com

# SMTP 服务器端口 (通常为 587 for TLS 或 465 for SSL)
SMTP_PORT=587

# SMTP 账户用户名 (通常是邮箱地址)
SMTP_USER=your_email@gmail.com

# SMTP 账户密码或应用专用密码
SMTP_PASSWORD=your_app_password

# 邮件发件人地址 (与 SMTP_USER 通常相同)
SMTP_FROM=your_email@gmail.com

# 邮件收件人地址 (表单提交将发送到这里)
SMTP_TO=admin@yourcompany.com
```

## 示例配置（Gmail）

如果你使用 Gmail，请注意启用两步验证并使用应用专用密码：

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
SMTP_FROM=your_email@gmail.com
SMTP_TO=recipient@company.com
```

## 示例配置（其他常见邮箱服务）

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASSWORD=your_password
SMTP_FROM=your_email@outlook.com
SMTP_TO=recipient@company.com
```

### QQ邮箱
```env
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_USER=your_email@qq.com
SMTP_PASSWORD=your_authorization_code  # 需要在QQ邮箱中获取授权码
SMTP_FROM=your_email@qq.com
SMTP_TO=recipient@company.com
```

## 注意事项

1. 如果使用 Gmail，需要启用两步验证并生成应用专用密码
2. 确保端口设置正确：587 用于 TLS，465 用于 SSL
3. 在生产环境中，绝不要将敏感信息硬编码在代码中
4. 使用 `.env.local` 文件存储环境变量（该文件应被包含在 `.gitignore` 中以避免提交到版本控制）