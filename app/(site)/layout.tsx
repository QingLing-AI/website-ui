import './globals.css';
import '@fortawesome/fontawesome-free/css/all.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '轻羚科技 - QINGLING AI',
  description: '轻羚科技致力于企业级大模型推理性能优化和AI智能体开发，提供全方位AI解决方案。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}