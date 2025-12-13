import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  content: string;
}

// HTML 实体编码函数，用于防止XSS注入
function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM,
    SMTP_TO
  } = process.env;

  // 验证必需的环境变量
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    console.error('Missing required SMTP environment variables');
    return false;
  }

  const smtpPort = parseInt(SMTP_PORT, 10);
  if (isNaN(smtpPort)) {
    console.error('Invalid SMTP_PORT environment variable');
    return false;
  }

  // 创建邮件传输器
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465, // 465 端口使用 SSL，其他端口通常使用 STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: {
      // 使用 TLS 连接
      ciphers: 'SSLv3',
      // 如果需要，可以禁用证书验证（生产环境中不推荐）
      rejectUnauthorized: false
    }
  });

  // 验证连接
  try {
    await transporter.verify();
  } catch (error) {
    console.error('SMTP connection verification failed:', error);
    return false;
  }

  // 转义用户输入的数据以防止XSS
  const escapedName = escapeHtml(data.name);
  const escapedEmail = escapeHtml(data.email);
  const escapedPhone = data.phone ? escapeHtml(data.phone) : '';
  const escapedContent = escapeHtml(data.content);

  // 准备邮件内容
  const mailOptions: SendMailOptions = {
    from: `"${escapedName}" <${SMTP_FROM}>`, // 发件人地址，使用提交者姓名
    to: SMTP_TO || SMTP_FROM, // 收件人地址，如果没有指定则使用发件人地址
    subject: `【清岭官网】新留言信息 - ${escapedName}`,
    text: `姓名: ${escapedName}
邮箱: ${escapedEmail}
电话: ${escapedPhone || ''}

内容:
${escapedContent}`,
    html: `
      <h2>【清岭官网】新留言信息</h2>
      <p><strong>姓名:</strong> ${escapedName}</p>
      <p><strong>邮箱:</strong> ${escapedEmail}</p>
      <p><strong>电话:</strong> ${escapedPhone || '未提供'}</p>
      <h3>内容:</h3>
      <p>${escapedContent.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    // 发送邮件
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}