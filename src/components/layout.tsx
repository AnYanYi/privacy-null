'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Shield, 
  Github, 
  Globe, 
  ChevronDown, 
  Key, 
  Lock, 
  FileCode, 
  Database,
  Code,
  Terminal,
  Menu,
  X,
  ExternalLink,
  Star,
  Heart,
  Sun,
  Moon
} from 'lucide-react';

// GitHub 仓库地址
const GITHUB_REPO = 'https://github.com/AnYanYi/privacy-null';

interface LayoutProps {
  children: React.ReactNode;
  locale?: 'en' | 'zh';
}

// 计算语言切换的目标路径
function getLanguageSwitchPath(pathname: string, currentLocale: 'en' | 'zh'): string {
  if (currentLocale === 'zh') {
    // 中文 -> 英文：移除 /zh 前缀
    if (pathname === '/zh') return '/';
    return pathname.replace(/^\/zh/, '') || '/';
  } else {
    // 英文 -> 中文：添加 /zh 前缀
    if (pathname === '/') return '/zh';
    return `/zh${pathname}`;
  }
}

// 使用场景配置 - 中英文使用相同的 slug
const USE_CASES = {
  en: [
    { name: 'ChatGPT Privacy', href: '/redact/chatgpt-privacy', icon: Shield, desc: 'Hide secrets from ChatGPT' },
    { name: 'Hide Passwords', href: '/redact/hide-passwords', icon: Lock, desc: 'Remove passwords from code' },
    { name: 'Safe AI Coding', href: '/redact/safe-ai-coding', icon: Code, desc: 'Code with AI safely' },
    { name: 'Share Code Safely', href: '/redact/code-sharing-tool', icon: FileCode, desc: 'Post code online safely' },
    { name: 'API Keys', href: '/redact/api-key', icon: Key, desc: 'OpenAI, Stripe, AWS keys' },
    { name: '.env Files', href: '/redact/env', icon: Database, desc: 'Environment variables' },
  ],
  zh: [
    { name: 'ChatGPT 隐私', href: '/zh/redact/chatgpt-privacy', icon: Shield, desc: '安全使用 ChatGPT' },
    { name: '隐藏密码', href: '/zh/redact/hide-passwords', icon: Lock, desc: '移除代码中的密码' },
    { name: 'AI 安全使用', href: '/zh/redact/safe-ai-coding', icon: Code, desc: '安全地用 AI 写代码' },
    { name: '安全分享代码', href: '/zh/redact/code-sharing-tool', icon: FileCode, desc: '网上发代码更安全' },
    { name: 'API 密钥', href: '/zh/redact/api-key', icon: Key, desc: 'OpenAI, Stripe 等' },
    { name: '.env 文件', href: '/zh/redact/env', icon: Database, desc: '环境变量脱敏' },
  ],
};

export function Layout({ children, locale = 'en' }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();
  const router = useRouter();
  const isZh = locale === 'zh';
  const useCases = USE_CASES[locale];
  const languageSwitchPath = getLanguageSwitchPath(pathname, locale);
  
  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);
  
  // 切换主题
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  // 切换语言并保存偏好
  const handleLanguageSwitch = () => {
    const targetLocale = isZh ? 'en' : 'zh';
    // 设置 cookie 保存语言偏好
    document.cookie = `locale=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(languageSwitchPath);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-light)] bg-[var(--bg-primary)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg-primary)]/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href={isZh ? '/zh' : '/'} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-teal-800 flex items-center justify-center shadow-lg shadow-teal-900/30 group-hover:shadow-teal-800/40 transition-shadow">
                <Shield size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Privacy Null</span>
                <span className="text-[10px] text-[var(--text-muted)] leading-tight hidden sm:block">
                  {isZh ? '发 AI 前隐藏密码密钥' : 'Redact Secrets Before AI'}
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href={isZh ? '/zh' : '/'}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all"
              >
                {isZh ? '工具' : 'Tool'}
              </Link>
              
              {/* Use Cases Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
                  onBlur={() => setTimeout(() => setIsUseCasesOpen(false), 200)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all flex items-center gap-1.5"
                >
                  {isZh ? '使用场景' : 'Use Cases'}
                  <ChevronDown size={14} className={`transition-transform ${isUseCasesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUseCasesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl shadow-xl py-2 animate-fade-in">
                    {useCases.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                          <item.icon size={16} className="text-[var(--accent-primary)]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-[var(--border-light)] mt-2 pt-2 px-4">
                      <Link 
                        href={isZh ? '/zh#detect-types' : '/#detect-types'} 
                        className="text-xs text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                        onClick={() => setIsUseCasesOpen(false)}
                      >
                        {isZh ? '查看全部 →' : 'View all use cases →'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={GITHUB_REPO}
                target="_blank"
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all flex items-center gap-1.5"
              >
                <Github size={16} />
                GitHub
                <ExternalLink size={12} className="opacity-50" />
              </Link>
              
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {/* Language Switcher */}
              <button
                onClick={handleLanguageSwitch}
                className="ml-2 px-3 py-1.5 text-sm font-medium border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] rounded-lg transition-all flex items-center gap-1.5"
              >
                <Globe size={14} />
                {isZh ? 'EN' : '中文'}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-[var(--bg-secondary)] rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-light)] bg-[var(--bg-secondary)] animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              <Link
                href={isZh ? '/zh' : '/'}
                className="block px-4 py-3 text-sm font-medium hover:bg-[var(--bg-tertiary)] rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {isZh ? '🛠️ 工具' : '🛠️ Tool'}
              </Link>
              
              <div className="px-4 py-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {isZh ? '使用场景' : 'Use Cases'}
              </div>
              
              {useCases.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--bg-tertiary)] rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={16} className="text-[var(--accent-primary)]" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-[var(--border-light)] pt-4 mt-4 flex items-center justify-between">
                <Link
                  href={GITHUB_REPO}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                >
                  <Github size={18} />
                  GitHub
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleThemeToggle}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLanguageSwitch();
                    }}
                    className="px-3 py-1.5 text-sm border border-[var(--border-color)] rounded-lg flex items-center gap-1.5"
                  >
                    <Globe size={14} />
                    {isZh ? 'EN' : '中文'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href={isZh ? '/zh' : '/'} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-teal-800 flex items-center justify-center">
                  <Shield size={18} className="text-white" />
                </div>
                <span className="font-bold">Privacy Null</span>
              </Link>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                {isZh 
                  ? '发送给 AI 前自动隐藏密码、密钥、令牌。100% 本地处理，不上传数据。' 
                  : 'Redact passwords, API keys, tokens before sending to AI. 100% local, no uploads.'}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={GITHUB_REPO}
                  target="_blank"
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </Link>
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="font-semibold mb-4">{isZh ? '使用场景' : 'Use Cases'}</h4>
              <ul className="space-y-2">
                {useCases.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">{isZh ? '资源' : 'Resources'}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href={isZh ? '/zh/about' : '/about'} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {isZh ? '关于我们' : 'About'}
                  </Link>
                </li>
                <li>
                  <Link href={isZh ? '/zh/privacy' : '/privacy'} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {isZh ? '隐私政策' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link href={GITHUB_REPO} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                    {isZh ? '源代码' : 'Source Code'}
                    <ExternalLink size={12} />
                  </Link>
                </li>
                <li>
                  <Link href={`${GITHUB_REPO}/issues`} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                    {isZh ? '问题反馈' : 'Report Issues'}
                    <ExternalLink size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trust */}
            <div>
              <h4 className="font-semibold mb-4">{isZh ? '安全保障' : 'Security'}</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Shield size={16} className="text-[var(--accent-primary)] mt-0.5" />
                  <span className="text-sm text-[var(--text-muted)]">
                    {isZh ? '100% 浏览器本地处理' : '100% browser-side processing'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock size={16} className="text-[var(--accent-primary)] mt-0.5" />
                  <span className="text-sm text-[var(--text-muted)]">
                    {isZh ? '无服务器数据传输' : 'No server data transmission'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={16} className="text-[var(--accent-primary)] mt-0.5" />
                  <span className="text-sm text-[var(--text-muted)]">
                    {isZh ? '开源可审计代码' : 'Open source auditable code'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[var(--border-light)] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span>© 2026 pnull.com</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {isZh ? '用' : 'Made with'} <Heart size={14} className="text-red-500" /> {isZh ? '制作' : ''}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button onClick={handleLanguageSwitch} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1">
                <Globe size={14} />
                {isZh ? 'English' : '中文'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
