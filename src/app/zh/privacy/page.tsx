import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Shield, Server, Eye, Lock, Database, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: '隐私政策 - Privacy Null',
  description: 'Privacy Null 完全在浏览器本地处理数据。我们不收集任何数据，不存储任何内容，不上传任何信息到服务器。',
};

export default function PrivacyPage() {
  return (
    <Layout locale="zh">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-light)] mb-6">
            <Shield size={32} className="text-[var(--accent-primary)]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">隐私政策</h1>
          <p className="text-[var(--text-secondary)]">
            最后更新：2026 年 2 月
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* TL;DR */}
          <div className="p-6 bg-[var(--accent-light)] border border-[var(--accent-primary)]/30 rounded-xl">
            <h2 className="text-xl font-bold text-[var(--accent-primary)] mt-0 mb-3">简而言之</h2>
            <p className="text-[var(--text-primary)] m-0">
              <strong>我们不收集任何数据。不存储任何内容。不上传任何信息。</strong><br />
              所有处理 100% 在你的浏览器中完成。你的数据永远不会离开你的设备。
            </p>
          </div>

          {/* Sections */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Server size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">无服务器处理</h2>
                <p className="text-[var(--text-secondary)]">
                  Privacy Null 是一个纯客户端应用。当你粘贴文本到工具中时，
                  所有处理完全在你的浏览器中使用 JavaScript 完成。
                  没有任何数据会发送到我们的服务器或任何第三方服务器。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Database size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">无数据存储</h2>
                <p className="text-[var(--text-secondary)]">
                  我们不会在任何服务器上存储你的输入文本、脱敏输出或映射数据。
                  会话数据（占位符和原始值之间的映射）仅存储在你浏览器的内存中，
                  当你关闭标签页或点击"清空"时会被清除。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Eye size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">无分析追踪</h2>
                <p className="text-[var(--text-secondary)]">
                  我们不使用任何分析服务、追踪像素或监控你行为的 Cookie。
                  我们不知道你是谁，你粘贴了什么，或你如何使用这个工具。
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Lock size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">自己验证</h2>
                <p className="text-[var(--text-secondary)]">
                  别只相信我们说的。你可以自己验证我们的隐私声明：
                </p>
                <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
                  <li>打开浏览器的开发者工具（F12）</li>
                  <li>切换到"网络"标签</li>
                  <li>粘贴一些文本并点击"脱敏"</li>
                  <li>观察：没有任何网络请求发出</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Globe size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">开源透明</h2>
                <p className="text-[var(--text-secondary)]">
                  Privacy Null 是开源的。你可以在 GitHub 上查看我们的代码，
                  验证我们确实如承诺的那样工作。没有隐藏的数据收集，没有后门。
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-[var(--border-light)]">
            <h2 className="text-xl font-bold mb-4">有疑问？</h2>
            <p className="text-[var(--text-secondary)]">
              如果你对此隐私政策有任何疑问，请在我们的
              <a href="https://github.com/AnYanYi/privacy-null" className="text-[var(--accent-primary)] hover:underline mx-1">
                GitHub 仓库
              </a>
              提交 Issue。
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
