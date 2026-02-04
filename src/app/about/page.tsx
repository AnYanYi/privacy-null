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
  title: 'About - Privacy Null',
  description: 'Privacy Null is a free, open-source tool to redact sensitive data before sharing with AI assistants. 100% local processing.',
};

const FEATURES = [
  {
    icon: Shield,
    title: '100% Local Processing',
    description: 'Everything runs in your browser. Your data never touches any server.',
  },
  {
    icon: Zap,
    title: '80+ Detection Rules',
    description: 'Detects API keys, passwords, tokens, emails, phone numbers, credit cards, and more.',
  },
  {
    icon: RefreshCw,
    title: 'Reversible Redaction',
    description: 'Get your original values back after the AI responds. One click to restore.',
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Fully transparent. Inspect, modify, and self-host the code yourself.',
  },
];

const USE_CASES = [
  'Ask ChatGPT to debug your code without exposing API keys',
  'Share error logs with Claude without leaking passwords',
  'Get AI help with config files while keeping secrets safe',
  'Collaborate on code snippets without exposing credentials',
  'Review third-party code before committing to your repo',
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-emerald-600 mb-6 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Privacy Null</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            A free tool to hide sensitive data before asking AI for help. 
            Built for developers who care about security.
          </p>
        </div>

        {/* Why */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Why Privacy Null?</h2>
          <div className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)]">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              AI assistants like ChatGPT and Claude are incredibly helpful for debugging code 
              and solving programming problems. But when you paste your code, you might accidentally 
              share sensitive information — API keys, database passwords, authentication tokens.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              <strong className="text-[var(--text-primary)]">Privacy Null</strong> solves this problem. 
              Paste your code, we automatically find and replace sensitive data with safe placeholders, 
              you share with AI, and when you get the answer, restore the original values with one click.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
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
          <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
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
          <h2 className="text-2xl font-bold mb-6">Built With</h2>
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
          <h2 className="text-2xl font-bold mb-2">Open Source & Free Forever</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Privacy Null is and always will be free. Star us on GitHub if you find it useful!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all flex items-center gap-2"
            >
              Try It Now
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://github.com/AnYanYi/privacy-null"
              target="_blank"
              className="px-6 py-3 border border-[var(--border-color)] hover:border-[var(--accent-primary)] font-medium rounded-xl transition-all flex items-center gap-2"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
