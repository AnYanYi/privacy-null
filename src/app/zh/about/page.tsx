import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import Link from 'next/link';
import { 
  Shield, 
  Zap, 
  RefreshCw, 
  Code, 
  Heart, 
  Github,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '关于 - Privacy Null',
  description: 'Privacy Null 是一个免费开源的敏感数据脱敏工具，在分享给 AI 前保护你的隐私。100% 本地处理。',
};

const FEATURES = [
  {
    icon: Shield,
    title: '100% 本地处理',
    description: '所有操作都在你的浏览器中完成。你的数据永远不会触及任何服务器。',
  },
  {
    icon: Zap,
    title: '80+ 检测规则',
    description: '检测 API 密钥、密码、令牌、邮箱、手机号、银行卡等敏感信息。',
  },
  {
    icon: RefreshCw,
    title: '可逆脱敏',
    description: '等 AI 回复后，一键还原你的原始数据。',
  },
  {
    icon: Code,
    title: '开源透明',
    description: '代码完全公开。可以审查、修改、自己部署。',
  },
];

const USE_CASES = [
  '让 ChatGPT 帮你调试代码，不暴露 API 密钥',
  '把报错日志发给 Claude，不泄露密码',
  '让 AI 帮你改配置文件，敏感信息保密',
  '和同事分享代码片段，凭据不外泄',
  '审查第三方代码后再提交到你的仓库',
];

export default function AboutPage() {
  return (
    <Layout locale="zh">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-emerald-600 mb-6 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">关于 Privacy Null</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            一个免费工具，在问 AI 之前隐藏敏感数据。
            专为注重安全的开发者打造。
          </p>
        </div>

        {/* Why */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">为什么需要 Privacy Null？</h2>
          <div className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              ChatGPT、Claude 这些 AI 助手在调试代码和解决编程问题上非常给力。
              但当你粘贴代码时，可能不小心就把敏感信息也发出去了——API 密钥、数据库密码、认证令牌。
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              <strong className="text-[var(--text-primary)]">Privacy Null</strong> 解决这个问题。
              粘贴代码 → 自动找到敏感数据替换成安全占位符 → 发给 AI → 收到回复后一键还原。
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">核心功能</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div 
                key={feature.title}
                className="p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]"
              >
                <feature.icon size={24} className="text-[var(--accent-primary)] mb-3" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">使用场景</h2>
          <div className="space-y-3">
            {USE_CASES.map((useCase, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-light)]"
              >
                <CheckCircle size={20} className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                <span className="text-[var(--text-secondary)]">{useCase}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">技术栈</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-light)] text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-light)]">
          <Heart size={32} className="mx-auto text-[var(--accent-primary)] mb-4" />
          <h2 className="text-2xl font-bold mb-2">开源免费，永久可用</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Privacy Null 现在免费，以后也永远免费。觉得好用的话，给我们一个 Star 吧！
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/zh"
              className="px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all flex items-center gap-2"
            >
              立刻体验
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://github.com/AnYanYi/privacy-null"
              target="_blank"
              className="px-6 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Github size={18} />
              GitHub 源码
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
