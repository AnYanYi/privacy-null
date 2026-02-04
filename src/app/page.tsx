import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout';
import { RedactorWidget } from '@/components/redactor-widget';
import { LanguageRedirect } from '@/components/language-redirect';
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
  description: 'Free online tool to redact API keys, passwords, tokens before sending to ChatGPT, Claude or any AI. 100% local, no data uploads.',
  url: 'https://pnull.com',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '100% browser-side processing',
    'Reversible placeholders',
    'JWT token detection',
    'API key detection',
    'Session export/import',
    'No data uploads',
  ],
};

export const metadata: Metadata = {
  title: 'Privacy Null - Redact API Keys & Passwords Before Sending to AI | Free Tool',
  description: 'Free tool to redact API keys, passwords, JWT tokens before sending to ChatGPT, Claude or any AI. 100% local browser processing, reversible placeholders, zero data uploads.',
  keywords: ['redact API keys', 'remove passwords from code', 'ChatGPT privacy tool', 'sanitize data for AI', 'JWT redaction', 'hide secrets before AI', 'code privacy tool', 'sensitive data removal'],
  alternates: {
    canonical: 'https://pnull.com',
    languages: {
      'en': 'https://pnull.com',
      'zh': 'https://pnull.com/zh',
    },
  },
  openGraph: {
    title: 'Privacy Null - Redact Secrets Before Sending to AI',
    description: 'Free tool to hide API keys, passwords, tokens before ChatGPT/Claude. 100% local, reversible.',
    type: 'website',
    url: 'https://pnull.com',
    images: [{ url: 'https://pnull.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Null - Hide Secrets Before Sending to AI',
    description: 'Redact API keys, passwords, tokens before ChatGPT/Claude. Free & 100% local.',
  },
};

const EXAMPLE_TEXT = `# Example: .env file with sensitive data
DATABASE_URL=postgres://admin:super_secret_password@db.example.com:5432/myapp
OPENAI_API_KEY=sk-proj-abc123xyz789verylongapikey
JWT_SECRET=my-jwt-secret-key-do-not-share
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# HTTP Headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
Cookie: session=abc123; auth_token=xyz789secret`;

// 支持的类型 - 混合通俗和专业页面
const SUPPORTED_TYPES = [
  { name: 'ChatGPT Privacy', icon: Shield, href: '/redact/chatgpt-privacy', color: 'text-green-400' },
  { name: 'Hide Passwords', icon: Lock, href: '/redact/hide-passwords', color: 'text-red-400' },
  { name: 'Safe AI Coding', icon: Code, href: '/redact/safe-ai-coding', color: 'text-blue-400' },
  { name: 'API Keys', icon: Key, href: '/redact/api-key', color: 'text-yellow-400' },
  { name: '.env Files', icon: FileCode, href: '/redact/env', color: 'text-purple-400' },
  { name: 'Share Code Safely', icon: Globe, href: '/redact/code-sharing-tool', color: 'text-cyan-400' },
  { name: 'Database URLs', icon: Database, href: '/redact/database-url', color: 'text-orange-400' },
  { name: 'Private Keys', icon: Terminal, href: '/redact/private-key', color: 'text-pink-400' },
];

// 统计数据
const STATS = [
  { value: '100%', label: 'Local Processing', icon: Shield },
  { value: '80+', label: 'Detection Rules', icon: Code },
  { value: '0', label: 'Data Uploaded', icon: Server },
  { value: '∞', label: 'Free Forever', icon: Sparkles },
];

// 使用场景
const USE_CASES = [
  {
    title: 'Ask AI to Fix Your Bugs',
    description: 'Send your error logs to ChatGPT and get help debugging. Your API keys and passwords? Hidden.',
    icon: MessageSquare,
  },
  {
    title: 'Get AI Code Reviews',
    description: 'Let AI check your config files for mistakes. All your secrets are masked—share with confidence.',
    icon: Code,
  },
  {
    title: 'Share with Your Team',
    description: 'Post sanitized code in Slack, Discord, or forums. Export the session so trusted people can restore values.',
    icon: Users,
  },
];

export default function AIRedactorPage() {
  return (
    <Layout locale="en">
      {/* Language auto-redirect for Chinese users */}
      <LanguageRedirect />
      
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
            <span className="font-medium">100% Local • Nothing Uploaded • Open Source</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hide Your Secrets<br />
            <span className="text-[var(--accent-primary)]">Before Asking AI</span>
          </h1>
          
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
            Automatically find and mask passwords, API keys, and tokens in your code.
            Share safely with ChatGPT or Claude, then <strong className="text-[var(--text-primary)]">restore the original values</strong> when you get the answer.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="#tool" 
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all shadow-lg shadow-teal-900/30 hover:shadow-teal-800/40 flex items-center gap-2"
            >
              Try It Now
              <ArrowRight size={18} />
            </a>
            <Link 
              href="https://github.com/AnYanYi/privacy-null"
              target="_blank"
              className="px-8 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Code size={18} />
              View on GitHub
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
            <h2 className="text-2xl font-bold mb-2">Try It — No Sign Up Needed</h2>
            <p className="text-[var(--text-muted)]">Paste your code below and hit "Redact"</p>
          </div>
          <RedactorWidget 
            locale="en" 
            preset="default"
            exampleText={EXAMPLE_TEXT}
            placeholder="Paste your code, logs, or config files here..."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Three easy steps to get AI help without exposing your secrets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Paste Your Code',
                description: 'Paste any code or config with sensitive data. We\'ll automatically find passwords, API keys, and tokens.',
                icon: Eye,
                example: 'OPENAI_API_KEY=sk-xxx... → ⟦PTN:API_KEY:1:6F3A⟧',
              },
              {
                step: '2',
                title: 'Send to AI',
                description: 'Copy the safe version and send it to ChatGPT. The AI can understand your code structure without seeing real secrets.',
                icon: MessageSquare,
                example: 'AI knows it\'s a key, but can\'t see the actual value',
              },
              {
                step: '3',
                title: 'Restore Original',
                description: 'Paste the AI\'s response back. Click "Restore" to automatically replace all placeholders with your original values.',
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
            <h2 className="text-3xl font-bold mb-4">What We Detect</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              80+ built-in detection rules to automatically identify and mask sensitive data in your code
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
                  Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[var(--text-muted)]">
              Also detects: GitHub Tokens, AWS Keys, Stripe Keys, Database URLs, SSH Keys, Passwords, and more...
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">When Do You Need This?</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Any time you want AI help with code but don't want to share passwords
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
                <h2 className="text-2xl font-bold mb-2">Your Data Never Leaves Your Browser</h2>
                <p className="text-[var(--text-secondary)]">
                  Everything runs locally. We can't see your content even if we wanted to.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Runs 100% in Your Browser', desc: 'All detection happens in JavaScript right here. No data is ever sent anywhere.' },
                { title: 'Fully Open Source', desc: 'Check our code on GitHub. See for yourself there\'s nothing shady going on.' },
                { title: 'No Content Tracking', desc: 'We count page views (Umami), but we never see or store what you type.' },
                { title: 'See for Yourself', desc: 'Open DevTools → Network tab. You won\'t see any requests with your data.' },
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
            <h2 className="text-3xl font-bold mb-4">Questions?</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: 'Is my data really safe?',
                a: 'Yes! Everything happens in your browser. Nothing is sent to any server. Don\'t trust us? Open DevTools (F12) → Network tab and see for yourself.',
              },
              {
                q: 'What if I refresh the page?',
                a: 'The mapping between placeholders and real values is kept in memory. Refresh = gone. Hit "Export Session" to save a backup you can import later.',
              },
              {
                q: 'Why not just use [REDACTED]?',
                a: 'Because you can\'t restore that. Our placeholders like ⟦PTN:JWT:1:6F3A⟧ have checksums so we know exactly which secret goes where when you restore.',
              },
              {
                q: 'Will AI understand the placeholders?',
                a: 'Yep! They\'re designed to be readable. The AI sees it\'s a JWT or API_KEY and can still help with your code logic—just without seeing the real values.',
              },
              {
                q: 'Is it free?',
                a: 'Totally free and open source. We think privacy tools should be available to everyone.',
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
          <h2 className="text-3xl font-bold mb-4">Give It a Try</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            No sign up. No install. Just paste your code and go.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#tool" 
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all shadow-lg shadow-teal-900/30 flex items-center gap-2"
            >
              Try It Now
              <ArrowRight size={18} />
            </a>
            <Link 
              href="/zh"
              className="px-8 py-3 border border-[var(--border-color)] hover:border-[var(--text-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Globe size={18} />
              中文版本
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
