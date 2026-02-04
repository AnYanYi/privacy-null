import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Shield, Server, Eye, Lock, Database, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Privacy Null',
  description: 'Privacy Null processes all data locally in your browser. We collect zero data, store nothing, and upload nothing to any server.',
};

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-light)] mb-6">
            <Shield size={32} className="text-[var(--accent-primary)]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[var(--text-secondary)]">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          {/* TL;DR */}
          <div className="p-6 bg-[var(--accent-light)] border border-[var(--accent-primary)]/30 rounded-xl">
            <h2 className="text-xl font-bold text-[var(--accent-primary)] mt-0 mb-3">TL;DR</h2>
            <p className="text-[var(--text-primary)] m-0">
              <strong>We collect nothing. We store nothing. We upload nothing.</strong><br />
              All processing happens 100% in your browser. Your data never leaves your device.
            </p>
          </div>

          {/* Sections */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-[var(--bg-tertiary)]">
                <Server size={24} className="text-[var(--accent-primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">No Server Processing</h2>
                <p className="text-[var(--text-secondary)]">
                  Privacy Null is a client-side application. When you paste text into the tool, 
                  it is processed entirely within your web browser using JavaScript. 
                  No data is ever sent to our servers or any third-party servers.
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
                <h2 className="text-xl font-bold mb-2">No Data Storage</h2>
                <p className="text-[var(--text-secondary)]">
                  We do not store any of your input text, redacted output, or mapping data on any server. 
                  Session data (the mapping between placeholders and original values) is stored only in 
                  your browser&apos;s memory and is cleared when you close the tab or click &quot;Clear&quot;.
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
                <h2 className="text-xl font-bold mb-2">No Analytics or Tracking</h2>
                <p className="text-[var(--text-secondary)]">
                  We do not use any analytics services, tracking pixels, or cookies that monitor your behavior. 
                  We don&apos;t know who you are, what you paste, or how you use the tool.
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
                <h2 className="text-xl font-bold mb-2">Verify It Yourself</h2>
                <p className="text-[var(--text-secondary)]">
                  Don&apos;t just take our word for it. You can verify our privacy claims:
                </p>
                <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
                  <li>Open your browser&apos;s Developer Tools (F12)</li>
                  <li>Go to the Network tab</li>
                  <li>Paste some text and click Redact</li>
                  <li>Observe: No network requests are made</li>
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
                <h2 className="text-xl font-bold mb-2">Open Source</h2>
                <p className="text-[var(--text-secondary)]">
                  Privacy Null is open source. You can inspect our code on GitHub to verify 
                  that we do exactly what we say. No hidden data collection, no backdoors.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-[var(--border-light)]">
            <h2 className="text-xl font-bold mb-4">Questions?</h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions about this privacy policy, please open an issue on our 
              <a href="https://github.com/AnYanYi/privacy-null" className="text-[var(--accent-primary)] hover:underline ml-1">
                GitHub repository
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
