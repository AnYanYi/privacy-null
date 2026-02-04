import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { RedactorWidget } from '@/components/redactor-widget';
import { 
  Shield, 
  Zap, 
  Lock, 
  RefreshCw, 
  Download, 
  Eye,
  CheckCircle,
  ArrowRight,
  Code,
  Globe,
  Server,
  FileCode,
  Key,
  Database,
  Terminal,
  MessageSquare,
  Sparkles,
  Users,
  ChevronDown
} from 'lucide-react';

// 结构化数据 - JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Privacy Null',
  description: '免费在线脱敏工具，发送给 ChatGPT/Claude 前自动隐藏 API 密钥、密码、令牌。100% 本地处理，不上传数据。',
  url: 'https://pnull.com/zh',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  inLanguage: 'zh-CN',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  featureList: [
    '100% 浏览器本地处理',
    '可逆占位符',
    'JWT 令牌检测',
    'API 密钥检测',
    '会话导出/导入',
    '不上传任何数据',
  ],
};

export const metadata: Metadata = {
  title: 'Privacy Null - 发送给 AI 前隐藏密码密钥 | 免费脱敏工具',
  description: '免费脱敏工具，发送给 ChatGPT、Claude 前自动隐藏 API 密钥、密码、JWT 令牌。100% 浏览器本地处理，可还原，不上传数据。',
  keywords: ['代码脱敏工具', 'API密钥隐藏', '密码脱敏', 'ChatGPT隐私保护', '敏感信息去除', 'JWT脱敏', '发AI前脱敏', '在线脱敏工具'],
  alternates: {
    canonical: 'https://pnull.com/zh',
    languages: {
      'en': 'https://pnull.com',
      'zh': 'https://pnull.com/zh',
    },
  },
  openGraph: {
    title: 'Privacy Null - 发给 AI 前隐藏密码密钥',
    description: '免费脱敏工具，发送给 ChatGPT/Claude 前隐藏 API 密钥、密码。100% 本地处理。',
    type: 'website',
    url: 'https://pnull.com/zh',
    locale: 'zh_CN',
    images: [{ url: 'https://pnull.com/og-image-zh.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Null - 发送 AI 前隐藏敏感信息',
    description: '免费脱敏 API 密钥、密码、令牌，发给 ChatGPT/Claude 前保护隐私。',
  },
};

const EXAMPLE_TEXT = `# 示例: .env 配置文件
DATABASE_URL=postgres://admin:super_secret_password@db.example.com:5432/myapp
OPENAI_API_KEY=sk-proj-abc123xyz789verylongapikey
JWT_SECRET=my-jwt-secret-key-do-not-share
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# HTTP 请求头
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
Cookie: session=abc123; auth_token=xyz789secret`;

// 支持的类型 - 混合通俗和专业页面
const SUPPORTED_TYPES = [
  { name: 'ChatGPT 隐私保护', icon: Shield, href: '/zh/redact/chatgpt-privacy', color: 'text-green-400' },
  { name: '隐藏密码', icon: Lock, href: '/zh/redact/hide-passwords', color: 'text-red-400' },
  { name: 'AI 安全编码', icon: Code, href: '/zh/redact/safe-ai-coding', color: 'text-blue-400' },
  { name: 'API 密钥', icon: Key, href: '/zh/redact/api-key', color: 'text-yellow-400' },
  { name: '.env 文件', icon: FileCode, href: '/zh/redact/env', color: 'text-purple-400' },
  { name: '代码分享工具', icon: Globe, href: '/zh/redact/code-sharing-tool', color: 'text-cyan-400' },
  { name: '数据库连接', icon: Database, href: '/zh/redact/database-url', color: 'text-orange-400' },
  { name: '移除敏感数据', icon: Terminal, href: '/zh/redact/remove-sensitive-data', color: 'text-pink-400' },
];

// 统计数据
const STATS = [
  { value: '100%', label: '本地处理', icon: Shield },
  { value: '80+', label: '检测规则', icon: Code },
  { value: '0', label: '数据上传', icon: Server },
  { value: '∞', label: '永久免费', icon: Sparkles },
];

// 使用场景
const USE_CASES = [
  {
    title: '让 AI 帮你改 Bug',
    description: '把报错日志和代码发给 ChatGPT，让它帮你找问题。密码、密钥？AI 看不到。',
    icon: MessageSquare,
  },
  {
    title: '让 AI 帮你看代码',
    description: '把配置文件丢给 AI，让它帮你检查有没有写错。敏感信息都藏好了，放心分享。',
    icon: Code,
  },
  {
    title: '和同事讨论代码',
    description: '把脱敏后的代码发到群里或者论坛，该讨论讨论。需要的话可以导出记录，让信任的人恢复。',
    icon: Users,
  },
];

export default function ZhHomePage() {
  return (
    <Layout locale="zh">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-light)] rounded-full text-sm text-[var(--accent-primary)] mb-6">
            <Shield size={16} />
            <span className="font-medium">纯本地处理 • 不传数据 • 开源免费</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            问 AI 之前<br />
            <span className="text-[var(--accent-primary)]">先把密码藏起来</span>
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
            自动找出代码里的密码、API 密钥、Token 等敏感信息，用占位符替换。
            <strong className="text-[var(--text-primary)]">安心发给 ChatGPT，收到回复后一键还原</strong>。
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="#tool" 
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all shadow-lg shadow-teal-900/30 hover:shadow-teal-800/40 flex items-center gap-2"
            >
              立刻体验
              <ArrowRight size={18} />
            </a>
            <Link 
              href="https://github.com/AnYanYi/privacy-null"
              target="_blank"
              className="px-8 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Code size={18} />
              GitHub 源码
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]">
                <stat.icon size={20} className="mx-auto mb-2 text-[var(--accent-primary)]" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="py-12 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">直接用，不用注册</h2>
            <p className="text-[var(--text-muted)]">粘贴你的代码，点「一键脱敏」看效果</p>
          </div>
          <RedactorWidget 
            locale="zh" 
            preset="default"
            exampleText={EXAMPLE_TEXT}
            placeholder="粘贴你的代码、日志、配置文件..."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">怎么用？</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              三步搞定，让 AI 帮你改代码的同时不泄露密码
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: '粘贴代码',
                description: '把你的代码或配置粘贴进来，工具会自动找出密码、密钥这些敏感信息。',
                icon: Eye,
                example: 'OPENAI_API_KEY=sk-xxx... → ⟦PTN:API_KEY:1:6F3A⟧',
              },
              {
                step: '2',
                title: '发给 AI',
                description: '复制脱敏后的代码发给 ChatGPT。AI 能看懂代码结构，但看不到真实的密码。',
                icon: MessageSquare,
                example: 'AI 知道这里是密钥，但不知道具体内容',
              },
              {
                step: '3',
                title: '一键还原',
                description: '把 AI 的回复粘贴回来，点「还原」，所有占位符自动变回原来的值。',
                icon: RefreshCw,
                example: '⟦PTN:API_KEY:1:6F3A⟧ → OPENAI_API_KEY=sk-xxx...',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 h-full border border-[var(--border-light)] hover:border-[var(--accent-primary)] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mb-4">
                    <span className="text-[var(--accent-primary)] font-bold">{item.step}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon size={18} className="text-[var(--accent-primary)]" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {item.description}
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded-lg text-[var(--text-muted)] overflow-x-auto">
                    {item.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Types */}
      <section id="detect-types" className="py-20 px-4 bg-[var(--bg-secondary)] scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">能识别哪些敏感信息？</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              内置 80+ 种检测规则，自动找出代码里的密码、密钥、令牌等
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUPPORTED_TYPES.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="group p-5 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] hover:border-[var(--accent-primary)] transition-all hover:shadow-lg"
              >
                <type.icon size={24} className={`${type.color} mb-3 group-hover:scale-110 transition-transform`} />
                <div className="font-medium mb-1">{type.name}</div>
                <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  了解更多 <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[var(--text-muted)]">
              还支持检测：GitHub 令牌、AWS 密钥、Stripe 密钥、数据库 URL、SSH 密钥、密码等...
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">什么时候用得上？</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              这些场景下，你可能需要把代码发给 AI，但又不想暴露密码
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {USE_CASES.map((useCase) => (
              <div key={useCase.title} className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-light)]">
                <useCase.icon size={28} className="text-[var(--accent-primary)] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Promise */}
      <section className="py-20 px-4 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-light)] p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">你的数据，绝不外传</h2>
                <p className="text-[var(--text-secondary)]">
                  所有处理都在你自己的浏览器里完成，我们看不到你的任何内容。
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: '全部本地处理', desc: '所有检测和替换都在浏览器里用 JavaScript 完成，根本不会发到服务器。' },
                { title: '代码完全开源', desc: '整个项目在 GitHub 上开源，你可以自己看代码，验证我们说的是不是真的。' },
                { title: '不追踪你的内容', desc: '我们只统计有多少人访问（用 Umami），从来不看也不存你输入的任何东西。' },
                { title: '自己验证', desc: '打开浏览器的开发者工具，看「网络」标签，你不会看到任何包含你数据的请求。' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">还有疑问？</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: '真的安全吗？',
                a: '真的！所有处理都在你自己的浏览器里完成，什么数据都不会发出去。不信？打开开发者工具（F12）→ 网络 → 看有没有带你数据的请求。',
              },
              {
                q: '刷新页面会怎样？',
                a: '占位符和原文的对应关系存在内存里，刷新就没了。记得点「导出记录」保存一份，之后可以导入恢复。',
              },
              {
                q: '为什么不直接用 [已隐藏]？',
                a: '因为没法还原啊。我们的占位符 ⟦PTN:JWT:1:6F3A⟧ 带校验码，能精确还原到底哪个密码对应哪个位置。',
              },
              {
                q: 'AI 看得懂这些占位符吗？',
                a: '看得懂！占位符里写明了是 JWT 还是 API_KEY，AI 照样能帮你分析代码逻辑，只是看不到真实的值。',
              },
              {
                q: '免费吗？',
                a: '完全免费，代码也开源。我们觉得隐私工具就应该让每个人都能用。',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium">
                  {faq.q}
                  <ChevronDown size={18} className="text-[var(--text-muted)] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--text-secondary)]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">试试？</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            不用注册，不用安装，免费用。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#tool" 
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all shadow-lg shadow-teal-900/30 flex items-center gap-2"
            >
              上去试试
              <ArrowRight size={18} />
            </a>
            <Link 
              href="/"
              className="px-8 py-3 border border-[var(--border-color)] hover:border-[var(--text-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Globe size={18} />
              English Version
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
