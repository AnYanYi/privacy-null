import { MetadataRoute } from 'next';
import { getAllEnglishSlugs } from '@/content/landing-pages-en';
import { getAllChineseSlugs } from '@/content/landing-pages-zh';

const BASE_URL = 'https://pnull.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const englishSlugs = getAllEnglishSlugs();
  const chineseSlugs = getAllChineseSlugs();
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/zh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/zh/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/zh/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
  
  const englishPages: MetadataRoute.Sitemap = englishSlugs.map((slug) => ({
    url: `${BASE_URL}/redact/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  const chinesePages: MetadataRoute.Sitemap = chineseSlugs.map((slug) => ({
    url: `${BASE_URL}/zh/redact/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  return [...staticPages, ...englishPages, ...chinesePages];
}
