'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LanguageRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // 检查是否已有语言偏好
    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find(c => c.trim().startsWith('locale='));
    
    if (localeCookie) {
      // 已有偏好，不做任何事
      return;
    }
    
    // 检测浏览器语言
    const browserLang = navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || '';
    const prefersChinese = browserLang.toLowerCase().startsWith('zh');
    
    // 设置 cookie 记住偏好
    document.cookie = `locale=${prefersChinese ? 'zh' : 'en'}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // 如果是中文用户且在英文首页，重定向到中文版
    if (prefersChinese && window.location.pathname === '/') {
      router.replace('/zh');
    }
  }, [router]);
  
  return null;
}
