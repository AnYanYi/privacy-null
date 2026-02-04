'use client';

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useRedactor } from '@/hooks/use-redactor';
import { RulesPanel } from '@/components/rules-panel';
import type { SensitiveType } from '@/lib/engine/types';
import {
  Shield,
  RefreshCw,
  Copy,
  Check,
  Download,
  Upload,
  Trash2,
  ChevronDown,
  Info,
  AlertCircle,
  CheckCircle,
  Zap,
  Lock,
  Settings,
  X,
} from 'lucide-react';

interface RedactorWidgetProps {
  preset?: string;
  locale?: 'en' | 'zh';
  showTrustBadge?: boolean;
  placeholder?: string;
  exampleText?: string;
}

const LABELS = {
  en: {
    title: 'Privacy Null',
    subtitle: 'Hide sensitive data before sharing with AI',
    inputPlaceholder: 'Paste your code, logs, or config files here...',
    sanitize: 'Redact',
    restore: 'Restore',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    exportSession: 'Export',
    importSession: 'Import',
    trustBadge: 'Runs locally. Nothing uploaded.',
    networkProof: 'Check browser Network tab (F12)',
    reportTitle: 'What we found',
    reportTotal: 'Items detected',
    reportByType: 'By type',
    restoreReportTitle: 'Restore summary',
    restored: 'Restored',
    unmatched: 'Not found',
    noSession: 'No data yet. Redact some text first, or import a previous session.',
    sessionMappings: 'Items saved',
    processingTime: 'Time',
    lineNumber: 'Line',
    tabSanitize: 'Redact',
    tabRestore: 'Restore',
    outputTitle: 'Safe to share',
    restoreOutputTitle: 'Restored output',
    pasteAiResponse: "Paste AI's response here to restore original values...",
    loadExample: 'Load Example',
    dropHint: 'or drop a file here',
    rulesPanel: 'Rules',
    enabledRules: 'Enabled',
    totalRules: 'Total rules',
  },
  zh: {
    title: '隐私脱敏工具',
    subtitle: '发给 AI 前自动隐藏敏感信息',
    inputPlaceholder: '粘贴你的代码、日志或配置文件...',
    sanitize: '一键脱敏',
    restore: '还原',
    copy: '复制',
    copied: '已复制',
    clear: '清空',
    exportSession: '导出',
    importSession: '导入',
    trustBadge: '纯本地处理，不传数据',
    networkProof: '可在浏览器 F12 网络面板验证',
    reportTitle: '检测报告',
    reportTotal: '共检测到',
    reportByType: '按类型',
    restoreReportTitle: '还原报告',
    restored: '已还原',
    unmatched: '未匹配',
    noSession: '还没有脱敏记录。先脱敏一些文本，或导入之前的记录。',
    sessionMappings: '已记录',
    processingTime: '耗时',
    lineNumber: '第',
    tabSanitize: '脱敏',
    tabRestore: '还原',
    outputTitle: '脱敏结果',
    restoreOutputTitle: '还原结果',
    pasteAiResponse: '粘贴 AI 的回复，点还原换回原始内容...',
    loadExample: '加载示例',
    dropHint: '或拖拽文件到此处',
    rulesPanel: '规则设置',
    enabledRules: '已启用',
    totalRules: '总规则数',
  },
};

const TYPE_LABELS: Record<SensitiveType, { en: string; zh: string }> = {
  JWT: { en: 'JWT Token', zh: 'JWT 令牌' },
  API_KEY: { en: 'API Key', zh: 'API 密钥' },
  BEARER_TOKEN: { en: 'Bearer Token', zh: 'Bearer 令牌' },
  PRIVATE_KEY: { en: 'Private Key', zh: '私钥' },
  COOKIE: { en: 'Cookie', zh: 'Cookie' },
  SET_COOKIE: { en: 'Set-Cookie', zh: 'Set-Cookie' },
  AUTH_HEADER: { en: 'Auth Header', zh: '认证头' },
  URL_PARAM: { en: 'URL Param', zh: 'URL 参数' },
  ENV_VAR: { en: 'ENV Variable', zh: '环境变量' },
  DATABASE_URL: { en: 'Database URL', zh: '数据库连接' },
  GITHUB_TOKEN: { en: 'GitHub Token', zh: 'GitHub 令牌' },
  PASSWORD: { en: 'Password', zh: '密码' },
  SECRET: { en: 'Secret', zh: '密钥' },
  GENERIC: { en: 'Generic', zh: '通用' },
  // 新增类型
  EMAIL: { en: 'Email', zh: '邮箱' },
  PHONE: { en: 'Phone', zh: '手机号' },
  IP_ADDRESS: { en: 'IP Address', zh: 'IP 地址' },
  MAC_ADDRESS: { en: 'MAC Address', zh: 'MAC 地址' },
  CREDIT_CARD: { en: 'Credit Card', zh: '银行卡' },
  SSN: { en: 'SSN', zh: '社会安全号' },
  ID_CARD: { en: 'ID Card', zh: '身份证' },
  GOOGLE_KEY: { en: 'Google Key', zh: 'Google 密钥' },
  AZURE_KEY: { en: 'Azure Key', zh: 'Azure 密钥' },
  SLACK_TOKEN: { en: 'Slack Token', zh: 'Slack 令牌' },
  DISCORD_TOKEN: { en: 'Discord Token', zh: 'Discord 令牌' },
  TELEGRAM_TOKEN: { en: 'Telegram Token', zh: 'Telegram 令牌' },
  TWILIO_KEY: { en: 'Twilio Key', zh: 'Twilio 密钥' },
  SENDGRID_KEY: { en: 'SendGrid Key', zh: 'SendGrid 密钥' },
  MAILGUN_KEY: { en: 'Mailgun Key', zh: 'Mailgun 密钥' },
  PAYPAL_KEY: { en: 'PayPal Key', zh: 'PayPal 密钥' },
  SQUARE_KEY: { en: 'Square Key', zh: 'Square 密钥' },
  SHOPIFY_KEY: { en: 'Shopify Key', zh: 'Shopify 密钥' },
  HEROKU_KEY: { en: 'Heroku Key', zh: 'Heroku 密钥' },
  VERCEL_TOKEN: { en: 'Vercel Token', zh: 'Vercel 令牌' },
  NETLIFY_TOKEN: { en: 'Netlify Token', zh: 'Netlify 令牌' },
  DIGITALOCEAN_TOKEN: { en: 'DO Token', zh: 'DO 令牌' },
  SSH_KEY: { en: 'SSH Key', zh: 'SSH 密钥' },
  GPG_KEY: { en: 'GPG Key', zh: 'GPG 密钥' },
  ENCRYPTION_KEY: { en: 'Encryption Key', zh: '加密密钥' },
  HASH: { en: 'Hash', zh: '哈希值' },
  UUID: { en: 'UUID', zh: 'UUID' },
};

// 丰富的示例文本，覆盖更多敏感数据类型
const EXAMPLE_TEXTS = {
  en: `# Example: Various Sensitive Data Types

# API Keys & Tokens
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678
ANTHROPIC_API_KEY=sk-ant-api03-aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
STRIPE_SECRET_KEY=sk_live_51H2abc123XYZ789
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google & Azure
GOOGLE_API_KEY=AIzaSyDaGmWKa4JsXZ-HjGw7ISLn_3namBGewQe
AZURE_STORAGE_KEY=AccountKey=lJzRc1YdHaAA2KCNJJ1tkYwF/+mKK6Gg8wBnmlcNF+X//5N35kTUqLSd+Q==

# Database Connections
DATABASE_URL=postgres://admin:SuperSecret123@db.example.com:5432/myapp
MONGODB_URI=mongodb+srv://user:MyP@ssw0rd@cluster.mongodb.net/db
REDIS_URL=redis://:secretpassword@redis.example.com:6379

# Personal Information
Email: john.doe@example.com, support@company.co.uk
Phone: +1-555-123-4567, 13812345678
IP: 192.168.1.100, 10.0.0.1

# Credit Cards & IDs
Card: 4532015112830366 (Visa)
SSN: 123-45-6789
China ID: 110101199003077758

# JWT Token
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

# Private Key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AHB7MmC5ykLB3BPJM0n5
-----END RSA PRIVATE KEY-----

# Social & Messaging
SLACK_TOKEN=xoxb-your-workspace-token-here-placeholder
DISCORD_BOT_TOKEN=your-discord-bot-token-placeholder
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-placeholder

# Webhooks
SLACK_WEBHOOK=https://hooks.example.com/services/YOUR/WEBHOOK/URL

# Passwords
password=MySecretPass123!
db_password: "super_secret_db_pass"
`,
  zh: `# 示例：各类敏感数据

# API 密钥
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678
ANTHROPIC_API_KEY=sk-ant-api03-aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
STRIPE_SECRET_KEY=sk_live_51H2abc123XYZ789
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 阿里云/腾讯云
ALIYUN_ACCESS_KEY=your-aliyun-access-key-here
TENCENT_SECRET_ID=your-tencent-secret-id-here

# 微信/支付宝
WECHAT_APPID=wx1234567890abcdef
WECHAT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# 数据库连接
DATABASE_URL=postgres://admin:SuperSecret123@db.example.com:5432/myapp
MONGODB_URI=mongodb+srv://user:MyP@ssw0rd@cluster.mongodb.net/db
REDIS_URL=redis://:secretpassword@redis.example.com:6379

# 个人信息
邮箱: zhangsan@example.com, lisi@company.cn
手机: 13812345678, 15987654321
内网IP: 192.168.1.100, 10.0.0.1

# 银行卡 & 身份证
银联卡: 6222021234567890123
身份证: 110101199003077758

# JWT 令牌
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

# 私钥
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AHB7MmC5ykLB3BPJM0n5
-----END RSA PRIVATE KEY-----

# 社交/通讯
SLACK_TOKEN=xoxb-your-workspace-token-here-placeholder
DISCORD_BOT_TOKEN=your-discord-bot-token-placeholder
TELEGRAM_BOT_TOKEN=your-telegram-bot-token-placeholder

# 密码字段
password=MySecretPass123!
db_password: "super_secret_db_pass"
`,
};

export function RedactorWidget({
  preset = 'default',
  locale = 'en',
  showTrustBadge = true,
  placeholder,
  exampleText,
}: RedactorWidgetProps) {
  const labels = LABELS[locale];
  
  const {
    session,
    lastSanitizeResult,
    lastRestoreResult,
    isProcessing,
    mappingCount,
    sanitize,
    restore,
    clearSession,
    exportSession,
    importSession,
    currentPreset,
    setPreset,
    enabledRuleIds,
    toggleRule,
    enableAllRules,
    disableAllRules,
    resetRulesToDefault,
  } = useRedactor({ preset });

  const [activeTab, setActiveTab] = useState<'sanitize' | 'restore'>('sanitize');
  const [inputText, setInputText] = useState(exampleText || '');
  const [restoreInputText, setRestoreInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReport, setShowReport] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showRulesPanel, setShowRulesPanel] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  // 加载示例
  const handleLoadExample = useCallback(() => {
    setInputText(EXAMPLE_TEXTS[locale]);
  }, [locale]);

  // 处理拖拽
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // 检查文件类型
      const allowedTypes = ['text/plain', 'application/json', 'text/javascript', 'text/typescript', 'text/x-python', 'text/yaml', 'text/csv', 'application/xml', 'text/html', 'text/css'];
      const isTextFile = allowedTypes.some(type => file.type.startsWith(type.split('/')[0])) || 
                         file.name.match(/\.(txt|json|js|ts|jsx|tsx|py|yaml|yml|env|md|xml|html|css|sql|sh|bash|zsh|conf|cfg|ini|log|csv)$/i);
      
      if (isTextFile || file.size < 1024 * 1024) { // 小于 1MB 的文件也尝试读取
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) {
            setInputText(content);
          }
        };
        reader.readAsText(file);
      }
    }
  }, []);

  // 处理脱敏
  const handleSanitize = useCallback(() => {
    if (!inputText.trim()) return;
    sanitize(inputText);
  }, [inputText, sanitize]);

  // 处理恢复
  const handleRestore = useCallback(() => {
    if (!restoreInputText.trim()) return;
    restore(restoreInputText);
  }, [restoreInputText, restore]);

  // 复制输出
  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // 导入会话文件
  const handleFileImport = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const success = await importSession(file);
      if (!success) {
        alert(locale === 'en' ? 'Invalid session file' : '无效的会话文件');
      }
    }
    // 重置 input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [importSession, locale]);

  // 清除所有
  const handleClear = useCallback(() => {
    setInputText('');
    setRestoreInputText('');
    clearSession();
  }, [clearSession]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 信任徽章 */}
      {showTrustBadge && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="trust-badge">
            <Lock size={14} />
            <span>{labels.trustBadge}</span>
          </div>
          <button
            onClick={() => window.open('https://developer.chrome.com/docs/devtools/network/', '_blank')}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] flex items-center gap-1"
          >
            <Info size={12} />
            {labels.networkProof}
          </button>
        </div>
      )}

      {/* 标签切换和设置 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 p-1 bg-[var(--bg-secondary)] rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('sanitize')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === 'sanitize'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            <div className="flex items-center gap-2">
              <Shield size={16} />
              {labels.tabSanitize}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('restore')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === 'restore'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            <div className="flex items-center gap-2">
              <RefreshCw size={16} />
              {labels.tabRestore}
            </div>
          </button>
        </div>
        
        {/* 规则设置按钮 */}
        <button
          onClick={() => setShowRulesPanel(!showRulesPanel)}
          className={cn(
            "btn btn-secondary flex items-center gap-2",
            showRulesPanel && "bg-[var(--accent-light)] border-[var(--accent-primary)]"
          )}
        >
          <Settings size={16} />
          <span className="hidden sm:inline">{labels.rulesPanel}</span>
          <span className="tag tag-info text-xs">{enabledRuleIds.size}</span>
        </button>
      </div>

      {/* 规则面板 */}
      {showRulesPanel && (
        <div className="mb-4 animate-fade-in">
          <RulesPanel
            locale={locale}
            enabledRuleIds={enabledRuleIds}
            onToggleRule={toggleRule}
            onEnableAll={enableAllRules}
            onDisableAll={disableAllRules}
            onResetToDefault={resetRulesToDefault}
          />
        </div>
      )}

      {/* 脱敏模式 */}
      {activeTab === 'sanitize' && (
        <div className="space-y-4">
          {/* 输入区 */}
          <div 
            className={cn(
              "card relative transition-all",
              isDragging && "ring-2 ring-[var(--accent-primary)] bg-[var(--accent-light)]"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* 拖拽遮罩 */}
            {isDragging && (
              <div className="absolute inset-0 bg-[var(--accent-light)] bg-opacity-90 flex items-center justify-center rounded-xl z-10 pointer-events-none">
                <div className="text-center">
                  <Upload size={40} className="mx-auto mb-2 text-[var(--accent-primary)]" />
                  <p className="text-[var(--accent-primary)] font-medium">{labels.dropHint}</p>
                </div>
              </div>
            )}
            
            <textarea
              ref={textInputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={placeholder || labels.inputPlaceholder}
              className="code-textarea"
              rows={10}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSanitize}
                  disabled={!inputText.trim() || isProcessing}
                  className="btn btn-primary"
                >
                  <Zap size={16} />
                  {labels.sanitize}
                </button>
                <button
                  onClick={handleLoadExample}
                  className="btn btn-secondary"
                  title={labels.loadExample}
                >
                  <Info size={16} />
                  <span className="hidden sm:inline">{labels.loadExample}</span>
                </button>
                <button
                  onClick={handleClear}
                  className="btn btn-ghost"
                >
                  <Trash2 size={16} />
                  {labels.clear}
                </button>
              </div>
              
              {mappingCount > 0 && (
                <div className="text-sm text-[var(--text-muted)]">
                  {labels.sessionMappings}: {mappingCount}
                </div>
              )}
            </div>
          </div>

          {/* 输出区 */}
          {lastSanitizeResult && (
            <div className="card animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="text-lg font-medium">{labels.outputTitle}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleCopy(lastSanitizeResult.outputText)}
                    className="btn btn-secondary text-sm"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="hidden sm:inline">{copied ? labels.copied : labels.copy}</span>
                  </button>
                  <button
                    onClick={exportSession}
                    disabled={mappingCount === 0}
                    className="btn btn-secondary text-sm"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">{labels.exportSession}</span>
                  </button>
                </div>
              </div>
              
              <pre className="code-output">
                <code>{lastSanitizeResult.outputText}</code>
              </pre>

              {/* 报告 */}
              {lastSanitizeResult.report.totalMatches > 0 && (
                <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
                  <button
                    onClick={() => setShowReport(!showReport)}
                    className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <ChevronDown
                      size={16}
                      className={cn('transition-transform', showReport && 'rotate-180')}
                    />
                    {labels.reportTitle}
                  </button>
                  
                  {showReport && (
                    <div className="mt-3 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[var(--text-muted)]">{labels.reportTotal}:</span>
                        <span className="tag tag-success">{lastSanitizeResult.report.totalMatches}</span>
                        <span className="text-[var(--text-muted)]">{labels.processingTime}:</span>
                        <span>{lastSanitizeResult.report.processingTime.toFixed(2)}ms</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(lastSanitizeResult.report.matchesByType).map(([type, count]) => (
                          <span key={type} className="tag tag-info">
                            {TYPE_LABELS[type as SensitiveType]?.[locale] || type}: {count}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {lastSanitizeResult.report.matches.map((match, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-2 bg-[var(--bg-primary)] rounded border border-[var(--border-light)]"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="tag tag-info text-xs py-0">
                                {TYPE_LABELS[match.type]?.[locale] || match.type}
                              </span>
                              <span className="text-[var(--text-muted)]">
                                {labels.lineNumber} {match.lineNumber}
                              </span>
                            </div>
                            <code className="text-[var(--text-secondary)] break-all">
                              {match.contextSnippet}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 恢复模式 */}
      {activeTab === 'restore' && (
        <div className="space-y-4">
          {/* 会话状态 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
            <div className="flex items-center gap-3">
              {mappingCount > 0 ? (
                <>
                  <CheckCircle size={18} className="text-[var(--success)] flex-shrink-0" />
                  <span className="text-sm">
                    {labels.sessionMappings}: <strong>{mappingCount}</strong>
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={18} className="text-[var(--warning)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-muted)]">{labels.noSession}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary text-sm"
              >
                <Upload size={14} />
                <span className="hidden sm:inline">{labels.importSession}</span>
                <span className="sm:hidden">导入</span>
              </button>
            </div>
          </div>

          {/* 输入区 */}
          <div className="card">
            <textarea
              value={restoreInputText}
              onChange={(e) => setRestoreInputText(e.target.value)}
              placeholder={labels.pasteAiResponse}
              className="code-textarea"
              rows={10}
            />
            
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleRestore}
                disabled={!restoreInputText.trim() || mappingCount === 0 || isProcessing}
                className="btn btn-primary"
              >
                <RefreshCw size={16} />
                {labels.restore}
              </button>
            </div>
          </div>

          {/* 输出区 */}
          {lastRestoreResult && (
            <div className="card animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="text-lg font-medium">{labels.restoreOutputTitle}</h3>
                <button
                  onClick={() => handleCopy(lastRestoreResult.restoredText)}
                  className="btn btn-secondary text-sm"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? labels.copied : labels.copy}
                </button>
              </div>
              
              <pre className="code-output">
                <code>{lastRestoreResult.restoredText}</code>
              </pre>

              {/* 恢复报告 */}
              <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
                <h4 className="text-sm font-medium mb-2">{labels.restoreReportTitle}</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className="tag tag-success">
                    {labels.restored}: {lastRestoreResult.report.restoredCount}
                  </span>
                  {lastRestoreResult.report.unmatchedPlaceholders.length > 0 && (
                    <span className="tag tag-warning">
                      {labels.unmatched}: {lastRestoreResult.report.unmatchedPlaceholders.length}
                    </span>
                  )}
                  <span className="text-[var(--text-muted)]">
                    {labels.processingTime}: {lastRestoreResult.report.processingTime.toFixed(2)}ms
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
