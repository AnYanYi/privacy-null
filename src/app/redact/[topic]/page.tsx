import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { RedactorWidget } from '@/components/redactor-widget';
import { LANDING_PAGES_EN, getAllEnglishSlugs, type LandingPageContent } from '@/content/landing-pages-en';
import { Shield, CheckCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ topic: string }>;
}

// 生成静态路径
export async function generateStaticParams() {
  return getAllEnglishSlugs().map((topic) => ({ topic }));
}

// 生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const page = LANDING_PAGES_EN[topic];
  
  if (!page) {
    return { title: 'Not Found' };
  }
  
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: {
      canonical: `https://pnull.com/redact/${topic}`,
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: `https://pnull.com/redact/${topic}`,
      type: 'website',
    },
  };
}

export default async function RedactTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = LANDING_PAGES_EN[topic];
  
  if (!page) {
    notFound();
  }
  
  return (
    <Layout locale="en">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-light)] rounded-full text-sm text-[var(--accent-primary)] mb-4">
            <Shield size={14} />
            Privacy Null
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {page.hero.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {page.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <RedactorWidget 
            locale="en" 
            preset={page.preset}
            exampleText={page.example}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {page.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <CheckCircle size={18} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {getAllEnglishSlugs()
              .filter(slug => slug !== topic)
              .slice(0, 6)
              .map(slug => (
                <a
                  key={slug}
                  href={`/redact/${slug}`}
                  className="px-4 py-2 bg-[var(--bg-secondary)] rounded-lg text-sm hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  {LANDING_PAGES_EN[slug].hero.title}
                </a>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
